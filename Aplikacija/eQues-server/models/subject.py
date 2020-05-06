from models.shared import db
from .proffessor_subject import *

class Subject(db.Model):
    __tablename__ = 'subjects'

    def __init__(self, name, description, student_year_id, module_id):
        self.name = name
        self.description = description
        self.student_year_id = student_year_id
        self.module_id = module_id

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))

    student_year_id = db.Column(db.Integer, db.ForeignKey('student_years.id'))
    student_year = db.relationship('StudentYear', uselist=False, back_populates='subject')

    # TODO jedan predmet moze na vise modula
    module_id = db.Column(db.Integer, db.ForeignKey('modules.id'))
    module = db.relationship('Module', uselist=False, back_populates='subject')

    topic = db.relationship('Topic', back_populates='subject', uselist=False)
    proffessors = db.relationship('User', secondary=ProffessorSubject, back_populates='subjects')

    def serialize(self):
        return {'id': self.id, 'name': self.name, 'description': self.description, \
                'studentYearId': self.student_year_id, 'moduleId': self.module_id}