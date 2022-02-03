from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

# import blueprints (APIs) from routes
# from routes.auth_route import auth_api
from routes.data_processor_route import data_processor_api

app = Flask(__name__)
CORS(app)

@app.route('/', methods=["POST", "GET"])
def check():
    print('Gateway is running...')
    return "Gateway Started!"


# Contains the routes for the authentication APIs defined in the auth microservice
# app.register_blueprint(auth_api)
app.register_blueprint(data_processor_api)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='8081')