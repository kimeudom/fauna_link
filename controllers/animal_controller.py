from models.animal import Animal


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
