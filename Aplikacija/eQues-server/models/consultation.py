from models.shared import db
from sqlalchemy.sql import func
from .consultation_student import *

class Consultation(db.Model):
    __tablename__='consultations'

    def __init__(self, day, time, proffessor_id):
        self.day = day
        self.time = time
        self.proffessor_id = proffessor_id
       
    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.String(10), nullable=False)
    time = db.Column(db.String(10), nullable=False)

    proffessor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    proffessor = db.relationship('User', back_populates='consultations')
    
    students = db.relationship('User', secondary=ConsultationsStudents,\
                                         back_populates='consultations_stud')

    def serialize(self):
        return {'id': self.id, 'day': self.day, 'time': self.time, 'proffessor_id': self.proffessor_id}