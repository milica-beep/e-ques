from flask import Blueprint, jsonify, request
from models import *
from models.constants import *
from models.shared import db
from passlib.hash import sha256_crypt

# routes
user_route = Blueprint("users", __name__)

@user_route.route('/users/test-server', methods=['GET'])
def test_server():
    t = [{'id': 1, 'name': 'User1'}, {'id': 2, 'name': 'User2'}]
    return jsonify(t), 200

@user_route.route('/users/get-subjects', methods=['GET'])
def get_subjects():
    user_id = request.args.get('id')

    if user_id:
        user = User.query.filter(User.id == user_id).first()

        if user.role_id == ROLE_STUDENT:
            subjects = Subject.query.filter(Subject.module_id == user.module_id)\
                                    .filter(Subject.student_year_id == user.student_year_id)\
                                    .all()

        if user.role_id == ROLE_PROFESSOR:
            subjects = user.subjects

        if user.role_id == ROLE_ADMIN:
            subjects = Subject.query.all()

        return jsonify({'subjects': [x.serialize() for x in subjects]})
        

@user_route.route('/users/get-user', methods=['GET'])
def get_user():
    user_id = request.args.get('id')

    if user_id:
        user = User.query.filter(User.id == user_id).first()

        if user:
            if user.role_id == ROLE_STUDENT:
                return jsonify({'user': user.serialize(), 'moduleName': user.module.name}), 200
            else:
                return jsonify({'user': user.serialize()})
        else:
            return jsonify({'error': 'Ne postoji korisnik u bazi'})










# @user_route.route('/users/get-subject', methods=['GET'])
# def get_subject():
#     subject_id = request.args.get('id')

#     if subject_id:
#         subject = Subject.query.filter(Subject.id == subject_id).first()

#         if subject:
#             return jsonify(subject.serialize())
#         else: # postavi neki normalan kod za gresku
#             return {'error': 'Predmet ne postoji u bazi.'}, 400

# drugi nacin [bez dekoratora na funkcijama]
#memr.route("/member-report", methods=["GET"])(report_on_members)