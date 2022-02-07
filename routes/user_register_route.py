from flask import Blueprint, jsonify
import grpc
import user_register_pb2
import user_register_pb2_grpc

user_register_api = Blueprint('user_register_api', __name__)

channel = grpc.insecure_channel('localhost:50053', options=(('grpc.enable_http_proxy', 0),))
stub = user_register_pb2_grpc.UserRegisterStub(channel)

@user_register_api.route('/register', methods=["POST", "GET"])
def register():
    response = stub.registerUser(
        user_register_pb2.User(
            name=name,
            photoURL=photoURL,
            tokenId=tokenId,
            email=email
        )
    )

    print("User Register Response: " + str(response))
    return jsonify("User Register Response: ", str(response))