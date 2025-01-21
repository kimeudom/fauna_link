from db import db


class GPSData(db.Model):
    __tablename__ = 'gps_data'

    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey(
        'animals.id'), nullable=False)
    latitude = db.Column(db.Numeric(10, 8))
    longitude = db.Column(db.Numeric(11, 8))
    altitude = db.Column(db.Numeric(10, 2))
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
    battery_level = db.Column(db.Float)
    signal_strength = db.Column(db.Float)

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
            "latitude": float(self.latitude),
            "longitude": float(self.longitude),
            "altitude": float(self.altitude),
            "timestamp": self.timestamp.isoformat(),
            "battery_level": self.battery_level,
            "signal_strength": self.signal_strength
        }
