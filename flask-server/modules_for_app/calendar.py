import os
import sys
from flask_restx import reqparse, Api, Resource
from flask import Blueprint, jsonify
import cv2
from app import get_database

# 카카오 로그인 API를 통해 유저 정보 가져오기
from .kakao_login import logged_in_as, kakao_user_info

# pymongo cursor 객체 인코딩
from bson import json_util
from .json_encoder_for_pymongo import MongoEngineJSONEncoder

# 상위 디렉토리 import를 위한 경로 설정
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

# DB 및 Collection 연결
database = get_database()
calendar_collection = database['Calendar']

# 블루프린트/API 객체 생성 및 인코더 연결
calendar = Blueprint('calendar', __name__)
calendar.json_encoder = MongoEngineJSONEncoder
api = Api(calendar)

# 도큐먼트 형식(참고)
'''
test_callendar_doc = {
    'user_id': '60a22ad2a453e4e5ba8d203f',
    'date': '2021-04-01',
    'ootd': 'img_path/in/blob/storage',
    'clothes_feature': {
        'color': 'red',
        'fabric': 'cotton',
        'sleeve': 'long',
        'etc': '...etc'
    }
}
'''

# request 요청 변수 parser
parser_calendar = reqparse.RequestParser()
parser_calendar.add_argument('user_id')
parser_calendar.add_argument('date')
parser_calendar.add_argument('ootd')

# clothes_feature
parser_calendar.add_argument('fabric')
parser_calendar.add_argument('color')
parser_calendar.add_argument('sleeve')

# 캘린더 CRUD

'''
blob storage에 저장될 이미지 파일에 대한 처리는 포함되어 있지 않음 (추후 확정 필요)
'''


class Calendar(Resource):
    # Create
    def post(self):
        args = parser_calendar.parse_args()

        '''
        Validation 추가 예정(라이브러리 활용 or 하드코딩??)
        '''

        document = {
            'user_id': args['user_id'],
            'date': args['date'],
            'ootd': args['ootd'],
            'clothes_feature': {
                'fabric': args['fabric'],
                'color': args['color'],
                'sleeve': args['sleeve']
            }
        }

        calendar_collection.insert_one(document)

        del document['_id']

        return jsonify(
            status=200,
            ootd_created=document
        )
    # Read

    def get(self):
        args = parser_calendar.parse_args()
        query = {'user_id': args['user_id'], 'ootd': args['ootd']}
        ootd_info_from_db = list(calendar_collection.find(query))

        return jsonify(
            status=200,
            ootd_info=str(ootd_info_from_db[0])
        )

    # Update
    '''
    DB에 있는 img_path를 수정하지 않고 blob storage 경로상의 파일을 수정하면 되지 않을까??
    '''
    # def put(self):
    #     args = parser_calendar.parse_args()
    #     query =
    #     calendar_collection.update_one

    # Delete
    def delete(self):
        args = parser_calendar.parse_args()
        query = {'user_id': args['user_id'], 'ootd': args['ootd']}
        calendar_collection.delete_one(query)

        return jsonify(
            status=200,
            ootd_deleted=query
        )


api.add_resource(Calendar, '/calendar')
