from data_viz_engine import get_result_image

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
        print("type: " , type(image_base64))
        return data_processor_pb2.ResultImage(image_base64=image_base64)



    def getSampleData(self, request, context):
        custom_response = "Client said: " + request.my_request + ". Server said: You are: " + request.my_req_data
        custom_resp_data = "Authenticated " + request.my_req_data
        print(custom_resp_data)
        return auth_pb2.SampleResponse(my_response=custom_response, my_resp_data=custom_resp_data)


# serve() runs a Servicer() instance and keeps listening for requests
def serve():
    print('Data Processor Service is running..')
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    data_processor_pb2_grpc.add_DataProcessorServiceServicer_to_server(Servicer(), server)
    # server.add_insecure_port('[::]:50051')
    server.add_insecure_port('localhost:50052')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()