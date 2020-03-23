from flask_sqlalchemy import sqlalchemy
from app import app
from models.shared import db

from models import *

if __name__ == "__main__":

    # Create database if it doesn't exist already
    full_url = app.config["SQLALCHEMY_DATABASE_URI"]
    full_url_split = full_url.split("/")

    url = "/".join(full_url_split[:-1])
    database_name = full_url_split[-1]
    
    engine = sqlalchemy.create_engine(url)  # connect to server

    create_str = f"CREATE DATABASE IF NOT EXISTS {database_name} ;"
    engine.execute(create_str)
    engine.execute(f"USE {database_name} ;")

    try:
        print("Creating database...")
        db.init_app(app)
        with app.app_context():
            db.create_all()
        print(f"Database {database_name} created successfully!")
    except Exception as e:
        print("Database creation failed!")
        print(e)
    