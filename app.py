import redis
import pika
import sys
import os
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
from threading import Thread
import json

app = Flask(__name__)
CORS(app)

r = redis.Redis(host='redis-neo', port=6379)


@app.route('/weather_output', methods=["GET", "POST"])
def weather_output():
    if request.method == 'GET':
        print('Checking Redis for existing request output..')
        request_id = request.args.get('request_id')
        print('request_id: ', str(request))

        data_output_value = r.get(request_id)
        if not data_output_value:
            return jsonify({'data_output_value': -1})
        print('data output value: ', str(data_output_value))
        return jsonify({'data_output_value': str(data_output_value)})

    elif request.method == 'POST':
        request_id = request.json.get("request_id")
        data_output_value = request.json.get("data_output_value")
        print('request_id received: ', request_id)
        print('data_output_value received = ', data_output_value)
        try:
            r.set(request_id, data_output_value)
        except:
            print('Error: Redis write error for key={}\n',
                  request_id)
            return 400
        return jsonify("Redis write success"), 201


if __name__ == '__main__':
    print('Redis service starting..')
    app.run(host='0.0.0.0', port='8083', debug=True)
