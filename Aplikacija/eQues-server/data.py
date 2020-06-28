from models import *
from models.constants import *
from models.shared import db
from passlib.hash import sha256_crypt
from datetime import datetime

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
    mod1 = Module('Opšti')
    mod2 = Module('Računarstvo i informatika')
    mod3 = Module('Upravljanje sistemima')
    mod4 = Module('Elektronika')

    db.session.add(mod1)  
    db.session.add(mod2) 
    db.session.add(mod3) 
    db.session.add(mod4) 

    if commit:
        db.session.commit()

def create_subjects(commit=False):
    subj1 = Subject( 'Softversko inženjerstvo', 'Blablabla', STUDENT_YEAR3, 2)
    subj2 = Subject( 'Mikroračunarski sistemi', 'Blablabla', STUDENT_YEAR3, 2)
    subj3 = Subject( 'Sistemi baza podataka', 'Blablabla', STUDENT_YEAR3, 2)
    subj4 = Subject( 'Baze podataka', 'Blablabla', STUDENT_YEAR2, 2)
    subj5 = Subject( 'Elektronika', 'Blablabla', STUDENT_YEAR3, 3)

    db.session.add(subj1)  
    db.session.add(subj2) 
    db.session.add(subj3) 
    db.session.add(subj4) 
    db.session.add(subj5) 

    if commit:
        db.session.commit()

def create_topics(commit=False):
    top1 = Topic( 'Oblast 1 SI', 'Ovo je jako vazna oblast 1', 1)
    top2 = Topic( 'Oblast 2 SI', 'Ovo je jako vazna oblast 2', 1)
    top3 = Topic( 'Oblast 3 SI', 'Ovo je jako vazna oblast 3', 1)
    top4 = Topic( 'Oblast 4 SI', 'Ovo je jako vazna oblast 4', 1)

    top5 = Topic( 'Oblast 1 MIKS', 'Ovo je jako vazna oblast 1', 2)
    top6 = Topic( 'Oblast 2 MIKS', 'Ovo je jako vazna oblast 2', 2)
    top7 = Topic( 'Oblast 3 MIKS', 'Ovo je jako vazna oblast 3', 2)
    top8 = Topic( 'Oblast 4 MIKS', 'Ovo je jako vazna oblast 4', 2)

    top9 = Topic( 'Oblast 1 SBP', 'Ovo je jako vazna oblast', 3)
    top10 = Topic( 'Oblast 2 SBP', 'Ovo je jako vazna oblast', 3)
    top11 = Topic( 'Oblast 3 SBP', 'Ovo je jako vazna oblast', 3)
    top12 = Topic( 'Oblast 4 SBP', 'Ovo je jako vazna oblast', 3)

    top13 = Topic( 'Ovo je jedina oblast BP', 'I nije nesto vazna', 4)

    top14 = Topic( 'Jeste', 'Oblastoblastoblast', 5)

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
    image1 = Image()
    image1.path = 'default_user.png'

    image2 = Image()
    image2.path = 'default_user.png'

    image3 = Image()
    image3.path = 'default_user.png'

    image4 = Image()
    image4.path = 'default_user.png'

    image5 = Image()
    image5.path = 'default_user.png'

    user_student = User()
    user_student.name = 'Milica'
    user_student.lastname = 'Nikolic'
    user_student.student_year_id = STUDENT_YEAR3
    user_student.student_id = '16785'
    user_student.user_status_id = USER_STATUS_EMAIL_UNCONFIRMED
    user_student.role_id = ROLE_STUDENT
    user_student.email = 'milica@elfak.rs'
    user_student.hashed_password = sha256_crypt.hash('123456')
    user_student.module_id = 2
    user_student.image = image1

    user_prof = User()
    user_prof.name = 'Aleksandar'
    user_prof.lastname = 'Stanimirovic'
    user_prof.user_status_id = USER_STATUS_NOT_APPROVED
    user_prof.role_id = ROLE_PROFESSOR
    user_prof.email = 'aleksandar@elfak.rs'
    user_prof.hashed_password = sha256_crypt.hash('123456')
    user_prof.image = image2

    user_admin = User()
    user_admin.email = 'admin'
    user_admin.hashed_password = sha256_crypt.hash('admin')
    user_admin.role_id = ROLE_ADMIN
    user_admin.user_status_id = USER_STATUS_APPROVED
    user_admin.image = image3

    user_prof2 = User()
    user_prof2.name = 'Emina'
    user_prof2.lastname = 'Milovanovic'
    user_prof2.user_status_id = USER_STATUS_NOT_APPROVED
    user_prof2.role_id = ROLE_PROFESSOR
    user_prof2.email = 'emina@elfak.rs'
    user_prof2.hashed_password = sha256_crypt.hash('123456')
    user_prof2.image = image4

    user_prof3 = User()
    user_prof3.name = 'Dragan'
    user_prof3.lastname = 'Stojanovic'
    user_prof3.user_status_id = USER_STATUS_NOT_APPROVED
    user_prof3.role_id = ROLE_PROFESSOR
    user_prof3.email = 'dragan@elfak.rs'
    user_prof3.hashed_password = sha256_crypt.hash('123456')
    user_prof3.image = image5

    q1 = Question('Ovo je naslov prvog pitanja', 'Ovde je objasnjenje sta je pitanje i tako to')
    q2 = Question('Ovo je naslov drugog pitanja', 'Ovde je objasnjenje sta je pitanje i tako to')

    q1.topic_id = 1
    q2.topic_id = 5

    q1.user_id = q2.user_id = 1

    consultation1 = Consultation('Ponedeljak', '14:00', 2)
    consultation2 = Consultation('Utorak', '10:00', 2)

    consultation1.students.append(user_student)
    consultation2.students.append(user_student)

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)

    db.session.add(user_student) 
    db.session.add(user_prof)
    db.session.add(user_admin)
    db.session.add(user_prof2)
    db.session.add(user_prof3)
    db.session.add(q1) 
    db.session.add(q2) 

    db.session.add(consultation1)
    db.session.add(consultation2)

    if commit:
        db.session.commit()

def test_answers(commit=False):
    db.session.add(Answer('Ovo je milicin odgovor', 1, 1, False, 0))
    db.session.add(Answer('Ovo je jos jedan milicin odgovor', 1, 1, False, 0))

    if commit:
        db.session.commit()

def test_comments(commit=False):
    db.session.add(Comment('Milica komentarise svoj odgovor', 1, 1))
    db.session.add(Comment('Profesor komentarise odgovor.', 1, 2))

    if commit:
        db.session.commit()

def test_consultations(commit=False):

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
    
    
    test_answers()
    test_comments()
    
    db.session.commit()
