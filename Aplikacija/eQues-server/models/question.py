from models.shared import db
from sqlalchemy.sql import func
from .answer import Answer

class Question(db.Model):
    __tablename__ = 'questions'

    def __init__(self, title, text):
        self.title = title
        self.text = text

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    text = db.Column(db.String(500), nullable=False)
    timestamp = db.Column(db.DateTime(), nullable=False, server_default=func.now())

    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)
    topic = db.relationship('Topic', uselist=False, back_populates='question')
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='questions')

    answers = db.relationship('Answer', back_populates='question', order_by=Answer.id)

    def serialize(self):
        return {'id': self.id, 'title': self.title, 'text': self.text, \
            'timestampStr': self.timestamp.strftime('%d/%m/%Y, %H:%M:%S')}