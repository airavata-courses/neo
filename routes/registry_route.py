from flask import Blueprint, jsonify, request
import grpc
import registry_pb2
import registry_pb2_grpc

registry_api = Blueprint('registry_api', __name__)

# TBD: channel port number
channel = grpc.insecure_channel('localhost:50054', options=(('grpc.enable_http_proxy', 0),))
stub = registry_pb2_grpc.RegistryStub(channel)

# TBD: endpoint name
@registry_api.route('/registry', methods=["POST", "GET"])
def registry():
    if request.method == 'POST':
        response = stub.registerWidget(
            registry_pb2.Widget(
                station=station,
                feature=feature,
                date=date,
                email=email
            )
        )
        print("Register Widget Response Received: " + str(response))
        return jsonify("Register Widget Response Received: ", str(response))

    elif request.method == 'GET':
        response = stub.getHistory(
            registry_pb2.HistoryArgs(
                page=page,
                email=email
            )
        )
        print("Get History Response: " + str(response))
        return jsonify("Get History Response: ", str(response))
    else:
        return jsonify({"status": 405, "message": "Method Not Allowed"})

    