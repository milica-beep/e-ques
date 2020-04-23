from flask import Blueprint, jsonify, request
from models import User
from models.shared import db
from passlib.hash import sha256_crypt

# routes
user_route = Blueprint("users", __name__)

@user_route.route('/users/test-server', methods=['GET'])
def test_server():
    t = [{'id': 1, 'name': 'User1'}, {'id': 2, 'name': 'User2'}]
    return jsonify(t), 200

@user_route.route('/register', methods=['POST'])
def register():
    req = request.get_json()

    user = User()

    user.name = req['name']
    user.lastname = req['lastname']
    user.email = req['email']
    user.password = sha256_crypt.encrypt(req['password'])
    user.year = req['year']
    user.module = req['module']

    existing_user = User.query.filter(User.email == user.email).first()

    if(existing_user is None):
        db.session.add(user)
        db.session.commit()

        return jsonify('OK'), 200
    else:
        return jsonify('Email already exists'), 400

# drugi nacin [bez dekoratora na funkcijama]
#memr.route("/member-report", methods=["GET"])(report_on_members)