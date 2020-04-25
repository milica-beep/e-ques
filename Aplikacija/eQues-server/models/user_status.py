from models.shared import db

class UserStatus(db.Model):
    __tablename__ = 'user_statuses'

    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    description = db.Column(db.String(10))

    user = db.relationship('User', back_populates='user_status', uselist=False)