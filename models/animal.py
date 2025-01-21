from db import db


class Animal(db.Model):
    __tablename__ = 'animals'

    id = db.Column(db.Integer, primary_key=True)
    end_node_id = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255))
    species = db.Column(db.String(255))
    description = db.Column(db.Text)
    date_added = db.Column(db.DateTime, default=db.func.current_timestamp())

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, data):
        for key, value in data.items():
            setattr(self, key, value)
        db.session.commit()

    @classmethod
    def find_by_id(cls, animal_id):
        return cls.query.filter_by(id=animal_id).first()

    @classmethod
    def get_all(cls):
        return cls.query.all()

    def to_dict(self):
        return {
            "id": self.id,
            "end_node_id": self.end_node_id,
            "name": self.name,
            "species": self.species,
            "description": self.description,
            "date_added": self.date_added.isoformat(),
        }
