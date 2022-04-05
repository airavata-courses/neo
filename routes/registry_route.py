from flask import Blueprint, jsonify, request
import grpc
import registry_pb2
import registry_pb2_grpc
import auth_pb2
import auth_pb2_grpc
import data_processor_pb2
import data_processor_pb2_grpc
from proto_converters import protobuf_to_dict
import pika
import pickle
import sys
import requests

registry_api = Blueprint('registry_api', __name__)

# ------------- Create channels and stubs ---------------

# Change hostname from "auth-service" to "localhost" if running without docker-compose
# reg_channel = grpc.insecure_channel(
#     'registry-service:41000', options=(('grpc.enable_http_proxy', 0),))
# reg_stub = registry_pb2_grpc.RegistryStub(reg_channel)

# auth_channel = grpc.insecure_channel(
#     'auth-service:43000', options=(('grpc.enable_http_proxy', 0),))
# auth_stub = auth_pb2_grpc.AuthStub(auth_channel)

# dp_channel = grpc.insecure_channel(
#     'data-service:8082', options=(('grpc.enable_http_proxy', 0),))
# dp_stub = data_processor_pb2_grpc.DataProcessorServiceStub(dp_channel)

# ------------- Create endpoints ---------------


@registry_api.route('/history', methods=["GET"])
def history():

    reg_channel = grpc.insecure_channel(
        'registry-service:41000', options=(('grpc.enable_http_proxy', 0),))
    reg_stub = registry_pb2_grpc.RegistryStub(reg_channel)

    auth_channel = grpc.insecure_channel(
        'auth-service:43000', options=(('grpc.enable_http_proxy', 0),))
    auth_stub = auth_pb2_grpc.AuthStub(auth_channel)

    # -------- Service 1: Call to Auth Service --------
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

    print("User authorized...")
    auth_channel.close()

    # -------- Service 2: Call to Registry Service --------
    # Retrieve request args
    email = request.args.get('email')
    page = request.args.get('page')
    if not page:
        page = str(1)
    history_response = reg_stub.getHistory(
        registry_pb2.HistoryArgs(
            email=email,
            page=page
        )
    )
    history_dict = protobuf_to_dict(history_response)
    history_dict['isAuth'] = auth_response.isAuth
    print("History Response: ", history_dict)

    reg_channel.close()

    return jsonify(history_dict), 200
