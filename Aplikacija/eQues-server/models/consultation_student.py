from models.shared import db

class ConsultationStudent(db.Model):
    __tablename__='consultations_students'

    def __init__(self, consultation_id, student_id):
        self.consultation_id = consultation_id
        self.student_id = student_id
       
    id = db.Column(db.Integer, primary_key=True)

    consultation_id = db.Column(db.Integer, db.ForeignKey('consultations.id'), nullable=False)
    consultation = db.relationship('Consultation', uselist=False, back_populates='consultation_student')
    
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    student = db.relationship('User', uselist=False, back_populates='consultation_stud')

    def serialize(self):
        return {'id': self.id, 'consultation_id': self.consultation_id, 'student_id': self.student_id}