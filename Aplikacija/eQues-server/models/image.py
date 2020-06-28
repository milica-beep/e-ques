from models.shared import db

class Image(db.Model):
    __tablename__='images'

    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(50), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='image')

    answer_id = db.Column(db.Integer, db.ForeignKey('answers.id'))
    answer = db.relationship('Answer', back_populates='images')

    def serialize(self):
        return {'id': self.id, 'path': self.path, 'userId': self.user_id, \
                'answerId': self.answer_id}