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
    count = -1
    while count > len(scans)*-1:
        if scans[count].filename[-3:] == 'V06':
            return scans[count]
        else:
            count= count -1
    return -1


def fetch_data(url):
    templocation = tempfile.mkdtemp()
    results = conn.download(url, templocation)
    if results.success_count > 0:
        for i in results.iter_success():
            try:
                data =  pyart.io.read(i.filepath)
                return data
            except:
                return -1
    else:
        return -1
    

def data_viz(radar, product):
    display = pyart.graph.RadarDisplay(radar)
    fig = plt.figure(figsize=(6, 5))
    if product == 'reflectivity':
        display.plot('reflectivity', 0, title='NEXRAD Reflectivity',
             vmin=-32, vmax=64, colorbar_label='')
    elif product == 'velocity':
        display.plot('velocity', 1, title='Doppler Velocity',
             vmin=-95, vmax=95,colorbar_label='')
    elif product == 'cross_correlation_ratio':
        display.plot('cross_correlation_ratio', 0, title='Correlation Coefficient',
             vmin=0, vmax=1,colorbar_label='')
    s = io.BytesIO()
    fig.savefig(s, format='png', bbox_inches="tight")
    s.seek(0)
    return  base64.b64encode(s.read())

def get_result_image(station, year, month, date, hour, minute, product):
    out_viz_file = None
    url = find_url(station, year, month, date, hour, minute)
    if url != -1:
        data_radar = fetch_data(url)
        if data_radar != -1:
            out_viz_file = data_viz(data_radar, product)
    return out_viz_file


if __name__ == "__main__":
    station = 'KLVX'
    # Year month date hour and minute should be string with fixed width
    year = '2021'
    month = '12'
    date = '11'
    hour = '02'
    minute = '55'
    # Possible values could be velocity, reflectivity or cross_correlation_ratio
    product = 'velocity'

    # Get Result Image
    out_viz_file = get_result_image(
        station, year, month, date, hour, minute, product)

    print("base64: " + str(out_viz_file))


# # test for checking base64 data to image
# with open('imagetest.png','wb') as f:
#     f.write(base64.decodebytes(out_viz_file))
