from models.shared import db

class Role(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    description = db.Column(db.String(10))
    
    user = db.relationship('User', back_populates='role', uselist=False)