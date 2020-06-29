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
    subj1 = Subject( 'Softversko inženjerstvo', 'Obavezni predmet na modulu Računarstvo i informatika', STUDENT_YEAR3, 2)
    subj2 = Subject( 'Mikroračunarski sistemi', 'Obavezni predmet na modulu Računarstvo i informatika', STUDENT_YEAR3, 2)
    subj3 = Subject( 'Sistemi baza podataka', 'Izborni predmet na modulu Računarstvo i informatika', STUDENT_YEAR3, 2)
    subj4 = Subject( 'Baze podataka', 'Obavezni predmet na modulu Računarstvo i informatika', STUDENT_YEAR2, 2)
    subj5 = Subject( 'Projektovanje digitalnih sistema', 'Izborni predmet na modulu Elektronika', STUDENT_YEAR3, 4)

    db.session.add(subj1)  
    db.session.add(subj2) 
    db.session.add(subj3) 
    db.session.add(subj4) 
    db.session.add(subj5) 

    if commit:
        db.session.commit()

def create_topics(commit=False):
    top1 = Topic( 'Pojam i potreba za softverskim inženjerstvom', 'Prva oblast na predmetu Softversko inženjerstvo', 1)
    top2 = Topic( 'Sistemsko inženjerstvo', 'Druga oblast na predmetu Softversko inženjerstvo', 1)
    top3 = Topic( 'Softversko i sistemsko inženjerstvo', 'Treća oblast na predmetu Softversko inženjerstvo', 1)
    top4 = Topic( 'Dodatna svojstva sistema', 'Četvrta oblast na predmetu Softversko inženjerstvo', 1)

    top5 = Topic( 'Struktura i organizacija mikroračunarskih sistema', 'Prva oblast na predmetu Mikroračunarski sistemi', 2)
    top6 = Topic( 'Povezivanje U/I uređaja', 'Druga oblast na predmetu Mikroračunarski sistemi', 2)
    top7 = Topic( 'Načini organizacije U/I aktivnosti', 'Treća oblast na predmetu Mikroračunarski sistemi', 2)
    top8 = Topic( 'Serijski U/I', 'Četvrta oblast na predmetu Mikroračunarski sistemi', 2)

    top9 = Topic( 'EER model', 'Prva oblast na predmetu Sistemi baza podataka', 3)
    top10 = Topic( 'Napredni SQL', 'Druga oblast na predmetu Sistemi baza podataka', 3)
    top11 = Topic( 'Transakcije i zaključavanje', 'Treća oblast na predmetu Sistemi baza podataka', 3)
    top12 = Topic( 'Optimizacija upita', 'Četvrta oblast na predmetu Sistemi baza podataka', 3)

    top13 = Topic( 'Osnovni pojmovi', 'Prva oblast', 4)

    top14 = Topic( 'RTL projektovanje', 'Prva oblast', 5)

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

    image6 = Image()
    image6.path = 'default_user.png'

    image7 = Image()
    image7.path = 'default_user.png'

    user_student = User()
    user_student.name = 'Milica'
    user_student.lastname = 'Nikolić'
    user_student.student_year_id = STUDENT_YEAR3
    user_student.student_id = '16785'
    user_student.user_status_id = USER_STATUS_APPROVED
    user_student.role_id = ROLE_STUDENT
    user_student.email = 'milica@elfak.rs'
    user_student.hashed_password = sha256_crypt.hash('milica123')
    user_student.module_id = 2
    user_student.image = image1

    user_student2 = User()
    user_student2.name = 'Mina'
    user_student2.lastname = 'Nikolić'
    user_student2.student_year_id = STUDENT_YEAR3
    user_student2.student_id = '16786'
    user_student2.user_status_id = USER_STATUS_APPROVED
    user_student2.role_id = ROLE_STUDENT
    user_student2.email = 'mina@elfak.rs'
    user_student2.hashed_password = sha256_crypt.hash('mina123')
    user_student2.module_id = 2
    user_student2.image = image6

    user_student3 = User()
    user_student3.name = 'Tamara'
    user_student3.lastname = 'Mihajlović'
    user_student3.student_year_id = STUDENT_YEAR3
    user_student3.student_id = '16758'
    user_student3.user_status_id = USER_STATUS_APPROVED
    user_student3.role_id = ROLE_STUDENT
    user_student3.email = 'tamara@elfak.rs'
    user_student3.hashed_password = sha256_crypt.hash('tamara123')
    user_student3.module_id = 2
    user_student3.image = image7

    user_prof = User()
    user_prof.name = 'Aleksandar'
    user_prof.lastname = 'Stanimirović'
    user_prof.user_status_id = USER_STATUS_NOT_APPROVED
    user_prof.role_id = ROLE_PROFESSOR
    user_prof.email = 'aleksandar@elfak.rs'
    user_prof.hashed_password = sha256_crypt.hash('aleksandar123')
    user_prof.image = image2

    user_admin = User()
    user_admin.email = 'admin'
    user_admin.hashed_password = sha256_crypt.hash('admin')
    user_admin.role_id = ROLE_ADMIN
    user_admin.user_status_id = USER_STATUS_APPROVED
    user_admin.image = image3

    user_prof2 = User()
    user_prof2.name = 'Aleksandar'
    user_prof2.lastname = 'Dimitrijević'
    user_prof2.user_status_id = USER_STATUS_NOT_APPROVED
    user_prof2.role_id = ROLE_PROFESSOR
    user_prof2.email = 'emina@elfak.rs'
    user_prof2.hashed_password = sha256_crypt.hash('emina123')
    user_prof2.image = image4

    user_prof3 = User()
    user_prof3.name = 'Dragan'
    user_prof3.lastname = 'Stojanović'
    user_prof3.user_status_id = USER_STATUS_NOT_APPROVED
    user_prof3.role_id = ROLE_PROFESSOR
    user_prof3.email = 'dragan@elfak.rs'
    user_prof3.hashed_password = sha256_crypt.hash('dragan123')
    user_prof3.image = image5

    q1 = Question('"Interna" memorija kod 8086 mikroprocesora', 'Da li mikroprocesor 8086 poseduje internu memoriju?')

    q1.topic_id = 5

    q1.user_id = 1

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)

    db.session.add(user_student) 
    db.session.add(user_student2) 
    db.session.add(user_student3) 
    db.session.add(user_prof)
    db.session.add(user_admin)
    db.session.add(user_prof2)
    db.session.add(user_prof3)
    db.session.add(q1) 

    if commit:
        db.session.commit()

def test_answers(commit=False):
    db.session.add(Answer('Mislim da ne poseduje.', 1, 2, False, 0))
    db.session.add(Answer('8086 ne poseduje internu memoriju. \
                         U Proteusu je uvedena da bi se povećala brzina simulacije i izbegla složenija šema.',\
                         1, 3, False, 0))

    if commit:
        db.session.commit()

def test_comments(commit=False):
    db.session.add(Comment('Da li možeš da mi pojasniš ovaj odgovor?', 1, 1))
    db.session.add(Comment('Profesor komentarise odgovor.', 1, 6))

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
    
    
    #test_answers()
    #test_comments()
    
    db.session.commit()
