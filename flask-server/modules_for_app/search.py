import os
import sys
from flask_restx import reqparse
from flask import Blueprint, jsonify, url_for, send_file
import cv2
from app import get_database
import uuid

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
calendar_collection = database['Calendar']

# 블루프린트/API 객체 생성 및 인코더 연결
search = Blueprint('search', __name__)
search.json_encoder = MongoEngineJSONEncoder

# request 요청 변수 parser
parser_search = reqparse.RequestParser()
parser_search.add_argument('user_name')
parser_search.add_argument('user_id')
parser_search.add_argument('date')

# Search by User


@search.route('/user-search', methods=['POST'])
def search_user():
    args = parser_search.parse_args()
    query = {'user_name': {'$regex': args['user_name']}}
    searched_user_list = list(user_collection.find(query))

    user_name_list = []
    for user in searched_user_list:
        user_name_list.append(user['user_name'])

    return jsonify(
        status=200,
        searched_user_list=user_name_list
    )


@ search.route('/user-ootd', methods=['POST'])
def search_ootd_by_user():
    args = parser_search.parse_args()
    query = {'user_id': args['user_id']}
    calendar_info_of_selected_user = list(calendar_collection.find(query))

    ootd_info_of_selected_user = []
    for ootd_info in calendar_info_of_selected_user:
        ootd_info_of_selected_user.append(ootd_info['ootd_path'])

    return jsonify(
        status=200,
        ootd_info_of_selected_user=ootd_info_of_selected_user
    )

# Search by Day


@ search.route('/day-ootd', methods=['POST'])
def search_ootd_by_day():
    args = parser_search.parse_args()
    query = {'date': args['date']}
    calendar_info_of_selected_day = list(calendar_collection.find(query))

    ootd_info_of_selected_day = []
    for ootd_info in calendar_info_of_selected_day:
        ootd_info_of_selected_day.append(ootd_info['ootd_path'])

    return jsonify(
        status=200,
        ootd_info_of_selected_day=ootd_info_of_selected_day
    )
