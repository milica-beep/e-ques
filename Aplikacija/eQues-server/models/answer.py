from models.shared import db
from sqlalchemy.sql import func
from .answer_grade import *

class Answer(db.Model):
    __tablename__='answers'

    def __init__(self, text, question_id, user_id, is_pinned, grade):
        self.text = text
        self.question_id = question_id
        self.user_id = user_id
        self.is_pinned = is_pinned
        self.average_grade = grade

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    is_pinned = db.Column(db.Boolean)
    average_grade = db.Column(db.Float)
    timestamp = db.Column(db.DateTime(), nullable=False, server_default=func.now())

    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    question = db.relationship('Question', back_populates='answers')
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User',  back_populates='answers')

    comments = db.relationship('Comment', back_populates='answer')
    images = db.relationship('Image', back_populates='answer')
    grades = db.relationship('Grade', secondary=AnswerGrade, back_populates='answers')

    def serialize(self):
        return {'id': self.id, 'text': self.text, 'isPinned': self.is_pinned, 'averageGrade': self.average_grade, \
                'timestampStr': self.timestamp, 'questionId': self.question_id, 'userId': self.user_id, \
                'grades': [x.serialize() for x in self.grades] }