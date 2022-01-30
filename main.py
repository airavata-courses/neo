
import nexradaws
import datetime
import tempfile
import pyart
import io
import base64
import matplotlib.pyplot as plt

conn = nexradaws.NexradAwsInterface()



def find_url(station, year, month, date, hour, minute):
    end = datetime.datetime.fromisoformat(
        f"{year}-{month}-{date} {hour}:{minute}:00.000")
    start = end - datetime.timedelta(hours=24)
    scans = conn.get_avail_scans_in_range(start, end, station)
    return scans[-1]


def fetch_data(url):
    templocation = tempfile.mkdtemp()
    results = conn.download(url, templocation)
    for i in results.iter_success():
        return pyart.io.read(i.filepath)
    

    
def data_viz(radar, product):
    if product == 'reflectivity':

        display = pyart.graph.RadarDisplay(radar)
        fig = plt.figure(figsize=(6, 5))
        ax = fig.add_subplot(111)
        display.plot('reflectivity', 0, title='NEXRAD Reflectivity',
             vmin=-32, vmax=64, colorbar_label='', ax=ax)
        
    # if product == 'reflectivity':
    s = io.BytesIO()
    fig.savefig(s, format='png', bbox_inches="tight")
    s.seek(0)
    return  base64.b64encode(s.read())



if __name__ == "__main__":
    station = 'KLVX'
    year = 2021
    month = 12
    date = 12
    hour = 11
    minute = 10
    product = 'reflectivity'

    url = find_url(station, year, month, date, hour, minute)
    data_radar = fetch_data(url)
    out_viz_file  = data_viz(data_radar, product)

    with open('C:/Users/shashank/Downloads/test1.png','wb') as f:
        f.write(base64.decodebytes(out_viz_file))


