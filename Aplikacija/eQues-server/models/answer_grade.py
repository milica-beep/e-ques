from models.shared import db

AnswerGrade = db.Table('answer_grade', db.Model.metadata,    
    #db.Column('id', db.Integer, primary_key=True),
    db.Column('answer_id', db.Integer, db.ForeignKey('answers.id'), nullable=False),
    db.Column('grade_value', db.Integer),
    db.Column('grade_user_id', db.Integer),
    db.ForeignKeyConstraint(
        ('grade_value', 'grade_user_id'),
        ('grades.value', 'grades.user_id')
    )
)