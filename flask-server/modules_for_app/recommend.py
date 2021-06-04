from flask_restx import Api, Resource, fields, Namespace
from flask import Blueprint, jsonify, request

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from app import get_database
# from laundry import *

# pymongo cursor 객체 인코딩
from bson import json_util
from .json_encoder_for_pymongo import MongoEngineJSONEncoder

# DB 및 Collection 연결
database = get_database()

# 블루프린트/API 객체 생성 및 인코더 연결

recommend = Blueprint("recommend", __name__)
api = Api(recommend)

"""
Recommend APIs - 추천 R (headers Authorization Bearer token 필요)
Read API : 날씨 기반 의상 추천 결과 read
"""

class Recommend(Resource):
    # Read
    @jwt_required()
    def get(self):
        kakao_id = get_jwt_identity()
        params = request.get_json()
        # params['result']에서 결과 리스트로 데이터 변환 후에 import한 함수 불러와서 사용해 결과 반환
        return jsonify(
            status = 200
        )

api.add_resource(Recommend, '/recommend')
