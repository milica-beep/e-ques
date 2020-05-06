from flask import Blueprint, jsonify, request
from models import *
from models.shared import db

# routes
subject_route = Blueprint("subjects", __name__)

@subject_route.route('/subjects/get-subject', methods=['GET'])
def get_subject():
    subject_id = request.args.get('id')

    if subject_id:
        subject = Subject.query.filter(Subject.id == subject_id).first()
        topics = Topic.query.filter(Topic.subject_id == subject_id).all()

        if subject:
            return jsonify({'subject': subject.serialize(), 'topics': [x.serialize() for x in topics]}), 200
        else: 
            return {'error': 'Predmet ne postoji u bazi.'}, 400

@subject_route.route('/subjects/get-topics', methods=['GET'])
def get_topics():
    subject_id = request.args.get('id')

    if subject_id:
        topics = Topic.query.filter(Topic.subject_id == subject_id).all()
        
        if topics:
            return jsonify({'topics': [x.serialize() for x in topics]})
        else: 
            return {'error': 'Predmet nema oblasti u bazi.'}, 400

@subject_route.route('/subjects/get-questions', methods=['GET'])
def get_questions():
    topic_id = request.args.get('id')

    questions = Question.query.filter(Question.topic_id == topic_id).all()

    if questions:
        return jsonify({'questions': [x.serialize() for x in questions]}), 200
    else:
        return {'error': 'Oblast nema pitanja u bazi.'}, 400