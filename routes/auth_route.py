from flask import Blueprint, jsonify, request
import grpc
import auth_pb2
import auth_pb2_grpc

auth_api = Blueprint('auth_api', __name__)

# TBD: channel port number
channel = grpc.insecure_channel('localhost:50005', options=(('grpc.enable_http_proxy', 0),))
stub = auth_pb2_grpc.AuthStub(channel)

# TBD: endpoint name
@auth_api.route('/login', methods=["POST", "GET"])
def login():
    if request.method == 'POST':
        response = stub.loginUser(
            auth_pb2.LoginArgs(
                tokenId=tokenId
            )
        )
        return jsonify("Response: ", str(response))
    else:
        return jsonify({"status": 405, "message": "Method Not Allowed"}), 405

    