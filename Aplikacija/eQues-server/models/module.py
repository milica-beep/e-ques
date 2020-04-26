from models.shared import db

class Module(db.Model):
    __tablename__ = 'modules'
    
    def __init__(self, name):
        self.name = name

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))

    user = db.relationship('User', back_populates='module', uselist=False)

    def serialize(self):
        return {'id': self.id, 'name': self.name}