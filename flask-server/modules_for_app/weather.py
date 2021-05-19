import os
import sys
from flask_restx import reqparse
from flask import Blueprint, jsonify, url_for, send_file
import requests
import json
import time

# 상위 디렉토리 import를 위한 경로 설정
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

# 블루프린트/API 객체 생성 및 인코더 연결
weather = Blueprint('weather', __name__)

# request 요청 변수 parser
parser_weather = reqparse.RequestParser()
parser_weather.add_argument('latitude')
parser_weather.add_argument('longitude')

# API 콜을 위한 변수들


@weather.route('/weather', methods=['POST'])
def get_weather_info():
    args = parser_weather.parse_args()

    lat = args['latitude']
    lon = args['longitude']
    part = 'daily'  # 'current', 'minutely', 'hourly', 'alert'
    api_key = '83728bc30509bca1ea0aaba3ca6c54c0'
    api_url = f'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={api_key}&lang=kr'

    # 날씨 정보 요청
    response = requests.get(api_url)
    data = json.loads(response.text)

    # API response 데이터 전처리(미구현)
    # current_weather = data['current']

    return data
