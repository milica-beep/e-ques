from models.shared import db
from sqlalchemy.sql import func

class Comment(db.Model):
    __tablename__='comments'

    def __init__(self, text, answer_id, user_id, timestamp):
        self.text = text
        self.timestamp = timestamp
        self.answer_id = answer_id
        self.user_id = user_id
       
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    timestamp = db.Column(db.DateTime(), nullable=False, server_default=func.now())

    answer_id = db.Column(db.Integer, db.ForeignKey('answers.id'), nullable=False)
    answer = db.relationship('Answer', uselist=False, back_populates='comment')
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', uselist=False, back_populates='comment')

    def serialize(self):
        return {'id': self.id, 'text': self.text, 'timestamp': self.timestamp, \
                'answer_id': self.answer_id, 'user_id': self.user_id }