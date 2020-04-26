from models.shared import db

class Role(db.Model):
    __tablename__ = 'roles'

    def __init__(self, id, description):
        self.id = id
        self.description = description

    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    description = db.Column(db.String(50))
    
    user = db.relationship('User', back_populates='role', uselist=False)

    def serialize(self):
        return {'id': self.id, 'description': self.description}