from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from app import app
from models.shared import db
from models import *

migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command("db", MigrateCommand)

# python migrate.py db init, migrate, upgrade

if __name__ == "__main__":
    manager.run()

