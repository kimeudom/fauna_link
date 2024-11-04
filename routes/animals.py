from flask import Blueprint, request, jsonify
from flasgger import swag_from
from controllers.animal_controller import get_all_animals, get_animal_by_id, create_animal, update_animal, delete_animal, get_animal_with_latest_location

animal_bp = Blueprint('animal', __name__)


@animal_bp.route('/', methods=['GET'])
@swag_from('../documentation/api_documentation/animal.yml')
def get_animals():
    animals = get_all_animals()
    return jsonify(animals), 200


@animal_bp.route('/<int:animal_id>', methods=['GET'])
@swag_from('../documentation/api_documentation/get_animal_by_id.yml')
def get_animal(animal_id):
    animal = get_animal_by_id(animal_id)
    return jsonify(animal), 200


@animal_bp.route('/', methods=['POST'])
@swag_from('../documentation/api_documentation/post_animal.yml')
def add_animal():
    data = request.json
    animal = create_animal(data)
    return jsonify(animal), 201


@animal_bp.route('/<int:animal_id>', methods=['PUT'])
@swag_from('../documentation/api_documentation/put_animal.yml')
def modify_animal(animal_id):
    data = request.json
    animal = update_animal(animal_id, data)
    return jsonify(animal), 200


@animal_bp.route('/<int:animal_id>', methods=['DELETE'])
@swag_from('../documentation/api_documentation/delete_animal.yml')
def remove_animal(animal_id):
    delete_animal(animal_id)
    return jsonify({"message": "Animal deleted"}), 200


@animal_bp.route('/latest_location', methods=['GET'])
@swag_from('../documentation/api_documentation/get_latest_location_all_animals.yml')
def get_animals_with_latest_location():
    animals = get_animal_with_latest_location()
    return jsonify(animals), 200


@animal_bp.route('/<int:animal_id>/latest_location', methods=['GET'])
@swag_from('../documentation/api_documentation/get_latest_location_by_animal_id.yml')
def get_animal_with_latest_location_by_id(animal_id):
    animal = get_animal_with_latest_location(animal_id)
    if animal:
        return jsonify(animal), 200
    return jsonify({"error": "Animal not found or no GPS data available"}), 404
