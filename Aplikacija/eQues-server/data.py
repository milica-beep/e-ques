from models import *
from models.constants import *
from models.shared import db
from passlib.hash import sha256_crypt

# TODO postavi konstruktore u db.sesssion.add umesto promenljivih

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

def create_modules(commit=False):
    mod1 = Module(1, 'Opšti')
    mod2 = Module(2, 'Računarstvo i informatika')
    mod3 = Module(3, 'Upravljanje sistemima')
    mod4 = Module(4, 'Elektronika')

    db.session.add(mod1)  
    db.session.add(mod2) 
    db.session.add(mod3) 
    db.session.add(mod4) 

    if commit:
        db.session.commit()

def create_subjects(commit=False):
    subj1 = Subject(1, 'Softversko inženjerstvo', 'Blablabla', STUDENT_YEAR3, 2)
    subj2 = Subject(2, 'Mikroračunarski sistemi', 'Blablabla', STUDENT_YEAR3, 2)
    subj3 = Subject(3, 'Sistemi baza podataka', 'Blablabla', STUDENT_YEAR3, 2)
    subj4 = Subject(4, 'Baze podataka', 'Blablabla', STUDENT_YEAR2, 2)
    subj5 = Subject(5, 'Elektronika', 'Blablabla', STUDENT_YEAR3, 3)

    db.session.add(subj1)  
    db.session.add(subj2) 
    db.session.add(subj3) 
    db.session.add(subj4) 
    db.session.add(subj5) 

    if commit:
        db.session.commit()

def create_topics(commit=False):
    top1 = Topic(1, 'Oblast 1', 'Ovo je jako vazna oblast', 1)
    top2 = Topic(2, 'Oblast 2', 'Ovo je jako vazna oblast', 1)
    top3 = Topic(3, 'Oblast 3', 'Ovo je jako vazna oblast', 1)
    top4 = Topic(4, 'Oblast 4', 'Ovo je jako vazna oblast', 1)

    top5 = Topic(5, 'Oblast 1', 'Ovo je jako vazna oblast', 2)
    top6 = Topic(6, 'Oblast 2', 'Ovo je jako vazna oblast', 2)
    top7 = Topic(7, 'Oblast 3', 'Ovo je jako vazna oblast', 2)
    top8 = Topic(8, 'Oblast 4', 'Ovo je jako vazna oblast', 2)

    top9 = Topic(9, 'Oblast 1', 'Ovo je jako vazna oblast', 3)
    top10 = Topic(10, 'Oblast 2', 'Ovo je jako vazna oblast', 3)
    top11 = Topic(11, 'Oblast 3', 'Ovo je jako vazna oblast', 3)
    top12 = Topic(12, 'Oblast 4', 'Ovo je jako vazna oblast', 3)

    top13 = Topic(13, 'Ovo je jedina oblast', 'I nije nesto vazn', 4)

    top14 = Topic(14, 'Jeste', 'Oblastoblastoblast', 5)

    db.session.add(top1)  
    db.session.add(top2) 
    db.session.add(top3) 
    db.session.add(top4) 
    db.session.add(top5) 
    db.session.add(top6)  
    db.session.add(top7) 
    db.session.add(top8) 
    db.session.add(top9) 
    db.session.add(top10) 
    db.session.add(top11)  
    db.session.add(top12) 
    db.session.add(top13) 
    db.session.add(top14) 

    if commit:
        db.session.commit()

def create_questions(commit=False):
    user = User()
    user.name = 'Milica'
    user.lastname = 'Nikolic'
    user.student_year_id = STUDENT_YEAR3
    user.student_id = '16785'
    user.user_status_id = USER_STATUS_EMAIL_UNCONFIRMED
    user.role_id = ROLE_STUDENT
    user.email = 'milica@elfak.rs'
    user.hashed_password = sha256_crypt.hash('123456')
    user.id = 1
    user.module_id = 2

    q1 = Question(1, 'Ovo je naslov prvog pitanja', 'Ovde je objasnjenje sta je pitanje i tako to')
    q2 = Question(2, 'Ovo je naslov drugog pitanja', 'Ovde je objasnjenje sta je pitanje i tako to')

    q1.topic_id = 1
    q2.topic_id = 5

    q1.user_id = q2.user_id = 1

    db.session.add(user) 
    db.session.add(q1) 
    db.session.add(q2) 

    if commit:
        db.session.commit()


def create_data():
    create_student_years()
    create_user_statuses()
    create_roles()
    create_modules()
    create_subjects()
    create_topics()
    create_questions()

    db.session.commit()
