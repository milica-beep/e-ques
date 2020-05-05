from models.shared import db
from sqlalchemy.sql import func

class Question(db.Model):
    __tablename__ = 'questions'

    def __init__(self, id, title, text):
        self.id = id
        self.title = title
        self.text = text

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    text = db.Column(db.String(500), nullable=False)
    timestamp = db.Column(db.DateTime(), nullable=False, server_default=func.now())

    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)
    topic = db.relationship('Topic', uselist=False, back_populates='question')
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', uselist=False, back_populates='question')

    def serialize(self):
        return {'id': self.id, 'description': self.description}