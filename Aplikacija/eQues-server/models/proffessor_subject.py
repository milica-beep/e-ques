from models.shared import db

ProffessorSubject = db.Table('proffessor_subject', db.Model.metadata,    
    #db.Column('id', db.Integer, primary_key=True),
    db.Column('proffessor_id', db.Integer, db.ForeignKey('users.id'), nullable=False),
    db.Column('subject_id', db.Integer, db.ForeignKey('subjects.id'), nullable=False)
)
