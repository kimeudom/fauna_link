from flask import Blueprint, request, jsonify
from flasgger import swag_from
from controllers.animal_controller import get_all_animals, get_animal_by_id, create_animal, update_animal, delete_animal

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
