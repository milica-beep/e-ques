from flask import Blueprint, jsonify, request
from models import *
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

        if user:
            subjects = Subject.query.filter(Subject.module_id == user.module_id and Subject.student_year_id == user.student_year_id).all()
            return jsonify({'subjects': [x.serialize() for x in subjects]})



# drugi nacin [bez dekoratora na funkcijama]
#memr.route("/member-report", methods=["GET"])(report_on_members)