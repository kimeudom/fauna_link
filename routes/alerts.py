from flask import Blueprint, request, jsonify
from flasgger import swag_from
from controllers.alert_controller import get_all_alerts, get_alerts_by_animal_id, save_alert

alert_bp = Blueprint('alert', __name__)


@alert_bp.route('/', methods=['GET'])
@swag_from('../documentation/api_documentation/alerts.yml')
def get_alerts():
    alerts = get_all_alerts()
    return jsonify(alerts), 200


@alert_bp.route('/<int:animal_id>', methods=['GET'])
@swag_from('../documentation/api_documentation/get_alerts_by_animal_id.yml')
def get_alerts_by_animal(animal_id):
    alerts = get_alerts_by_animal_id(animal_id)
    return jsonify(alerts), 200


@alert_bp.route('/', methods=['POST'])
@swag_from('../documentation/api_documentation/post_alert.yml')
def add_alert():
    data = request.json
    alert = save_alert(data)
    return jsonify(alert), 201
