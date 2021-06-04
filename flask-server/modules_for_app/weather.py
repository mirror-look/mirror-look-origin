import os
import sys
from flask_restx import reqparse
from flask import Blueprint, jsonify, url_for, send_file
import requests
import json
from time import localtime
import datetime
from collections import defaultdict

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
    print(type(data))
    # return data
    # API response 데이터 전처리(미구현)
    current_weather = data['current']['weather'][0]['description']
    hourly_weathers_of_the_day_raw = data['hourly']
    hourly_weathers_of_the_day = defaultdict(str)
    current_temperatures = int(data['current']['temp'] - 273.15)
    current_weather_icon = data['current']['weather'][0]['icon']

    for hourly_weather in hourly_weathers_of_the_day_raw:
        time = localtime(hourly_weather['dt'])
        day_time = datetime.datetime.utcfromtimestamp(
            hourly_weather['dt']).strftime("%Y-%m-%d %H:%M")

        description = hourly_weather['weather'][0]['description']
        hourly_weathers_of_the_day[day_time] = description

    return jsonify(
        current_weather=current_weather,
        hourly_weather=hourly_weathers_of_the_day,
        current_temperatures=current_temperatures,
        current_weather_icon=current_weather_icon
    )
