from models import *
from models.constants import *
from models.shared import db

def create_student_years(commit=False):
    y1 = StudentYear(STUDENT_YEAR1, 'I')
    y2 = StudentYear(STUDENT_YEAR2, 'II')
    y3 = StudentYear(STUDENT_YEAR3, 'III')
    y4 = StudentYear(STUDENT_YEAR4, 'IV')

    db.session.add(y1)
    db.session.add(y2)
    db.session.add(y3)
    db.session.add(y4)

    if commit:
        db.session.commit()

def create_roles(commit=False):
    role1 = Role(ROLE_STUDENT, 'Student')
    role2 = Role(ROLE_PROFESSOR, 'Profesor') 
    role3 = Role(ROLE_ADMIN, 'Administrator')  

    db.session.add(role1)  
    db.session.add(role2)  
    db.session.add(role3)  

    if commit:
        db.session.commit()

def create_user_statuses(commit=False):
    us1 = UserStatus(USER_STATUS_EMAIL_UNCONFIRMED, 'Email nije potvrdjen.')
    us2 = UserStatus(USER_STATUS_NOT_APPROVED, 'Administrator nije odobrio nalog.')
    us3 = UserStatus(USER_STATUS_APPROVED, 'Nalog je odobren.')
    us4 = UserStatus(USER_STATUS_SUSPENDED, 'Nalog je suspendovan.')

    db.session.add(us1)  
    db.session.add(us2) 
    db.session.add(us3) 
    db.session.add(us4) 

    if commit:
        db.session.commit()

def create_data():
    create_student_years()
    create_user_statuses()
    create_roles()

    db.session.commit()
