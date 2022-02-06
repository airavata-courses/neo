from flask import Blueprint, jsonify, request
import grpc
import auth_pb2
import auth_pb2_grpc

auth_api = Blueprint('auth_api', __name__)

# TBD: channel port number
channel = grpc.insecure_channel('localhost:43000', options=(('grpc.enable_http_proxy', 0),))
stub = auth_pb2_grpc.AuthStub(channel)

# TBD: endpoint name
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
        return jsonify({"response": response}), 200
    else:
        return jsonify({"message": "Method Not Allowed"}), 405

    