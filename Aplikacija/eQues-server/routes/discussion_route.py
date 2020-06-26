from flask import Blueprint, jsonify, request
from models import *
from models.shared import db

# routes
discussion_route = Blueprint("discussion", __name__)

@discussion_route.route('/discussion/get-discussion', methods=['GET'])
def get_discussion():
    question_id = request.args.get('id')

    question = Question.query.filter(Question.id == question_id).first()

    user_asking = question.user

    #answers = Answer.query.filter(Answer.question_id == question_id).all()

    answers = question.answers

    usersList = []

    comments = []

    if answers:
        for answer in answers:
            #usersList.append(User.query.filter(User.id == answer.user_id).first())
            #comments += Comment.query.filter(Comment.answer_id == answer.id).all()

            usersList.append(answer.user)
            comments += answer.comments

        if comments:
            for comment in comments:
                usersList.append(comment.user)

        users = set(usersList)

        return jsonify({'question': question.serialize(),
                        'userAsking': user_asking.serialize(), \
                        'answers': [x.serialize() for x in answers], \
                        'comments': [x.serialize() for x in comments],\
                        'users': [x.serialize() for x in users]})
    
    return jsonify({'question': question.serialize(), \
                    'userAsking': user_asking.serialize()})

@discussion_route.route('/discussion/get-answer', methods=['GET'])
def get_answer():
    answer_id = request.args.get('id')

    if answer_id:
        answer = Answer.query.filter(Answer.id == answer_id).first()

        user_asking = answer.user

        if answer:
            return jsonify({'answer': answer.serialize(), \
                            'userAsking': user_asking.serialize()}), 200
        else: 
            return {'error': 'Odgovor ne postoji u bazi.'}, 400


@discussion_route.route('/discussion/add-answer', methods=['POST'])
def add_answer():
    req = request.get_json()

    text = str(req['text'])
    question_id = int(req['questionId'])
    user_id = int(req['userId'])
    is_pinned = False
    grade = 0

    errors = { }

    if question_id is None:
        errors['questionId'] = 'Id pitanja nedostaje'
    
    if user_id is None:
        errors['userId'] = 'User id nedostaje'

    existing_user_by_id = User.query.filter(User.id == user_id).first()

    if existing_user_by_id is None:
        errors['userId'] = "Korisnik ne postoji"

    existing_question_by_id = Question.query.filter(Question.id == question_id).first()

    if existing_question_by_id is None:
        errors['questionId'] = "Pitanje ne postoji"

    if len(errors) != 0:
        return jsonify(errors), 422

    answer = Answer(text,question_id,user_id, is_pinned, grade)

    db.session.add(answer)
    db.session.commit()

    return jsonify({'message': 'Odgovor je uspešno postavljen.'}), 200

@discussion_route.route('/discussion/delete-answer', methods=['DELETE'])
def delete_answer():
    answer_id = request.args.get('id')

    answer_to_delete = Answer.query.filter(Answer.id == answer_id).first()

    comments_to_delete = answer_to_delete.comments

    for comment in comments_to_delete:
        db.session.delete(comment)

    db.session.delete(answer_to_delete)
    db.session.commit()

    return jsonify({'message': 'Odgovor je uspešno obrisan.'}), 200

@discussion_route.route('/discussion/add-comment', methods=['POST'])
def add_comment():
    req = request.get_json()

    text = str(req['text'])
    answer_id = int(req['answerId'])
    user_id = int(req['userId'])

    errors = { }

    if answer_id is None:
        errors['answerId'] = 'Id odgovora nedostaje'
    
    if user_id is None:
        errors['userId'] = 'User id nedostaje'

    existing_user_by_id = User.query.filter(User.id == user_id).first()

    if existing_user_by_id is None:
        errors['userId'] = "Korisnik ne postoji"

    existing_answer_by_id = Answer.query.filter(Answer.id == answer_id).first()

    if existing_answer_by_id is None:
        errors['answerId'] = "Odgovor ne postoji"

    if len(errors) != 0:
        return jsonify(errors), 422

    comment = Comment(text, answer_id, user_id)

    db.session.add(comment)
    db.session.commit()

    return jsonify({'message': 'Komentar je uspešno postavljen.'}), 200

@discussion_route.route('/discussion/delete-comment', methods=['DELETE'])
def delete_comment():
    comment_id = request.args.get('id')

    comment_to_delete = Comment.query.filter(Comment.id == comment_id).first()

    db.session.delete(comment_to_delete)
    db.session.commit()

    return jsonify({'message': 'Komentar je uspešno obrisan.'}), 200

@discussion_route.route('/discussion/pin-answer', methods=['POST'])
def pin_answer():
    req = request.get_json()

    answer_id = int(req['id'])

    answer_to_pin = Answer.query.filter(Answer.id == answer_id).first()

    answer_to_pin.is_pinned = not answer_to_pin.is_pinned

    db.session.commit()

    return jsonify({'message': 'Odgovor je uspešno pinovan.'}), 200

@discussion_route.route('/discussion/grade-answer', methods=['POST'])
def grade_answer():
    req = request.get_json()

    answer_id = int(req['answerId'])
    grade_value = int(req['newGrade'])
    user_id = int(req['userId'])

    new_grade = Grade()

    new_grade.user_id = user_id
    new_grade.value = grade_value

    answer_to_grade = Answer.query.filter(Answer.id == answer_id).first()

    for grade in answer_to_grade.grades:
        if grade.user_id == user_id:
            answer_to_grade.grades.remove(grade)
    
    existing_grade = Grade.query.filter(Grade.value == new_grade.value).filter(Grade.user_id == user_id).first()

    if existing_grade:
        answer_to_grade.grades.append(existing_grade)
    else:
        answer_to_grade.grades.append(new_grade)

    average_grade = sum(g.value for g in answer_to_grade.grades) / len(answer_to_grade.grades)

    print(average_grade)

    answer_to_grade.average_grade = average_grade

    db.session.commit()

    return jsonify({'answer': answer_to_grade.serialize()})
    

@discussion_route.route('/discussion/test', methods=['GET'])
def test():
    user = User.query.filter(User.id == 1).first()

    return jsonify({'answers': [x.serialize() for x in user.answers]})