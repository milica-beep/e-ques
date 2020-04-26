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


# drugi nacin [bez dekoratora na funkcijama]
#memr.route("/member-report", methods=["GET"])(report_on_members)