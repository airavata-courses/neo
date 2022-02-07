from flask import Blueprint, jsonify, request
import grpc
import registry_pb2
import registry_pb2_grpc
import auth_pb2
import auth_pb2_grpc
from proto_converters import protobuf_to_dict


registry_api = Blueprint('registry_api', __name__)

# Change hostname from "auth-service" to "localhost" if running without docker-compose
channel = grpc.insecure_channel('registry-service:41000', options=(('grpc.enable_http_proxy', 0),))
stub = registry_pb2_grpc.RegistryStub(channel)

auth_channel = grpc.insecure_channel('auth-service:43000', options=(('grpc.enable_http_proxy', 0),))
auth_stub = auth_pb2_grpc.AuthStub(auth_channel)

@registry_api.route('/widget', methods=["GET"])
def widget():
    if request.method == 'GET':
        auth_token = request.headers.get('Authorization')
        if not auth_token:
            auth_token = ' '
        auth_response = auth_stub.authUser(
            auth_pb2.AuthArgs(
                accessToken=auth_token
            )
        )
        print("auth_response.isAuth: ", auth_response.isAuth)
        if not auth_response.isAuth:
            return jsonify(protobuf_to_dict(auth_response)), 401

        station = request.args.get('station')
        feature = request.args.get('feature')
        date = request.args.get('date')
        email = request.args.get('email')
        

        registry_response = stub.registerWidget(
            registry_pb2.Widget(
                station=station,
                feature=feature,
                date=date,
                email=email
            )
        )
        response_dict = {
            isAuth: auth_response.isAuth,
            status: registry_response.status,
        }
        return jsonify(response_dict), 200
    else:
        return jsonify({"message": "Method Not Allowed"}), 405

    