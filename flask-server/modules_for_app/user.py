import os
import sys
from flask import Blueprint, jsonify, request
from app import get_database
import pymongo

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
user_collection = database['User']

# 블루프린트 객체 생성 및 인코더 연결
user = Blueprint('user', __name__)
user.json_encoder = MongoEngineJSONEncoder

# 도큐먼트 형식(참고)
'''
{
    'user_name': user_name,
    'kakao_id_number': 'kakao_id_number,
    'profile_img': profile_img
}
'''


@user.route('/user-info', methods=['POST'])
# 유저 정보 핸들링
def handle_user_info():
    user_info = kakao_user_info(logged_in_as)

    # DB에 유저 정보가 있는지 확인
    query = {'kakao_id_number': user_info['kakao_id_number']}
    user_info_from_db = list(user_collection.find(query))

    # 유저가 로그인한 이력이 있는 경우, 닉네임 변경시 갱신
    if user_info_from_db:
        user_collection.update_one(
            {'kakao_id_number': user_info['kakao_id_number']},
            {'$set': {'user_name': user_info['user_name']}}
        )
        user_info_from_db = list(user_collection.find(query))
    # 유저가 로그인한 이력이 없는 경우 DB에 유저 정보 저장
    else:
        user_collection.insert_one(user_info)
        user_info_from_db = list(user_collection.find(query))

    # DB에서 유저 정보 불러오기
    return jsonify(
        status=200,
        user_info=str(user_info_from_db[0])
    )
