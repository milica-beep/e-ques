from flask import Blueprint, jsonify, request
from models import *
from models.shared import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

# routes
subject_route = Blueprint("subjects", __name__)

@subject_route.route('/subjects/get-subject', methods=['GET'])
@jwt_required
def get_subject():
    subject_id = request.args.get('id')

    if subject_id:
        subject = Subject.query.filter(Subject.id == subject_id).first()
        topics = Topic.query.filter(Topic.subject_id == subject_id).all()
        professors = subject.proffessors

        if subject:
            return jsonify({'subject': subject.serialize(), 'topics': [x.serialize() for x in topics],\
                            'professors': [x.serialize() for x in professors]}), 200
        else: 
            return {'error': 'Predmet ne postoji u bazi.'}, 400

@subject_route.route('/subjects/get-topics', methods=['GET'])
@jwt_required
def get_topics():
    subject_id = request.args.get('id')

    if subject_id:
        topics = Topic.query.filter(Topic.subject_id == subject_id).all()
        
        if topics:
            return jsonify({'topics': [x.serialize() for x in topics]})
        else: 
            return {'error': 'Predmet nema oblasti u bazi.'}, 400

@subject_route.route('/subjects/get-questions', methods=['GET'])
@jwt_required
def get_questions():
    topic_id = request.args.get('id')

    questions = Question.query.filter(Question.topic_id == topic_id).all()

    if questions:
        return jsonify({'questions': [x.serialize() for x in questions]}), 200
    else:
        return jsonify({'questions': None})

@subject_route.route('/subjects/search-subjects', methods=['GET'])
@jwt_required
def search_subjects():
    subj_search = request.args.get('search')

    subjects = []

    all_subjects = Subject.query.all()

    for subj in all_subjects:
        if subj.name.find(subj_search) != -1:
            subjects.append(subj)
        elif subj.description.find(subj_search) != -1:
            subjects.append(subj)
    
    if len(subjects) != 0:
        return jsonify({'subjects': [x.serialize() for x in subjects]})
    else:
        return jsonify({'message': 'Nije pronadjen nijedan predmet'})