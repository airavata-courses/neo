import redis
import pika
import sys
import os
import pickle

r = redis.Redis(host='localhost', port=6379)


def main():
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()

    channel.queue_declare(queue='data_output_queue', durable=True)

    def callback(ch, method, properties, body):
        message_json = pickle.loads(body)
        print(" [x] Received %r" % message_json)

        request_id = message_json["request_id"]
        data_output_msg = {"type": "nexrad",
                           "payload": "base64formatofanimage"}
        r.set(request_id, data_output_msg)

        print(" [x] Done")

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(
        queue='data_output_queue', on_message_callback=callback, auto_ack=True)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()


if __name__ == '__main__':
    print('Redis service running..')
    main()
