from models.shared import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    lastname = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    hashed_password = db.Column(db.String(256), nullable=False)

    student_year_id = db.Column(db.Integer, db.ForeignKey('student_years.id'))
    student_year = db.relationship('StudentYear', uselist=False, back_populates='user')

    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    role = db.relationship('Role', uselist=False, back_populates='user')

    user_status_id = db.Column(db.Integer, db.ForeignKey('user_statuses.id'))
    user_status = db.relationship('UserStatus', uselist=False, back_populates='user')

