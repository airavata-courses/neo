from flask import Blueprint, jsonify, request
from proto_converters import protobuf_to_dict
import grpc
import registry_pb2
import registry_pb2_grpc
import auth_pb2
import auth_pb2_grpc
import pika
import pickle
import sys
import requests


data_api = Blueprint('data_api', __name__)

# RabbitMQ connection
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='rabbitmq-neo'))


@data_api.route('/nexrad-data', methods=["GET"])
def nexrad_data():
    if request.method == 'GET':
        print('debug: bearer token: ', request.headers.get(
            'Authorization'))
        # -------- Service 1: Call to Auth Service --------

        # Create channels and stubs
        auth_channel = grpc.insecure_channel(
            'auth-service:43000', options=(('grpc.enable_http_proxy', 0),))
        auth_stub = auth_pb2_grpc.AuthStub(auth_channel)
        print('debug: grpc channel created')
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
            response_dict = {
                'isAuth': auth_response.isAuth,
                'status': False,
                'ack': 0,
                'data_output_value': -1
            }
            return jsonify(response_dict), 401

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

        # -------- Service 3: Call to Redis Service (check if exists) -------

        request_id = request.args.get('request_id')
        redis_query_params = {"request_id": request_id}
        print("redis_query_params: ", redis_query_params)
        return jsonify("done")

        redis_response = requests.get(
            'http://redis-service:8083/weather_output', params=redis_query_params)
        print('Redis response: ', redis_response.json())
        # If Redis hits, return data_output_value
        if redis_response.json()["data_output_value"] != -1:
            response_dict = {
                'isAuth': auth_response.isAuth,
                'status': registry_response.status,
                'ack': 0,
                'data_output_value': redis_response.json()["data_output_value"]
            }
            return jsonify(response_dict), 200

        # -------- Service 4: Call to data service (if Redis misses) --------

        # Create RabbitMQ channel
        channel = connection.channel()
        # Declare work queue
        channel.queue_declare(queue='request_queue', durable=True)
        # Prepare message
        request_type = 'nexrad'
        year = request.args.get('year')
        month = request.args.get('month')
        day = request.args.get('day')
        hour = request.args.get('hour')
        minute = request.args.get('minute')
        feature = request.args.get('feature')
        station = request.args.get('station')

        # year = "2016"
        # month = "11"
        # day = "11"
        # hour = "02"
        # minute = "55"
        # feature = "reflectivity"
        # station = "KLVX"

        message_json = {
            "request_id": request_id,
            "request_type": request_type,
            "year": year,
            "month": month,
            "day": day,
            "hour": hour,
            "minute": minute,
            "feature": feature,
            "station": station
        }
        serialized_message = pickle.dumps(message_json)

        # Publish to declared work queue
        try:
            channel.basic_publish(
                exchange='',
                routing_key='request_queue',
                body=serialized_message,
                properties=pika.BasicProperties(
                    delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
                ))
            ack = 1
            print(" [x] Sent %r" % message_json)
        except:
            print(f'Publish error for request ID {request_id}.')
            ack = 0

        # Close the channel after message has been published
        channel.close()

        # -------- Consolidating Response --------
        response_dict = {
            'isAuth': True,
            'status': registry_response.status,
            'ack': ack,
            'data_output_value': -1
        }
        return jsonify(response_dict), 200
    else:
        return jsonify({"message": "Method Not Allowed"}), 405


@data_api.route('/nasa-data', methods=["GET"])
def nasa_data():
    if request.method == 'GET':

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
            response_dict = {
                'isAuth': auth_response.isAuth,
                'status': False,
                'ack': 0,
                'data_output_value': -1
            }
            return jsonify(response_dict), 401

        print("User authorized...")

        # -------- Service 2: Call to Registry Service --------
        # TBD

        # -------- Service 3: Call to Redis Service (check if exists) -------

        request_id = request.args.get('request_id')
        redis_query_params = {"request_id": request_id}
        print("redis_query_params: ", redis_query_params)
        redis_response = 'initial_val'
        try:
            redis_response = requests.get(
                'http://redis-service:8083/weather_output', params=redis_query_params)
            print('Redis response: ', redis_response, flush=True)
        except:
            print('Error: Redis GET request failed.')
        print('Redis response: ', redis_response, flush=True)
        # If Redis hits, return data_output_value
        if redis_response.json()["data_output_value"] != -1:
            response_dict = {
                'isAuth': auth_response.isAuth,
                'status': registry_response.status,
                'ack': 0,
                'data_output_value': redis_response.json()["data_output_value"]
            }
            return jsonify(response_dict), 200
        # TEST
        return jsonify("done")
        # -------- Service 4: Call to data service (if Redis misses) --------

        # Create RabbitMQ channel
        channel = connection.channel()
        # Declare work queue
        channel.queue_declare(queue='request_queue', durable=True)
        # Prepare message
        request_type = 'nasa'
        year = request.args.get('year')
        month = request.args.get('month')
        day = request.args.get('day')
        feature = request.args.get('feature')

        message_json = {
            "request_id": request_id,
            "request_type": request_type,
            "year": year,
            "month": month,
            "day": day,
            "feature": feature
        }
        serialized_message = pickle.dumps(message_json)

        # Publish to declared work queue
        try:
            channel.basic_publish(
                exchange='',
                routing_key='request_queue',
                body=serialized_message,
                properties=pika.BasicProperties(
                    delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
                ))
            ack = 1
            print(" [x] Sent %r" % message_json)
        except:
            print(f'Publish error for request ID {request_id}.')
            ack = 0

        # Close the channel after message has been published
        channel.close()

        # -------- Consolidating Response --------
        response_dict = {
            'isAuth': True,
            'status': False,
            'ack': ack,
            'data_output_value': -1
        }
        return jsonify(response_dict), 200
    else:
        return jsonify({"message": "Method Not Allowed"}), 405


@data_api.route('/poll-data', methods=["GET"])
def poll_data():

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
        response_dict = {
            'isAuth': auth_response.isAuth,
            'data_output_value': -1
        }
        return jsonify(response_dict), 401

    print("User authorized...")

    # -------- Service 2: Call to Redis Service for Polling --------

    request_id = request.args.get('request_id')

    redis_query_params = {"request_id": str(request_id)}
    redis_response = requests.get(
        'http://redis-service:8083/weather_output', params=redis_query_params)
    print('redis response: ', redis_response.json())

    # redis_response["data_output_value"] contains value "-1" for miss or data for hit
    response_dict = {
        'isAuth': auth_response.isAuth,
        'data_output_value': redis_response.json()["data_output_value"]
    }
    return jsonify(response_dict), 200
