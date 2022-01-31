from flask import Blueprint, jsonify
import grpc
import sample_pb2_grpc
import sample_pb2

sample_api = Blueprint('sample_api', __name__)

channel = grpc.insecure_channel('localhost:50051')
stub = sample_pb2_grpc.AuthServiceStub(channel)

@sample_api.route('/sample', methods=["POST", "GET"])
def sample():
    response = stub.getSampleData(sample_pb2.SampleRequest(my_request='Hello from client', my_req_data="ABC Client"))
    
    return jsonify(response.my_response, response.my_resp_data)