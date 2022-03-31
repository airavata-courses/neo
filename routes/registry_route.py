from flask import Blueprint, jsonify, request
import grpc
import registry_pb2
import registry_pb2_grpc
import auth_pb2
import auth_pb2_grpc
import data_processor_pb2
import data_processor_pb2_grpc
from proto_converters import protobuf_to_dict

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


@registry_api.route('/widget', methods=["GET"])
def widget():
    if request.method == 'GET':

        # -------- Service 3: Call to Data Processor Service --------

        # RabbitMQ connection
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='localhost'))
        channel = connection.channel()

        # Declare work queue
        channel.queue_declare(queue='request_queue', durable=True)

        # Prepare message
        email = "niravraje3@gmail.com"
        year = "2016"
        month = "11"
        day = "11"
        hour = "02"
        minute = "55"
        feature = "reflectivity"
        station = "KLVX"

        message_json = {"email": email, "year": year, "month": month, "day": day,
                        "hour": hour, "minute": minute, "feature": feature, "station": station}
        serialized_msg = pickle.dumps(message_json)

        # Publish to declared work queue
        channel.basic_publish(
            exchange='',
            routing_key='request_queue',
            body=serialized_msg,
            properties=pika.BasicProperties(
                delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
            ))
        print(" [x] Sent %r" % message_json)

        # Close the connection after message has been published
        connection.close()
        return jsonify({"msg": "done"})

        # -------- Service 1: Call to Auth Service --------

        # Create channels and stubs
        auth_channel = grpc.insecure_channel(
            'auth-service:43000', options=(('grpc.enable_http_proxy', 0),))
        auth_stub = auth_pb2_grpc.AuthStub(auth_channel)

        auth_token = request.headers.get('Authorization')
        if not auth_token:
            auth_token = ' '
        auth_response = auth_stub.authUser(
            auth_pb2.AuthArgs(
                accessToken=auth_token
            )
        )
        print("auth_response.isAuth: ", auth_response.isAuth)
        auth_channel.close()
        if not auth_response.isAuth:
            return jsonify(protobuf_to_dict(auth_response)), 401

        print("User authorized...")

        # -------- Service 2: Call to Registry Service --------

        # Create channels and stubs
        reg_channel = grpc.insecure_channel(
            'registry-service:41000', options=(('grpc.enable_http_proxy', 0),))
        reg_stub = registry_pb2_grpc.RegistryStub(reg_channel)

        # Retrieve request args
        station = request.args.get('station')
        feature = request.args.get('feature')
        print("feature: ", feature)
        date = request.args.get('date')
        email = request.args.get('email')
        day = request.args.get('day')
        month = request.args.get('month')
        year = request.args.get('year')
        hour = request.args.get('hour')
        minute = request.args.get('minute')

        print("str(date): ", str(date))

        # Send requested widget's parameters to registry service
        registry_response = reg_stub.registerWidget(
            registry_pb2.Widget(
                station=station,
                feature=feature,
                date=date,
                email=email
            )
        )
        print("registry_response.status: ", str(registry_response.status))
        reg_channel.close()

        # -------- Service 3: Call to Data Processor Service --------

        dp_channel = grpc.insecure_channel(
            'data-service:8082', options=(('grpc.enable_http_proxy', 0),))
        dp_stub = data_processor_pb2_grpc.DataProcessorServiceStub(dp_channel)

        image_base64 = None
        image_base64 = dp_stub.getImage(
            data_processor_pb2.InputQuery(
                year=year,
                month=month,
                day=day,
                hour=hour,
                minute=minute,
                feature=feature,
                station=station
            ))
        print("Base 64 image's initial chars: ", str(image_base64)[:50])

        dp_channel.close()

        # -------- Consolidating Response --------
        response_dict = {
            'isAuth': True,
            'status': registry_response.status,
            'image': str(image_base64)
        }
        return jsonify(response_dict), 200
    else:
        return jsonify({"message": "Method Not Allowed"}), 405


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
