from db import db


class Alert(db.Model):
    __tablename__ = 'alerts'

    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey(
        'animals.id'), nullable=False)
    alert_type = db.Column(db.String(255))
    description = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_animal_id(cls, animal_id):
        return cls.query.filter_by(animal_id=animal_id).all()

    @classmethod
    def get_all(cls):
        return cls.query.all()

    def to_dict(self):
        """Convert model instance to dictionary."""
        return {
            "id": self.id,
            "animal_id": self.animal_id,
            "alert_type": self.alert_type,
            "description": self.description,
            "timestamp": self.timestamp.isoformat()
        }
