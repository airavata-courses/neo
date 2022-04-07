from data_viz_engine import get_result_image
from data_nasa_ingest import get_json_file
import pika
import pickle
import requests
import os


# print("Data service running..")
# id = os.environ['login_id']
# pw = os.environ['login_pw']
# print(os.environ['login_id'])
# print(os.environ['login_pw'])
# home_path = os.environ['HOME']
# with open(home_path+'/.netrc', 'w') as f:
#     f.write('machine urs.earthdata.nasa.gov login {user_name} password {password}'.format(user_name=id, password=pw))


# Establish RabbitMQ connection
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='rabbitmq-neo'))


# REST: POST request to Redis-Flask server to update Redis
def publish_output(request_id, data_output_value):
    request_body = {"request_id": str(request_id),
                    "data_output_value": str(data_output_value)}
    print("request_body: ", request_body)
    redis_response = requests.post(
        'http://redis-service:8083/weather-output', json=request_body)
    print('redis POST response: ', redis_response.json())


# RabbitMQ: Consume input query message from message queue
def consume_input_query():
    # Create channel
    channel = connection.channel()

    channel.queue_declare(queue='request_queue', durable=True)
    print(' [*] Waiting for messages. To exit press CTRL+C')

    def callback(ch, method, properties, body):
        message_json = pickle.loads(body)
        print(" [x] Consumed from request_queue: %r" % message_json)
        print(" Processing input query...")

        request_id = message_json["request_id"]
        request_type = message_json["request_type"]

        data_output_value = -1
        if request_type == 'nasa':
            feature = message_json["feature"]
            year = message_json["year"]
            month = message_json["month"]
            day = message_json["day"]
            date = year + '-' + month + '-' + day

            print("feature: ", feature)
            print("date: ", date)
            # Get NASA json file
            data_output_value = get_json_file(product=feature, begTime=date)

        elif request_type == 'nexrad':
            year = message_json["year"]
            month = message_json["month"]
            day = message_json["day"]
            hour = message_json["hour"]
            minute = message_json["minute"]
            feature = message_json["feature"]
            station = message_json["station"]

            # Get NEXRAD base64 image
            data_output_value = get_result_image(
                station=station, year=year, month=month, date=day, hour=hour, minute=minute, product=feature)

        publish_output(request_id, data_output_value)
        ch.basic_ack(delivery_tag=method.delivery_tag)
        print(" [x] Done")

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='request_queue',
                          on_message_callback=callback)
    channel.start_consuming()


app = consume_input_query()

if __name__ == '__main__':
print("Data service running..")
id = os.environ['login_id']
pw = os.environ['login_pw']
home_path = os.environ['HOME']
with open(home_path+'/.netrc', 'w') as f:
    f.write('machine urs.earthdata.nasa.gov login {user_name} password {password}'.format(user_name=id, password=pw))
