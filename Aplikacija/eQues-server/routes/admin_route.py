from flask import Blueprint, jsonify, request
from models import *
from models.constants import *
from models.shared import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

admin_route = Blueprint("admin", __name__)

@admin_route.route('/admin/get-profs-subj', methods=['GET'])
@jwt_required
def get_profs_subj():
    professors = User.query.filter(User.role_id == ROLE_PROFESSOR).all()

    subjects = Subject.query.all()

    return jsonify({'professors': [x.serialize() for x in professors], \
                    'subjects': [x.serialize() for x in subjects]})

@admin_route.route('/admin/post-profs-subj', methods=['POST'])
@jwt_required
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
@jwt_required
def get_unapproved_professors():
    professors = User.query.filter(User.role_id == ROLE_PROFESSOR)\
                           .filter(User.user_status_id == USER_STATUS_NOT_APPROVED)\
                           .all()

    return jsonify({'professors': [x.serialize() for x in professors]})    

@admin_route.route('/admin/approve-professor', methods=['GET'])
@jwt_required
def approve_professor():
    professor_id = request.args.get('id')

    professor = User.query.filter(User.id == professor_id)\
                          .filter(User.user_status_id != USER_STATUS_SUSPENDED)\
                          .first()

    professor.user_status_id = USER_STATUS_APPROVED

    unapproved_professors = User.query.filter(User.role_id == ROLE_PROFESSOR)\
                           .filter(User.user_status_id == USER_STATUS_NOT_APPROVED)\
                           .all()
    db.session.commit()

    return jsonify({'professors': [x.serialize() for x in unapproved_professors]})

@admin_route.route('/admin/add-subject', methods=['POST'])
@jwt_required
def add_subject():
    req = request.get_json()

    subject_name = str(req['name'])
    subject_description = str(req['description'])
    subject_student_year_id = int(req['studentYearId'])
    subject_module_id = int(req['moduleId'])

    subject_to_add = Subject(subject_name, subject_description,\
                                 subject_student_year_id, subject_module_id)
    
    db.session.add(subject_to_add)
    db.session.commit()

    return jsonify({'message': 'Predmet je uspesno dodat'})

@admin_route.route('/admin/get-add-subject-data', methods=['GET'])
@jwt_required
def get_add_subject_data():
    modules = Module.query.all()
    student_years = StudentYear.query.all()

    return jsonify({'modules': [x.serialize() for x in modules],\
                    'studentYears': [x.serialize() for x in student_years]})

@admin_route.route('/admin/get-subjects', methods=['GET'])
@jwt_required
def get_subjects():
    all_subjects = Subject.query.all()

    return jsonify({'subjects': [x.serialize() for x in all_subjects]})

@admin_route.route('/admin/delete-subject', methods=['DELETE'])
@jwt_required
def delete_subject():
    subject_id = request.args.get('id')

    subject_to_delete = Subject.query.filter(Subject.id == subject_id).first()

    topics_to_delete = subject_to_delete.topics

    for topic in topics_to_delete:
        db.session.delete(topic)
    
    db.session.delete(subject_to_delete)

    all_subjects = Subject.query.all()

    db.session.commit()

    return jsonify({'subjects': [x.serialize() for x in all_subjects]})

@admin_route.route('/admin/add-topic', methods=['POST'])
@jwt_required
def add_topic():
    req = request.get_json()

    subject_id = int(req['subjectId'])
    topic_name = str(req['name'])
    topic_description = str(req['description'])
    
    topic = Topic(topic_name, topic_description, subject_id)

    subject = Subject.query.filter(Subject.id == subject_id).first()

    topic_already_exists = False

    for x in subject.topics:
        if x.name == topic_name:
            topic_already_exists = True

    if not topic_already_exists:
        db.session.add(topic)
        db.session.commit()

    return jsonify({'topics': [x.serialize() for x in subject.topics]})

@admin_route.route('/admin/get-all-users', methods=['GET'])
@jwt_required
def get_all_users():
    users = User.query.filter(User.role_id != ROLE_ADMIN)\
                      .filter(User.user_status_id == USER_STATUS_APPROVED)\
                      .all()
    return jsonify({'users': [x.serialize() for x in users]})

@admin_route.route('/admin/delete-user', methods=['DELETE'])
@jwt_required
def delete_user():
    user_id = request.args.get('id')

    delete_user = User.query.filter(User.id == user_id).first()

    delete_user.user_status_id = USER_STATUS_SUSPENDED

    all_users = User.query.filter(User.role_id != ROLE_ADMIN)\
                          .filter(User.user_status_id == USER_STATUS_APPROVED)\
                          .all()

    db.session.commit()

    return jsonify({'users': [x.serialize() for x in all_users]}), 200