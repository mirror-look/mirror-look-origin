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

# 상위 디렉토리 import를 위한 경로 설정
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

# DB 및 Document 정의
database = get_database()


# 블루프린트/API 객체 생성
calendar = Blueprint('calendar', __name__)
api = Api(calendar)

# 도큐먼트 형식(참고)
'''
test_callendar_doc = {
    'user_id': '60a22ad2a453e4e5ba8d203f',
    'date': '2021-04-01',
    'ootd_path': 'img_path/in/blob/storage',
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
parser_calendar.add_argument(
    'ootd_img', type=FileStorage, location='files')

# clothes_feature
parser_calendar.add_argument('fabric')
parser_calendar.add_argument('color')
parser_calendar.add_argument('sleeve')

# 캘린더 화면 OOTD 등록 표시용
parser_calendar.add_argument('month')


'''
blob storage에 저장될 이미지 파일에 대한 처리는 추후 배포용 VM 수령 후 진행
'''


class Calendar(Resource):
    # 캘린더 CRUD
    # Create
    def post(self):
        args = parser_calendar.parse_args()

        # 테스트용, 이후 Blob Storage Upload 부분 추가 예정
        local_file_name = str(uuid.uuid4()) + '.png'
        local_file_path = os.path.join('ootd_storage', local_file_name)
        args['ootd_img'].save(local_file_path)

        calendar_document = CalendarDocument(
            user_id=args['user_id'],
            date=args['date'],
            ootd_path=local_file_name,
            clothes_feature={
                'fabric': args['fabric'],
                'color': args['color'],
                'sleeve': args['sleeve']
            }
        )
        calendar_document.save()
        calendar_schema = CalendarSchema()

        return calendar_schema.dump(calendar_document)

    def get(self):
        # Read
        args = parser_calendar.parse_args()
        # user_id, date가 함께 params로 요청되는 경우 : OOTD 이미지 반환
        if args['date']:
            local_file_name = CalendarDocument.objects.get(
                Q(date=args['date']) & Q(user_id=args['user_id'])).ootd_path
            local_file_path = os.path.join('ootd_storage', local_file_name)

            return send_file(local_file_path)

        # user_id, month가 전달되는 경우 : 유저가 OOTD를 등록한 날짜 리스트 반환
        else:
            calendar_document = CalendarDocument.objects(
                Q(user_id=args['user_id']) & Q(date__contains=args['month']))
            ootd_enrolled_dates = list()
            for document in calendar_document:
                ootd_enrolled_dates.append(document.date)
            return jsonify(
                status=200,
                ootd_enrolled_dates=ootd_enrolled_dates
            )

    def put(self):
        # Update
        args = parser_calendar.parse_args()

        old_local_file_name = CalendarDocument.objects.get(
            Q(user_id=args['user_id']) & Q(date=args['date'])).ootd_path
        old_local_file_path = os.path.join('ootd_storage', old_local_file_name)
        os.remove(old_local_file_path)

        new_local_file_name = str(uuid.uuid4()) + '.png'
        new_local_file_path = os.path.join('ootd_storage', new_local_file_name)
        args['ootd_img'].save(new_local_file_path)

        CalendarDocument.objects(Q(user_id=args['user_id']) & Q(
            date=args['date'])).update_one(set__ootd_path=new_local_file_name)
        calendar_schema = CalendarSchema()

        calendar_document = CalendarDocument.objects.get(
            Q(user_id=args['user_id']) & Q(date=args['date']))
        return calendar_schema.dump(calendar_document)


api.add_resource(Calendar, '/calendar')
