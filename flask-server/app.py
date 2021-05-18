import os
from flask import Flask, Blueprint
from flask_cors import CORS
from flask_restx import Api
import pymongo


def get_database():
    # DB 연결
    connection = pymongo.MongoClient("localhost", 27017)
    # 로컬 DB 초기화시 주석 해제후 실행
    # connection.drop_database('mirror_look_DB')

    # 로컬 테스트 DB 생성
    database = connection['mirror_look_DB']

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

    CORS(app)

    from modules_for_app.user import user
    app.register_blueprint(user)

    from modules_for_app.calendar import calendar
    app.register_blueprint(calendar)

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
