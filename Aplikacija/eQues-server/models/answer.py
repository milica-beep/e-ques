from models.shared import db
from sqlalchemy.sql import func

class Answer(db.Model):
    __tablename__='answers'

    def __init__(self, text, question_id, user_id, is_pinned, grade, timestamp):
        self.text = text
        self.question_id = question_id
        self.user_id = user_id
        self.is_pinned = is_pinned
        self.grade = grade
        self.timestamp = timestamp

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    is_pinned = db.Column(db.Boolean)
    grade = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime(), nullable=False, server_default=func.now())

    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    question = db.relationship('Question', uselist=False, back_populates='answer')
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User',  back_populates='answers')

    comment = db.relationship('Comment', back_populates='answer', uselist=False)

    def serialize(self):
        return {'id': self.id, 'text': self.text, 'is_pinned': self.is_pinned, 'grade': self.grade, \
                'timestamp': self.timestamp, 'question_id': self.question_id, 'user_id': self.user_id }