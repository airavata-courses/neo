from flask import Blueprint, jsonify, request
import requests

metadata_api = Blueprint('metadata_api', __name__)


@metadata_api.route('/metadata', methods=["GET"])
def metadata():
    if request.method == 'GET':
        metadata_response = requests.get(
            'http://metadata-service:52000/metadata.json')
        return metadata_response.json(), 200
    else:
        return jsonify({"message": "Method Not Allowed"}), 405
