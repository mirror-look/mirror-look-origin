import os
import sys
from flask_restx import reqparse, Api, Resource
from flask import Blueprint, jsonify, url_for, send_file
from werkzeug.datastructures import FileStorage
from app import get_database
import uuid
from mongoengine import Document, StringField, DictField, IntField, Q
from marshmallow import Schema, fields
from .models import CalendarDocument, CalendarSchema
from .handle import *

# 상위 디렉토리 import를 위한 경로 설정
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

# DB 및 Document 정의
database = get_database()

# 블루프린트/API 객체 생성
calendar = Blueprint('calendar', __name__)
api = Api(calendar)

# request 요청 변수 parser
parser_calendar = reqparse.RequestParser()
parser_calendar.add_argument('user_id')
parser_calendar.add_argument('date')
parser_calendar.add_argument(
    'ootd_img', type=FileStorage, location='files')

# clothes_feature
parser_calendar.add_argument('fabric')
parser_calendar.add_argument('color')
parser_calendar.add_argument('sleeve')

# 캘린더 화면 OOTD 등록 표시용
parser_calendar.add_argument('month')


class Calendar(Resource):
    # 캘린더 CRUD
    # Create
    def post(self):
        args = parser_calendar.parse_args()

        # 테스트용, 이후 Blob Storage Upload 부분 추가 예정
        local_file_name, local_file_path = make_file_path()
        save_ootd_img(args['ootd_img'], local_file_path)

        calendar_document = create_calendar_document(
            args['user_id'], args['date'], local_file_name, args['fabric'], args['color'], args['sleeve'], local_file_name)

        calendar_document.save()
        calendar_schema = CalendarSchema()

        return calendar_schema.dump(calendar_document)

    def get(self):
        # Read
        args = parser_calendar.parse_args()
        # user_id, date가 함께 params로 요청되는 경우 : OOTD 이미지 반환
        if args['date']:
            local_file_path = get_file_path(args['date'], args['user_id'])

            return send_file(local_file_path)

        # user_id, month가 전달되는 경우 : 유저가 OOTD를 등록한 날짜 리스트 반환
        else:
            ootd_enrolled_dates = create_date_array(
                args['user_id'], args['month'])

            return jsonify(
                status=200,
                ootd_enrolled_dates=ootd_enrolled_dates
            )

    def put(self):
        # Update
        args = parser_calendar.parse_args()
        delete_ootd_img(args['user_id'], args['date'])

        local_file_name, local_file_path = make_file_path()
        save_ootd_img(args['ootd_img'], local_file_path)
        calendar_schema = CalendarSchema()
        calendar_document = update_calendar_document(
            args['user_id'], args['date'], local_file_name)

        return calendar_schema.dump(calendar_document)


api.add_resource(Calendar, '/calendar')
