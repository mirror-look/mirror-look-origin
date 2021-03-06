from flask import Blueprint, json, request, redirect, render_template, jsonify, make_response, session
from flask.helpers import url_for
import requests
from flask_jwt_extended import *
from .models import UserDocument

import os
import sys
from app import get_database
import pymongo

# pymongo cursor 객체 인코딩
from bson import json_util
from .json_encoder_for_pymongo import MongoEngineJSONEncoder

# DB 및 Document 정의
database = get_database()

from config import CLIENT_ID

kakaoOauth = Blueprint("kakaoOauth", __name__, url_prefix = "/kakaoOauth")

@kakaoOauth.route("/callback") # 프론트에서 redirect 됨
def callback():
    try:
        code = request.args.get("code")  # callback 뒤에 붙어오는 request token
        client_id = CLIENT_ID
        redirect_uri = "http://localhost:3000/oauth/callback/kakao"

        #Python에서 HTTP 요청을 보내는 모듈인 requests
        token_request = requests.get(
            f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&redirect_uri={redirect_uri}&code={code}"
        )
        token_json = token_request.json()  # 위의 get 요청을 통해 받아온 데이터를 json화 해주면 이곳에 access token이 존재
        error = token_json.get("error",None)
        if error is not None :
            return make_response({"message": "INVALID_CODE"}, 400) # 에러 처리
        access_token = token_json.get("access_token") # 카카오 소셜로그인을 통해 유저에 대한 정보를 받을 권한이 있는 토큰
        # access token 받아오는 통신

        # access token 기반으로 유저 정보 요청하는 통신
        profile_request = requests.get(
                "https://kapi.kakao.com/v2/user/me", headers={"Authorization" : f"Bearer {access_token}"},
            )
        data = profile_request.json()
        kakao_id_number = data.get("id")
        user_name = data.get("kakao_account").get("profile").get("nickname")
        profile_img = data.get("kakao_account").get("profile").get("profile_image_url")
        gender = data.get("kakao_account").get("gender")

        # 토큰 생성
        token = create_access_token(identity = kakao_id_number)

        # DB에 유저 정보가 있는지 확인
        # user = UserDocument.objects.get(kakao_id_number = kakao_id_number)

        # 유저가 로그인한 이력이 있는 경우, 닉네임 변경시 갱신
        if UserDocument.objects(kakao_id_number = kakao_id_number):
            UserDocument.objects(kakao_id_number = kakao_id_number).modify(
                user_name = user_name,
                profile_img = profile_img,
            )
            return jsonify(status = 200, token = token, user = "true")

        # 유저가 로그인한 이력이 없는 경우 DB에 유저 정보 저장
        else:
            user_info = UserDocument(
                user_name = user_name,
                kakao_id_number = kakao_id_number,
                profile_img = profile_img,
                agreement = "false",
                gender = gender
            )
            user_info.save()
            return jsonify(status = 200, token = token, user = "false") #처음 로그인

    except KeyError:
        return make_response({"message" : "INVALID_TOKEN"}, 400)

    except access_token.DoesNotExist:
        return make_response({"message" : "INVALID_TOKEN"}, 400)

@kakaoOauth.route("/protected")
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    if current_user:
        return jsonify(
            status = 200,
            logged_in_as = current_user
        )
    else:
        return jsonify(
            status = 400,
            error = "access_token is expired"
        )
