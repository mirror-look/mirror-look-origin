import os
import sys
from flask_restx import reqparse, Api, Resource, Namespace
from flask import Blueprint, jsonify, url_for, send_file
from app import get_database
import uuid
from mongoengine import Document, StringField, DictField, IntField, Q
from marshmallow import Schema, fields
from .clothes_for_weather import *
from .clothes_for_laundry import *
from .models import CalendarDocument

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

# 상위 디렉토리 import를 위한 경로 설정
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

# DB 및 Document 정의
database = get_database()

# 블루프린트/API 객체 생성
recommend = Blueprint('recommend', __name__)
recommend_api = Namespace('recommend_api', path='/recommend',
                          title='날씨 기반 의상 추천 api', description='날씨 기반 사용자 의상 적합 여부 판단 및 의상 추천')
api = Api(recommend)

parser_recommend = reqparse.RequestParser()
parser_recommend.add_argument('temperature_from_openweather_api', type=int)
parser_recommend.add_argument(
    'selected_clothes_from_top_3_result', action='append')
parser_recommend.add_argument('date')
parser_recommend.add_argument('user_id')

recommend_model = recommend_api.model('Model', {
    'temperature_from_openweather_api': fields.Integer(),
    'selected_clothes_from_top_3_result': fields.List(fields.String)
})


@recommend_api.route('/')
class Recommend(Resource):
    @recommend_api.expect(parser_recommend)
    @recommend_api.response(200, 'Success', recommend_model)
    def post(self):
        args = parser_recommend.parse_args()
        temperature = args['temperature_from_openweather_api']
        user_clothes_on_fit = args['selected_clothes_from_top_3_result']
        print(temperature, user_clothes_on_fit)
        user_clothes_on_fit_by_category = user_clothes_by_category(
            user_clothes_on_fit)
        clothes_suitable_for_weather = clothes_for_weather(
            user_clothes_on_fit_by_category, temperature)
        recommended_clothes = recommend_clothes(
            temperature, user_clothes_on_fit_by_category)
        clothes_hot_or_cold = say_hot_or_cold(
            user_clothes_on_fit, temperature, user_clothes_on_fit_by_category)
        return jsonify(
            user_clothes_by_category=user_clothes_on_fit_by_category,
            clothes_for_weather=clothes_suitable_for_weather,
            recommended_clothes=recommended_clothes,
            hot_or_cold=clothes_hot_or_cold
        )

    def get(self):
        args = parser_recommend.parse_args()
        date = args['date']
        kakao_id = args['user_id']
        print(date)
        print(kakao_id)

        sub_category = CalendarDocument.objects.get(
            Q(date=date) & Q(user_id=kakao_id)).clothes_subcategory

        print(sub_category)
        laundry_recommended = recommend_laundry(sub_category)

        return jsonify(
            laundry_recommended = laundry_recommended
        )

api.add_resource(Recommend, '/recommend')
