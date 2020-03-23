from flask import Blueprint, jsonify
from models import User

# routes
user_route = Blueprint("users", __name__)

# drugi nacin [bez dekoratora na funkcijama]
#memr.route("/member-report", methods=["GET"])(report_on_members)