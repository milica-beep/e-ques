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
    question = db.relationship('Question', back_populates='answers')
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User',  back_populates='answers')

    comments = db.relationship('Comment', back_populates='answer')
    images = db.relationship('Image', back_populates='answer')

    def serialize(self):
        return {'id': self.id, 'text': self.text, 'isPinned': self.is_pinned, 'grade': self.grade, \
                'timestamp': self.timestamp, 'questionId': self.question_id, 'userId': self.user_id }