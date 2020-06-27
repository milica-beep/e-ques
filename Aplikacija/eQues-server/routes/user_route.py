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
        print('consult')
        for c in user.consultations:
            print(c.date)

        if user:
            if user.role_id == ROLE_STUDENT:
                grades = []
                for a in user.answers:
                    grades.append(a.average_grade)
                return jsonify({'user': user.serialize(), 'moduleName': user.module.name,\
                                'studentConsultations': [x.serialize() for x in user.consultations_stud],\
                                'grades': grades, 'questions': [x.serialize() for x in user.questions]}), 200
            elif user.role_id == ROLE_PROFESSOR:
                return jsonify({'user': user.serialize(),\
                                'consultations': [x.serialize() for x in user.consultations],\
                                'subjects': [x.serialize() for x in user.subjects]})
            else:
                return jsonify({'user': user.serialize()})
        else:
            return jsonify({'error': 'Ne postoji korisnik u bazi'})

@user_route.route('/users/add-consultation', methods=['POST'])
def add_consultation():
    req = request.get_json()

    consultation_date = str(req['date'])
    consultation_time = str(req['time'])
    consultation_prof_id = int(req['professorId'])

    print(consultation_prof_id)

    new_consultation = Consultation(consultation_date, consultation_time, consultation_prof_id)

    professor = User.query.filter(User.id == consultation_prof_id).first()
    professor.consultations.append(new_consultation)

    all_consultations = professor.consultations

    db.session.add(new_consultation)
    db.session.commit()

    return jsonify({'consultations': [x.serialize() for x in all_consultations]}), 200

@user_route.route('/users/delete-consultation', methods=['DELETE'])
def delete_consultations():
    cons_id = request.args.get('id')

    consultation_to_delete = Consultation.query.filter(Consultation.id == cons_id).first()
    professor = User.query.filter(User.id == consultation_to_delete.professor_id).first()

    professor.consultations.remove(consultation_to_delete)

    db.session.delete(consultation_to_delete)
    db.session.commit()

    return jsonify({'consultations': [x.serialize() for x in professor.consultations]})

@user_route.route('/users/sign-for-consultation', methods=['POST'])
def sign_for_consultation():
    req = request.get_json()

    cons_id = int(req['consultationId'])
    user_id = int(req['userId'])

    user = User.query.filter(User.id == user_id).first()
    cons = Consultation.query.filter(Consultation.id == cons_id).first()

    user.consultations_stud.append(cons)

    db.session.commit()

    return jsonify({'message': 'Prijava uspesna'}), 200



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