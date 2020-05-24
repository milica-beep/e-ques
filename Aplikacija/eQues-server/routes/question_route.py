from flask import Blueprint, jsonify, request
from models import *
from models.shared import db
import datetime

# routes
question_route = Blueprint("questions", __name__)

@question_route.route('/questions/add-question', methods=['POST'])
def post_question():
    req = request.get_json()

    title = str(req['title'])
    text = str(req['text'])
    topic_id = int(req['topicId'])
    user_id = int(req['userId'])

    timestamp = datetime.datetime.now().strftime('%d/%m/%Y, %H:%M:%S')

    errors = { }

    if topic_id == null:
        errors['topicId'] = 'Topic id nedostaje'
    
    if user_id == null:
        errors['userId'] = 'User id nedostaje'

    existing_user_by_id = User.query.filter(User.id == user_id).first()

    if existing_user_by_id is None:
        errors['userId'] = "Korisnik ne postoji"

    existing_topic_by_id = Topic.query.filter(Topic.id == topic_id).first()

    if existing_topic_by_id is None:
        errors['topicId'] = "Oblast ne postoji"

    if len(errors) != 0:
        return jsonify(errors), 422

    question = Question()

    question.title = title
    question.text = text
    #question.topic_id = topic_id
    #question.user_id = user_id

    question.timestamp = timestamp

    existing_topic_by_id.questions.append(question)
    existing_user_by_id.questions.append(question)

    db.session.add(question)
    db.session.commit()

    return jsonify({'message': 'Pitanje je uspešno postavljeno.'}), 200