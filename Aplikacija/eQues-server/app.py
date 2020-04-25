from flask import Flask
from models.shared import db
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from routes.user_route import user_route
from routes.auth_route import auth_route


app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:root@localhost/eQues_db"

app.config['JWT_SECRET_KEY'] = 'super-secret'

jwt = JWTManager(app)

@app.route("/")
def hello_world():
    return "Hello"

if __name__ == "__main__":
    db.init_app(app)

    app.register_blueprint(user_route)
    app.register_blueprint(auth_route)

    app.run()