from flask import Blueprint, jsonify, request
from models import *
from models.constants import *
from models.shared import db
from passlib.hash import sha256_crypt
import os
from werkzeug.utils import secure_filename
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
UPLOAD_FOLDER = 'static/images/user_images'
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

@user_route.route('/users/get-edit-user-data', methods=['GET'])
def get_edit_user_data():
    user_id = request.args.get('id')

    user = User.query.filter(User.id == user_id).first()

    if user.role_id == ROLE_STUDENT:
        modules = Module.query.all()
        years = StudentYear.query.all()

        return jsonify({'user': user.serialize(),\
                        'modules': [x.serialize() for x in modules],\
                        'studentYears': [x.serialize() for x in years]})
    else:
        return jsonify({'user': user.serialize()})

@user_route.route('/users/change-password', methods=['POST'])
def change_password():
    req = request.get_json()

    user_id = int(req['userId'])

    old_password = str(req['oldPassword'])
    new_password = str(req['newPassword'])
    confirmed_password = str(req['confirmPassword'])

    user = User.query.filter(User.id == user_id).first()

    if sha256_crypt.verify(old_password, user.hashed_password):
        if new_password == confirmed_password:
            user.hashed_password = sha256_crypt.hash(new_password)
            db.session.commit()
            return jsonify({'message': 'Lozinka je uspesno promenjena'})
        else:
            return jsonify({'error': 'Lozinke se ne poklapaju'}), 401
    else:
        return jsonify({'error': 'Neispravna lozinka'}), 401
 
@user_route.route('/users/update-user-data', methods=['POST'])
def update_user_data():
    req = request.get_json()

    user_id = int(req['id'])
    user_name = str(req['name'])
    user_lastname = str(req['lastname'])
    user_email = str(req['email'])
    user_student_id = str(req['studentId'])
    user_module = str(req['moduleId'])
    user_year = str(req['studentYearId'])

    user = User.query.filter(User.id == user_id).first()

    user.name = user_name
    user.lastname = user_lastname
    user.email = user_email
    user.studend_id = user_student_id

    module = Module.query.filter(Module.id == user_module).first()
    year = StudentYear.query.filter(StudentYear.id == user_year).first()

    user.module = module
    user.student_year = year

    db.session.commit()

    return jsonify({'message': 'Podaci su uspesno promenjeni!'})

@user_route.route('/users/file-upload', methods=['POST'])
@jwt_required
def file_upload():
    if request.method == 'POST':
        user_id = get_jwt_identity()
        user = User.query.filter(User.id == user_id).first()
        # check if the post request has the file part
        if 'file' not in request.files:
            print(request.files)
            return jsonify({'error': 'Fajl nije pronadjen u request files'})
        file = request.files['file']
        req = request.get_json()
        #user_id = req['userId']
        print(req)
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            return jsonify({'error': 'Fajl nije pronadjen filename'})
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            image = Image()
            image.path = filename

            user.image = image

            print(user.image.path)
            db.session.add(image)
            db.session.commit()
            return jsonify({'path': filename})

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


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