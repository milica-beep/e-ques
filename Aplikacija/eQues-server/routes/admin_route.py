from flask import Blueprint, jsonify, request
from models import *
from models.constants import *
from models.shared import db

admin_route = Blueprint("admin", __name__)

@admin_route.route('/admin/get-profs-subj', methods=['GET'])
def get_profs_subj():
    professors = User.query.filter(User.role_id == ROLE_PROFESSOR).all()

    subjects = Subject.query.all()

    return jsonify({'professors': [x.serialize() for x in professors], \
                    'subjects': [x.serialize() for x in subjects]})

@admin_route.route('/admin/post-profs-subj', methods=['POST'])
def post_profs_subj():
    req = request.get_json()

    professor_id = int(req['professorId'])
    subject_id = int(req['subjectId'])

    professor = User.query.filter(User.id == professor_id).first()
    subject = Subject.query.filter(Subject.id == subject_id).first()

    subject_exists = False

    for subj in professor.subjects:
        if subj == subject:
            print(subj.name)
            print(subject.name)
            subject_exists = True

    if not subject_exists:
        professor.subjects.append(subject)
        db.session.commit()

    return jsonify({'message': 'OK'}), 200

@admin_route.route('/admin/get-unapproved-professors', methods=['GET'])
def get_unapproved_professors():
    professors = User.query.filter(User.role_id == ROLE_PROFESSOR)\
                           .filter(User.user_status_id == USER_STATUS_NOT_APPROVED)\
                           .all()

    return jsonify({'professors': [x.serialize() for x in professors]})    

@admin_route.route('/admin/approve-professor', methods=['GET'])
def approve_professor():
    professor_id = request.args.get('id')

    professor = User.query.filter(User.id == professor_id).first()

    professor.user_status_id = USER_STATUS_APPROVED

    unapproved_professors = User.query.filter(User.role_id == ROLE_PROFESSOR)\
                           .filter(User.user_status_id == USER_STATUS_NOT_APPROVED)\
                           .all()
    db.session.commit()

    return jsonify({'professors': [x.serialize() for x in unapproved_professors]})    