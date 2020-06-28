from flask import Blueprint, jsonify, request
from models import User, StudentYear, Module, UserStatus, Role
from models.constants import *
from models.shared import db
from passlib.hash import sha256_crypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

# routes
auth_route = Blueprint('auth', __name__)

@auth_route.route('/auth/login', methods=['POST'])
def login():
    req = request.get_json()

    errors = {}

    email = req['email']
    password_candidate = req['password']

    existing_user = User.query.filter(User.email == email).first()

    if(existing_user is None):
        errors['email'] = 'Ne postoji korisnik sa navedenom email adresom'
    else:
        if(not sha256_crypt.verify(password_candidate, existing_user.hashed_password)):
            errors['message'] = 'Nevalidni podaci!'
            return jsonify(errors), 401
        else: 
            # TODO add expiration
            access_token = create_access_token(identity=existing_user.id)
            resp = jsonify({'message': 'Uspešno prijavljivanje', 'access_token' : access_token})
            return resp, 200

    if len(errors) != 0:
        return jsonify(errors), 422
        
@auth_route.route('/auth/register', methods=['POST'])
def register():
    req = request.get_json()

    name = str(req['name'])
    lastname = str(req['lastname'])
    email = str(req['email'])
    password = str(req['password'])
    confirm_password = str(req['confirmPassword'])
    role = int(req['role'])

    image = 'default_user.png'

    errors = {}

    def check_empty(field_names, field_values, display_names, errors, check):
        assert len(field_names) == len(field_values) == len(display_names)
        for field_name, field_value, display_name in zip(field_names, field_values, display_names):
            if check(field_value):
                errors[field_name] = f'Polje {display_name} ne sme biti prazno.'

    existing_user_by_email = User.query.filter(User.email == email).first()
    
    check_empty(['name', 'lastname', 'password', 'confirmPassword', 'email'],\
                [name, lastname, password, confirm_password, email], \
                ['ime', 'prezime', 'lozinka', 'potvrdi lozinku', 'email adresa'],\
                errors, lambda x: len(x) == 0)
    
    if role == ROLE_STUDENT:
        year = int(req['year'])
        module = int(req['module'])
        student_id = str(req['studentId'])

        check_empty(['year', 'module'], [year, module], ['godina', 'modul'], errors, \
                    lambda x: x == 0)
        
        if len(student_id) == 0:
            errors['studentId'] = 'Polje broj indeksa ne sme biti prazno'
        else:
            existing_user_by_student_id = User.query.filter(User.student_id == student_id).first()
            if existing_user_by_student_id:
                errors['studentId'] = 'Korisnik sa navedenim brojem indeksa već postoji.'

    if existing_user_by_email:
        errors['email'] = 'Korisnik sa navedenom e-mail adresom već postoji.'

    if len(password) < 6:
        errors['password'] = 'Lozinka mora imati barem šest karaktera'

    if password != confirm_password:
        errors['confirmPassword'] = 'Lozinke se ne poklapaju.'
    
    if len(errors) != 0:
        return jsonify(errors), 422

    image = Image()
    image.path = 'default_user.png'

    user = User()
    user.name = name
    user.lastname = lastname
    user.email = email
    user.hashed_password = sha256_crypt.hash(password)
    user.role_id = role
    user.user_status_id = USER_STATUS_EMAIL_UNCONFIRMED
    user.image = image

    if role == ROLE_STUDENT:
        user.student_year_id = year
        user.module_id = module
        user.student_id = student_id

    db.session.add(image)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'Uspešna registracija.'}), 200

@auth_route.route('/auth/get-registration-data', methods=['GET'])
def get_data():
    student_years = StudentYear.query.all()
    student_role = Role.query.filter(Role.id == ROLE_STUDENT).first()
    proffessor_role = Role.query.filter(Role.id == ROLE_PROFESSOR).first()
    modules = Module.query.all()

    return jsonify({'studentYears': [x.serialize() for x in student_years],\
                    'modules': [x.serialize() for x in modules],\
                    'studentRole': student_role.serialize(),\
                    'proffessorRole': proffessor_role.serialize()})

@auth_route.route('/auth/current-user', methods=['GET'])
@jwt_required
def current_user():
    user_id = get_jwt_identity()
    user = User.query.filter(User.id == user_id).first()
    return jsonify(user.serialize()), 200