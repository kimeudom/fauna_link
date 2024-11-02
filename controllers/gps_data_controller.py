from models.gps import GPSData


def save_gps_data(data):
    gps_data = GPSData(
        animal_id=data.get('animal_id'),
        latitude=data.get('latitude'),
        longitude=data.get('longitude'),
        altitude=data.get('altitude'),
        battery_level=data.get('battery_level'),
        signal_strength=data.get('signal_strength')
    )
    gps_data.save_to_db()
    return {"status": "GPS data saved"}


def get_all_gps_data():
    gps_data_list = GPSData.get_all()
    return [data.to_dict() for data in gps_data_list]


def get_gps_data_by_animal_id(animal_id):
    gps_data_list = GPSData.find_by_animal_id(animal_id)
    return [data.to_dict() for data in gps_data_list]
