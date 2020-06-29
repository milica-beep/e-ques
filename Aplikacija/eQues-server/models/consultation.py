from models.shared import db
from sqlalchemy.sql import func
from .consultation_student import *

class Consultation(db.Model):
    __tablename__='consultations'

    def __init__(self, date, time, proffessor_id):
        self.date = date
        self.time = time
        self.proffessor_id = proffessor_id
       
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(50))

    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'))
    subject = db.relationship('Subject', back_populates='consultations')

    professor_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    professor = db.relationship('User', back_populates='consultations')
    
    students = db.relationship('User', secondary=ConsultationsStudents,\
                                         back_populates='consultations_stud')

    def serialize(self):
        return {'id': self.id, 'date': self.date, 'time': self.time, 'professor': self.professor.serialize(),\
                'subjectId': self.subject_id}