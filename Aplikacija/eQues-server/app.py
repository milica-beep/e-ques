from flask import Flask
from models.shared import db
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os
from flask_mail import Mail

from routes.user_route import user_route
from routes.auth_route import auth_route
from routes.subject_route import subject_route
from routes.discussion_route import discussion_route
from routes.question_route import question_route
from routes.admin_route import admin_route

UPLOAD_FOLDER = 'static/images/user_images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:root@localhost/eQues_db"

app.config['JWT_SECRET_KEY'] = 'super-secret'

jwt = JWTManager(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'eques.flask@gmail.com'
app.config['MAIL_PASSWORD'] = 'stdio.h505'
app.config['MAIL_DEFAULT_SENDER'] = 'eques.flask@gmail.com'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

@app.route("/")
def hello_world():
    msg = Message('Hello', recipients = ['milicadnikolic@yahoo.com'])
    msg.body = "This is the email body"
    mail.send(msg)
    return "Sent"

if __name__ == "__main__":
    db.init_app(app)

    app.register_blueprint(user_route)
    app.register_blueprint(auth_route)
    app.register_blueprint(subject_route)
    app.register_blueprint(discussion_route)
    app.register_blueprint(question_route)
    app.register_blueprint(admin_route)

    app.run()