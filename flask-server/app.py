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


# 최초 DB 연동 테스트시 주석 해제 후 python app.py 실행
# test_user_doc = {
#     'user_name': '홍길동',
#     'profile_image': 'img_path/from/kakao/login'
# }

# test_callendar_doc = {
#     'user_id': 'ObjectId(~_~_~_~_)',
#     'data': '2021-04-01',
#     'ootd': 'img_path/in/blob/storage',
#     'clothes_feature': {
#         'color': 'red',
#         'fabric': 'cotton',
#         'sleeve': 'long',
#         'etc': '...etc'
#     }
# }


def create_app():
    app = Flask(__name__)
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

    from modules_for_app.calendar import calendar
    app.register_blueprint(calendar)

    from modules_for_app.kakao_login import kakaoOauth
    app.register_blueprint(kakaoOauth)

    from modules_for_app.search import search
    app.register_blueprint(search)

    from modules_for_app.weather import weather
    app.register_blueprint(weather)

    from modules_for_app.userinfo import userinfo
    app.register_blueprint(userinfo)

    from modules_for_app.classification import classification
    app.register_blueprint(classification)

    return app


if __name__ == "__main__":
    database = get_database()

    # 최초 DB 연동 테스트시 주석 해제 후 python app.py 실행
    # user_collection = database['User']
    # callendar_collection = database['Callendar']

    # user_collection.insert_one(test_user_doc)
    # callendar_collection.insert_one(test_callendar_doc)

    app_for_test = create_app()
    app_for_test.run('127.0.0.1', port=5000, debug=True)
