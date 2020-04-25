from flask import Blueprint, jsonify, request
from models import User
from models.shared import db
from passlib.hash import sha256_crypt
from flask_jwt_extended import create_access_token

# routes
auth_route = Blueprint('auth', __name__)

@auth_route.route('/auth/login', methods=['POST'])
def login():
    req = request.get_json()

    email = req['email']
    password_candidate = req['password']

    existing_user = User.query.filter(User.email == email).first()

    if(existing_user is None):
        return jsonify({'error': 'Ne postoji korisnik.'}), 401
    else:
        if(not sha256_crypt.verify(password_candidate, existing_user.hashed_password)):
            return jsonify({'error': 'Nevalidni podaci.'}), 401
        else: 
            # TODO add expiration
            access_token = create_access_token(identity=existing_user.id)
            resp = jsonify({'message': 'Uspešno prijavljivanje', 'access_token' : access_token})
            return resp, 200
        
@auth_route.route('/auth/register', methods=['POST'])
def register():
    req = request.get_json()

    user = User()

    user.name = req['name']
    user.lastname = req['lastname']
    user.email = req['email']
    user.hashed_password = sha256_crypt.encrypt(req['password'])
    user.year = req['year']
    user.module = req['module']

    existing_user = User.query.filter(User.email == user.email).first()

    if(existing_user is None):
        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'Uspešna registracija.'}), 200
    else:
        return jsonify({'error': 'Korisnik sa ovom email adresom već postoji.'}), 400
