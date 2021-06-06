import os
import sys
from base64 import b64encode
from json import dumps
from flask_restx import reqparse, Api, Resource, Namespace
from flask import Blueprint, jsonify, url_for, send_file
from werkzeug.datastructures import FileStorage
from app import get_database
import uuid
from mongoengine import Document, StringField, DictField, IntField, Q
from marshmallow import Schema, fields
from .models import CalendarDocument, CalendarSchema
from .handle import *
from flask_jwt_extended import jwt_required, get_jwt_identity

# 상위 디렉토리 import를 위한 경로 설정
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

# DB 및 Document 정의
database = get_database()

# 블루프린트/API 객체 생성
calendar = Blueprint('calendar', __name__)
calendar_api = Namespace('calendar_api', path='/calendar',
                         title='캘린더 api', description='캘린더 생성, 조회, 수정')
api = Api(calendar)

# request 요청 변수 parser
parser_calendar = reqparse.RequestParser()
parser_calendar.add_argument('date')
parser_calendar.add_argument(
    'ootd_img', type=FileStorage, location='files')

# clothes_feature
parser_calendar.add_argument('clothes_subcategory')

# 캘린더 화면 OOTD 등록 표시용
parser_calendar.add_argument('month')

calendar_model = calendar_api.model('Model', {
    'user_id': fields.Integer(),
    'date': fields.String(),
    'ootd_path': fields.String(),
    'clothes_feature': fields.Dict()

})


@calendar_api.route('/')
class Calendar(Resource):
    # 캘린더 CRUD
    # Create
    @jwt_required()
    @calendar_api.expect(parser_calendar)
    @calendar_api.response(200, 'Success', calendar_model)
    def post(self):
        args = parser_calendar.parse_args()
        kakao_id = get_jwt_identity()

        local_file_name, local_file_path = make_file_path()
        save_ootd_img(args['ootd_img'], local_file_path)

        calendar_document = create_calendar_document(
            kakao_id, args['date'], args['clothes_subcategory'], local_file_name)

        calendar_document.save()
        calendar_schema = CalendarSchema()

        return calendar_schema.dump(calendar_document)

    @jwt_required()
    @calendar_api.expect(parser_calendar)
    @calendar_api.response(200, 'Success', calendar_model)
    def get(self):
        # Read
        args = parser_calendar.parse_args()
        kakao_id = get_jwt_identity()
        # user_id, date가 함께 params로 요청되는 경우 : OOTD 이미지 반환
        if args['date']:
            local_file_path = get_file_path(args['date'], kakao_id)

            with open(local_file_path, 'rb') as img_file:
                base64_string = b64encode(img_file.read())

            return jsonify(
                image_base64_string=base64_string.decode("utf-8")
            )

        # user_id, month가 전달되는 경우 : 유저가 OOTD를 등록한 날짜 리스트 반환
        else:
            ootd_enrolled_dates = create_date_array(
                kakao_id, args['month'])

            return jsonify(
                status=200,
                ootd_enrolled_dates=ootd_enrolled_dates
            )

    @jwt_required()
    @calendar_api.expect(parser_calendar)
    @calendar_api.response(200, 'Success', calendar_model)
    def put(self):
        # Update
        args = parser_calendar.parse_args()
        kakao_id = get_jwt_identity()
        delete_ootd_img(kakao_id, args['date'])

        local_file_name, local_file_path = make_file_path()
        save_ootd_img(args['ootd_img'], local_file_path)
        calendar_schema = CalendarSchema()
        calendar_document = update_calendar_document(
            kakao_id, args['date'], local_file_name)

        return calendar_schema.dump(calendar_document)


api.add_resource(Calendar, '/calendar')
