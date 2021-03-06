from models.shared import db
from sqlalchemy.sql import func

class Comment(db.Model):
    __tablename__='comments'

    def __init__(self, text, answer_id, user_id):
        self.text = text
        self.answer_id = answer_id
        self.user_id = user_id
       
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    timestamp = db.Column(db.DateTime(), nullable=False, server_default=func.now())

    answer_id = db.Column(db.Integer, db.ForeignKey('answers.id'), nullable=False)
    answer = db.relationship('Answer', back_populates='comments')
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='comments')

    def serialize(self):
        return {'id': self.id, 'text': self.text, 'timestampStr': self.timestamp, \
                'answerId': self.answer_id, 'userId': self.user_id }