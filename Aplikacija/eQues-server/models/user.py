from models.shared import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    lastname = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    student_id = db.Column(db.String(30), unique=True)
    hashed_password = db.Column(db.String(256), nullable=False)
    # gender = db.Column(db.String(1), nullable=False)

    student_year_id = db.Column(db.Integer, db.ForeignKey('student_years.id'))
    student_year = db.relationship('StudentYear', uselist=False, back_populates='user')

    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    role = db.relationship('Role', uselist=False, back_populates='user')

    user_status_id = db.Column(db.Integer, db.ForeignKey('user_statuses.id'), nullable=False)
    user_status = db.relationship('UserStatus', uselist=False, back_populates='user')

    module_id = db.Column(db.Integer, db.ForeignKey('modules.id'))
    module = db.relationship('Module', uselist=False, back_populates='user')

    def serialize(self):
        return {'id': self.id, 'name': self.name, 'lastname': self.lastname, 'email': self.email,\
                'studentId': self.student_id, 'roleId': self.role_id, 'studentYearId': self.student_year_id,\
                'userStatusId': self.user_status_id, 'moduleId': self.module_id}

