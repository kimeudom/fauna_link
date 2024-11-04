from models.animal import Animal
from models.gps import GPSData
from sqlalchemy import func
from db import db


def create_animal(data):
    animal = Animal(
        end_node_id=data.get("end_node_id"),
        name=data.get("name"),
        species=data.get("species"),
        description=data.get("description")
    )
    animal.save_to_db()
    return {"message": "Animal created successfully", "animal": animal.to_dict()}


def get_all_animals():
    animals = Animal.get_all()
    return [animal.to_dict() for animal in animals]


def get_animal_by_id(animal_id):
    animal = Animal.find_by_id(animal_id)
    if animal:
        return animal.to_dict()
    return None


def update_animal(animal_id, data):
    animal = Animal.find_by_id(animal_id)
    if animal:
        animal.update(data)
        return {"message": "Animal updated successfully", "animal": animal.to_dict()}
    return {"error": "Animal not found"}


def delete_animal(animal_id):
    animal = Animal.find_by_id(animal_id)
    if animal:
        animal.delete_from_db()
        return {"message": "Animal deleted successfully"}
    return {"error": "Animal not found"}


def get_animal_with_latest_location(animal_id=None):
    # Define the subquery for the latest timestamp
    latest_timestamp_subquery = db.session.query(func.max(GPSData.timestamp))\
        .filter(GPSData.animal_id == Animal.id)\
        .correlate(Animal)\
        .scalar_subquery()

    # Main query joining Animal and GPSData
    query = db.session.query(
        Animal.id.label("animal_id"),
        Animal.name,
        Animal.species,
        Animal.description,
        GPSData.latitude,
        GPSData.longitude,
        GPSData.altitude,
        GPSData.timestamp,
        GPSData.battery_level,
        GPSData.signal_strength
    ).join(GPSData, GPSData.animal_id == Animal.id)\
     .filter(GPSData.timestamp == latest_timestamp_subquery)

    if animal_id:
        query = query.filter(Animal.id == animal_id)

    results = query.all()

    if not results:
        return None if animal_id else []

    data = [{
        "animal_id": result.animal_id,
        "name": result.name,
        "species": result.species,
        "description": result.description,
        "latitude": result.latitude,
        "longitude": result.longitude,
        "altitude": result.altitude,
        "battery_level": result.battery_level,
        "signal_strength": result.signal_strength,
          "timestamp": result.timestamp
    } for result in results]

    return data[0] if animal_id else data
