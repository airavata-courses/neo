from flask import Blueprint, jsonify
import grpc
import data_processor_pb2
import data_processor_pb2_grpc

# from neo.grpc_classes import data_processor_pb2
# from neo.grpc_classes import data_processor_pb2_grpc

data_processor_api = Blueprint('data_processor_api', __name__)

channel = grpc.insecure_channel('localhost:50052', options=(('grpc.enable_http_proxy', 0),))
stub = data_processor_pb2_grpc.DataProcessorServiceStub(channel)

@data_processor_api.route('/image', methods=["POST", "GET"])
def image():
    station = 'KLVX'
    year = '2021'
    month = '12'
    day = '11'
    hour = '02'
    minute = '55'
    feature = 'velocity'

    image_base64 = None
    image_base64 = stub.getImage(
        data_processor_pb2.InputQuery(
            year=year,
            month=month,
            day=day,
            hour=hour,
            minute=minute,
            feature=feature,
            station=station
    ))
    print("Base 64 Image Received: " + str(image_base64))
    return jsonify("Image Received: ", str(image_base64))