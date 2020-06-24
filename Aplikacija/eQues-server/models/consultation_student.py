from models.shared import db
#from sqlalchemy import Table

ConsultationsStudents = db.Table('consultations_students', db.Model.metadata,
    # __tablename__='consultations_students'

    # def __init__(self, consultation_id, student_id):
    #     self.consultation_id = consultation_id
    #     self.student_id = student_id
       
   # db.Column('id', db.Integer, primary_key=True),
    db.Column('consultation_id', db.Integer, db.ForeignKey('consultations.id'), nullable=False),
    db.Column('student_id', db.Integer, db.ForeignKey('users.id'))
)

    # def serialize(self):
    #     return {'id': self.id, 'consultation_id': self.consultation_id, 'student_id': self.student_id}