from models.shared import db
from sqlalchemy.sql import func
from .answer_grade import *

class Grade(db.Model):
    __tablename__='grades'

    value = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime(), server_default=func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    user = db.relationship('User', back_populates='grades')

    answers = db.relationship('Answer', secondary=AnswerGrade, back_populates='grades')
    
    def serialize(self):
        return {'value': self.value, 'timestampStr': self.timestamp, 'userId': self.user_id }