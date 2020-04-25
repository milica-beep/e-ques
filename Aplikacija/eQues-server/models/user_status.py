from models.shared import db

class UserStatus(db.Model):
    __tablename__ = 'user_statuses'

    def __init__(self, id, description):
        self.id = id
        self.description = description

    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    description = db.Column(db.String(50))

    user = db.relationship('User', back_populates='user_status', uselist=False)