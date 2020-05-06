from models.shared import db

class Topic(db.Model):
    __tablename__='topics'

    def __init__(self, name, description, subject_id):
        self.name = name
        self.description = description
        self.subject_id = subject_id

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))

    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'))
    subject = db.relationship('Subject', uselist=False, back_populates='topic')

    question = db.relationship('Question', back_populates='topic', uselist=False)

    def serialize(self):
        return {'id': self.id, 'name': self.name, 'description': self.description, \
                'subjectId': self.subject_id}