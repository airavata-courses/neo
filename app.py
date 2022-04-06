from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

# import blueprints (APIs) from routes
from routes.registry_route import registry_api
from routes.auth_route import auth_api
from routes.metadata_route import metadata_api
from routes.data_route import data_api


app = Flask(__name__)
CORS(app)


@app.route('/', methods=["POST", "GET"])
def check():
    print('Gateway is running...')
    return "Gateway Started!"


app.register_blueprint(auth_api)
app.register_blueprint(registry_api)
app.register_blueprint(metadata_api)
app.register_blueprint(data_api)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8081')
