import os
from flask import Flask, Blueprint
from flask_cors import CORS
from flask_restx import Api
from mongoengine import *
from datetime import timedelta
from flask_jwt_extended import JWTManager

from config import JWT_SECRET_KEY, UPLOAD_FOLDER


def get_database():
    # DB 연결
    database = connect("mirror_look_DB", host='127.0.0.1', port=27017)

    return database


def create_app():
    app = Flask(__name__)
    api = Api(app, title='mirror-look', doc='/doc')
    app.secret_key = os.urandom(24)
    app.config['JSON_AS_ASCII'] = False

    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    # flask_jwt_extended를 위한 secret_key 설정
    app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
    app.config['JWT_TOKEN_LOCATION'] = ['headers', 'query_string']
    app.config['JWT_BLACKLIST_ENABLED'] = True
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
    jwt = JWTManager(app)

    CORS(app)

    from modules_for_app.calendar import calendar, calendar_api
    app.register_blueprint(calendar)
    api.add_namespace(calendar_api)

    from modules_for_app.kakao_login import kakaoOauth
    app.register_blueprint(kakaoOauth)

    from modules_for_app.search import search
    app.register_blueprint(search)

    from modules_for_app.weather import weather
    app.register_blueprint(weather)

    from modules_for_app.userinfo import userinfo, userinfo_api
    app.register_blueprint(userinfo)
    api.add_namespace(userinfo_api)

    from modules_for_app.classification import classification
    app.register_blueprint(classification)

    return app


if __name__ == "__main__":
    database = get_database()

    app_for_test = create_app()
    app_for_test.run('127.0.0.1', port=5000, debug=True)
