from flask import Flask
from models.shared import db
from routes.user_route import user_route 

app = Flask(__name__)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:root@localhost/eQues_db"

@app.route("/")
def hello_world():
    return "Hello"

if __name__ == "__main__":
    db.init_app(app)

    app.register_blueprint(user_route)
    app.run()