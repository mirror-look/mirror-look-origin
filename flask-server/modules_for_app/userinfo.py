from flask.helpers import url_for
from flask_restx import Api, Resource, fields, Namespace
from flask import Blueprint, jsonify, request
from .models import UserDocument, UserSchema

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from app import get_database

# pymongo cursor 객체 인코딩
from bson import json_util
from .json_encoder_for_pymongo import MongoEngineJSONEncoder

# DB 및 Collection 연결
database = get_database()

# 블루프린트/API 객체 생성 및 인코더 연결

userinfo = Blueprint("userinfo", __name__)
userinfo_api = Namespace('userinfo_api', path='/userinfo', title = '유저 정보 api', description='유저 정보 조회, 수정')
api = Api(userinfo)


"""
Userinfo APIs - 유저 정보 RU (headers Authorization Bearer token 필요)
Read API : 유저 정보를 열람
Update API : 유저 정보(위치동의)를 수정
"""

user_model = userinfo_api.model('Model',{
    'user_id' : fields.Integer(),
    'user_name' : fields.String(),
    'profile_img' : fields.String(),
    'agreement' : fields.String(),

})
header = userinfo_api.parser()
header.add_argument('token', location='headers')

@userinfo_api.route('/')
class Userinfo(Resource):
    # Read
    @userinfo_api.expect(header)
    @userinfo_api.response(200, 'Success', user_model)
    @jwt_required()
    def get(self):
        kakao_id = get_jwt_identity()
        user = UserDocument.objects.get(kakao_id_number = kakao_id)

        user_info = {
            'user_name' : user.user_name,
            'user_id' : user.kakao_id_number,
            'profile_img' : user.profile_img,
            'agreement' : user.agreement
        }

        return jsonify(
            status = 200,
            user_info = user_info
        )

        # return UserSchema.dump(user)

    # Update
    @userinfo_api.doc(params={'agreement':'true'})
    @jwt_required()
    def put(self):
        kakao_id = get_jwt_identity()
        params = request.get_json()
        print(params['agreement'])
        UserDocument.objects(kakao_id_number = kakao_id).modify(
            agreement = params['agreement']
        )

        return jsonify(status = 200)

api.add_resource(Userinfo, '/userinfo')
