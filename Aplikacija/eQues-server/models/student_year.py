from models.shared import db

class StudentYear(db.Model):
    __tablename__ = 'student_years'
    
    def __init__(self, id, description):
        self.id = id
        self.description = description

    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    description = db.Column(db.String(10))
    
    user = db.relationship('User', back_populates='student_year', uselist=False)