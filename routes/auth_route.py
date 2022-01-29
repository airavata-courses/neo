from flask import Blueprint, jsonify
import grpc
import auth_data_pb2
import auth_data_pb2_grpc

auth_api = Blueprint('auth_api', __name__)

channel = grpc.insecure_channel('localhost:50051')
stub = auth_data_pb2_grpc.AuthServiceStub(channel)

@auth_api.route('/login', methods=["POST", "GET"])
def login():
    response = stub.getSampleData(auth_data_pb2.SampleRequest(my_request='Hello from client'))
    
    return response.my_response