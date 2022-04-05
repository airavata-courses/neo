from data_viz_engine import get_result_image
import os
# grpc required imports
from concurrent import futures
import grpc
import data_processor_pb2
import data_processor_pb2_grpc

class Servicer(data_processor_pb2_grpc.DataProcessorServiceServicer):

    def getImage(self, request, context):
        year = request.year
        month = request.month
        day = request.day
        hour = request.hour
        minute = request.minute
        feature = request.feature
        station = request.station


        query_input = [station, year, month, day, hour, minute, feature]
        print('Server received QueryInput as:', query_input)

        image_base64 = get_result_image(station=station, year=year, month=month, date=day, hour=hour, minute=minute, product=feature)
        image_base64 = str(image_base64)
        print("base64 generated in dp service (100 chars):" + str(out_viz_file)[:100])
        return data_processor_pb2.ResultImage(image_base64=image_base64)


# serve() runs a Servicer() instance and keeps listening for requests
def serve():
    print('Data Processor Service is running..')
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=1))
    data_processor_pb2_grpc.add_DataProcessorServiceServicer_to_server(Servicer(), server)
    # server.add_insecure_port('[::]:50051')
    server.add_insecure_port('0.0.0.0:8089')
    server.start()
    server.wait_for_termination()

app = serve()

if __name__ == '__main__':
    id = os.environ['login_id']
    pw = os.environ['login_pw']
    home_path = os.environ['HOME']
    with open(home_path+'/.netrc', 'w') as f:
        f.write('machine urs.earthdata.nasa.gov login {user_name} password {password}'.format(user_name=id, password=pw))

    print("Service will run now")
    serve()
