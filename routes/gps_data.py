from flask import Blueprint, request, jsonify
from flasgger import swag_from
from controllers.gps_data_controller import get_all_gps_data, get_gps_data_by_animal_id, save_gps_data

gps_data_bp = Blueprint('gps_data', __name__)


# For getting all GPS data
@gps_data_bp.route('/', methods=['GET'])
@swag_from('../documentation/api_documentation/gps_data.yml')
def get_gps_data():
    gps_data = get_all_gps_data()
    return jsonify(gps_data), 200

# For getting GPS data by animal ID


@gps_data_bp.route('/<int:animal_id>', methods=['GET'])
@swag_from('../documentation/api_documentation/get_gps_data_by_animal_id.yml')
def get_gps_data_by_animal(animal_id):
    gps_data = get_gps_data_by_animal_id(animal_id)
    return jsonify(gps_data), 200

# For adding new GPS data


@gps_data_bp.route('/', methods=['POST'])
@swag_from('../documentation/api_documentation/post_gps_data.yml')
def add_gps_data():
    data = request.json
    gps_data = save_gps_data(data)
    return jsonify(gps_data), 201
