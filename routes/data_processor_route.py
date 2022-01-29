from flask import Blueprint, jsonify
import grpc

data_processor_api = Blueprint('data_processor_api', __name__)

channel = grpc.insecure_channel('localhost:50052')
stub = auth_data_pb2_grpc.AuthServiceStub(channel)

@data_processor_api.route('/widget/<id>/data', methods=["POST", "GET"])
def login():
    # response = stub.getSampleData(auth_data_pb2.SampleRequest(my_request='Hello from client'))
    
    return response.my_response