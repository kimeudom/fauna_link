from models.alert import Alert


def save_alert(alert_data):
    alert = Alert(
        animal_id=alert_data.get('animal_id'),
        alert_type=alert_data.get('alert_type'),
        description=alert_data.get('description')
    )
    alert.save_to_db()
    return {"status": "Alert saved"}


def get_all_alerts():
    alert_list = Alert.get_all()
    return [alert.to_dict() for alert in alert_list]


def get_alerts_by_animal_id(animal_id):
    alert_list = Alert.find_by_animal_id(animal_id)
    return [alert.to_dict() for alert in alert_list]
