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

        if subject:
            return jsonify(subject.serialize())
        else: # postavi neki normalan kod za gresku
            return {'error': 'Predmet ne postoji u bazi.'}, 400

@subject_route.route('/subjects/get-topics', methods=['GET'])
def get_topics():
    subject_id = request.args.get('id')

    if subject_id:
        topics = Topic.query.filter(Topic.subject_id == subject_id).all()
        
        if topics:
            return jsonify({'topics': [x.serialize() for x in topics]})
        else: # postavi neki normalan kod za gresku
            return {'error': 'Predmet nema oblasti u bazi.'}, 400
