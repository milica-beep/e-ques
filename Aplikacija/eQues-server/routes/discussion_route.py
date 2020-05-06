from flask import Blueprint, jsonify, request
from models import *
from models.shared import db

# routes
discussion_route = Blueprint("discussion", __name__)

@discussion_route.route('/discussion/get-discussion', methods=['GET'])
def get_discussion():
    question_id = request.args.get('id')

    answers = Answer.query.filter(Answer.question_id == question_id).all()

    usersList = []

    comments = []

    if answers:
        for answer in answers:
            usersList.append(User.query.filter(User.id == answer.user_id).first())
            comments += Comment.query.filter(Comment.answer_id == answer.id).all()

        if comments:
            for comment in comments:
                usersList.append(comment.user)

        users = set(usersList)

        return jsonify({'answers': [x.serialize() for x in answers], \
                        'comments': [x.serialize() for x in comments],\
                        'users': [x.serialize() for x in users]})

@discussion_route.route('/discussion/test', methods=['GET'])
def test():
    user = User.query.filter(User.id == 1).first()

    return jsonify({'answers': [x.serialize() for x in user.answers]})