from flask import Blueprint, jsonify, request
from proto_converters import protobuf_to_dict
import grpc
import auth_pb2
import auth_pb2_grpc

auth_api = Blueprint('auth_api', __name__)

# Change hostname from "auth-service" to "localhost" if running without docker-compose
channel = grpc.insecure_channel('auth-service:43000', options=(('grpc.enable_http_proxy', 0),))
stub = auth_pb2_grpc.AuthStub(channel)

@auth_api.route('/login', methods=["GET"])
def login():
    if request.method == 'GET':
        tokenId = request.args.get('tokenId')
        if not tokenId:
            tokenId = " "
        
        response = stub.loginUser(
            auth_pb2.LoginArgs(
                tokenId=tokenId
            )
        )
        response_dict = protobuf_to_dict(response)
        return jsonify(response_dict), 200
    else:
        return jsonify({"message": "Method Not Allowed"}), 405

    