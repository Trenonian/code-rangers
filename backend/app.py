"""
    creates the app
"""

import os
from flask import Flask, request
from flask.json import jsonify
from dotenv import load_dotenv, find_dotenv

# from flask_login import current_user, LoginManager, login_user, logout_user
# from sqlalchemy import func
from passlib.hash import sha256_crypt
from models import db, User

from national_parks import get_parks_and_weather

app = Flask(__name__)


load_dotenv(find_dotenv())

# login_manager = LoginManager()

db_url = os.getenv("DATABASE_URL")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)
app.config["SQLALCHEMY_DATABASE_URI"] = db_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)


@app.route("/login", methods=["POST"])
def login():
    """
    logs in the user
    """
    data = request.get_json()
    user = User.query.filter_by(email=data.get("email")).first()

    json_data = {"status": "invalid"}
    if user:
        password = sha256_crypt.verify(data.get("password"), user.password)

        if password:
            json_data = {
                "email": data.get("email"),
                "password": data.get("password"),
                "user_state": user.user_state,
                "login": "valid",
                "status": 200,
            }
    return jsonify(json_data)


@app.route("/signUp", methods=["POST"])
def sign_up():
    """
    addes the new account
    """
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    user_state = data.get("user_state")
    hiking = data.get("hiking")
    fishing = data.get("fishing")
    offroad = data.get("offroad")
    camping = data.get("camping")
    bouldering = data.get("bouldering")

    if User.query.filter_by(email=email).first():
        error_object = {"message": "Email already exists!", "status": 300}
        return jsonify(error_object)

    password = sha256_crypt.encrypt(password)

    new_account = User(
        email=email,
        password=password,
        user_state=user_state,
        hiking=hiking,
        fishing=fishing,
        offroad=offroad,
        camping=camping,
        bouldering=bouldering,
    )
    db.session.add(new_account)
    db.session.commit()
    success_object = {"message": "New user registered", "status": 200}
    return jsonify(success_object)


@app.route("/parks", methods=["POST"])
def get_users_parks():
    """
    returns the parks interesting to the user
    """
    data = request.get_json()
    user_state = data.get("user_state")
    # hardcoded for MVP
    favorites = [
        "fishing",
        "hiking",
        "camping",
    ]
    parks = get_parks_and_weather(favorites, user_state)
    return jsonify(parks)


def main():
    """
    runs the app
    """
    app.run(
        debug=True,
        port=int(os.getenv("PORT", "5000")),
    )


if __name__ == "__main__":
    main()
