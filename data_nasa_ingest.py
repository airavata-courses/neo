from netCDF4 import Dataset
import sys
import urllib3
import certifi
import requests
from time import sleep
import numpy
from json import JSONEncoder
import json
import tempfile


http = urllib3.PoolManager(cert_reqs='CERT_REQUIRED',ca_certs=certifi.where())
# Set the URL for the GES DISC subset service endpoint
url = 'https://disc.gsfc.nasa.gov/service/subset/jsonwsp'


class NumpyArrayEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, numpy.ndarray):
            return obj.tolist()
        return JSONEncoder.default(self, obj)

def get_http_data(request):
    hdrs = {'Content-Type': 'application/json',
            'Accept'      : 'application/json'}
    data = json.dumps(request)
    r = http.request('POST', url, body=data, headers=hdrs)
    response = json.loads(r.data)
    # Check for errors
    if response['type'] == 'jsonwsp/fault' :
        print('API Error: faulty %s request' % response['methodname'])
        sys.exit(1)
    return response


# Define the parameters for the data subset
def create_json_wsp(varNames, begTime ):

    minlon = -180
    maxlon = 180
    minlat = -90
    maxlat = 90
    begHour = '00:00'
    endHour = '23:59'
    data_set_t = 'M2I3NPASM_V5.12.4'
    diurnalAggregation = '1'

    subset_request = {
        'methodname': 'subset',
        'type': 'jsonwsp/request',
        'version': '1.0',
        'args': {
            'role': 'subset',
            'start': begTime,
            'end': begTime,
            'box': [minlon, minlat, maxlon, maxlat],
            'crop': True,
            'diurnalAggregation': diurnalAggregation,
            'data': [{'datasetId': data_set_t,
                      'variable' : varNames,

                      }]
        }
    }

    return subset_request


def request_subset(subset_request):
    # Submit the subset request to the GES DISC Server
    response = get_http_data(subset_request)
    # Report the JobID and initial status
    myJobId = response['result']['jobId']
    return myJobId, response

def get_url(myJobId, response):
    status_request = {
        'methodname': 'GetStatus',
        'version': '1.0',
        'type': 'jsonwsp/request',
        'args': {'jobId': myJobId}
    }

    # Check on the job status after a brief nap
    while response['result']['Status'] in ['Accepted', 'Running']:
        sleep(0.3)
        response = get_http_data(status_request)

    batchsize = 20
    results_request = {
        'methodname': 'GetResult',
        'version': '1.0',
        'type': 'jsonwsp/request',
        'args': {
            'jobId': myJobId,
            'count': batchsize,
            'startIndex': 0
        }
    }

    results = []
    count = 0
    response = get_http_data(results_request)
    count = count + response['result']['itemsPerPage']
    results.extend(response['result']['items'])

    # Increment the startIndex and keep asking for more results until we have them all
    total = response['result']['totalResults']
    while count < total :
        results_request['args']['startIndex'] += batchsize
        response = get_http_data(results_request)
        count = count + response['result']['itemsPerPage']
        results.extend(response['result']['items'])
    docs = []
    urls = []
    for item in results :
        try:
            if item['start'] and item['end'] : urls.append(item)
        except:
            docs.append(item)
    return urls


def download_data_file(urls):
    for item in urls :
        URL = item['link']
    result = requests.get(URL)
    try:
        result.raise_for_status()
        templocation = tempfile.mkdtemp()
        outfn =  templocation+'/'+item['label']
        f = open(outfn,'wb')
        f.write(result.content)
        f.close()
    except:
        print('Error! Status code is %d for this URL:\n%s' % (result.status.code,URL))

    data = Dataset(outfn)
    a = data.variables['SLP'][0][:][:]
    out = numpy.array(a)
    numpyData = {"SLP": out}
    out_file = json.dumps(numpyData, cls=NumpyArrayEncoder)
    return out_file


def get_json_file(product, begTime):
    subset_request = create_json_wsp(product, begTime)
    myJobId, response = request_subset(subset_request)
    urls = get_url(myJobId, response)
    json_out = download_data_file(urls)
    return json_out

if __name__ == "__main__":

    product ='SLP'

    begTime = '2021-01-01'
    print(get_json_file(product,begTime ))
