from flask import Blueprint, request, redirect, render_template, jsonify, make_response
import requests

kakaoOauth = Blueprint("kakaoOauth", __name__, url_prefix="/kakaoOauth")

logged_in_as = '둘리'


def kakao_user_info(logged_in_as):
    user_name = logged_in_as
    profile_img = 'get/img_path3/from/kakao_login_api'
    kakao_id_number = 'kakao_id_number1/from/kakao_login_api'

    # mongoDB Document 파일 형식으로 return
    return {
        'user_name': user_name,
        'kakao_id_number': kakao_id_number,
        'profile_img': profile_img
    }


@kakaoOauth.route("/")
def hello():
    return render_template('test.html')


@kakaoOauth.route("/login")
def login():
    client_id = '7309b55a4ab46dd5a5936237e6c2fc95'
    redirect_uri = "http://127.0.0.1:5000/kakaoOauth/callback"
    kakao_oauthurl = f"https://kauth.kakao.com/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code"
    return redirect(kakao_oauthurl)


@kakaoOauth.route("/callback")  # 위 라우팅에서 redirect 됨
def callback():
    try:
        code = request.args.get("code")  # callback 뒤에 붙어오는 request token
        client_id = '7309b55a4ab46dd5a5936237e6c2fc95'
        redirect_uri = "http://127.0.0.1:5000/kakaoOauth/callback"
        print(code)
        # Python에서 HTTP 요청을 보내는 모듈인 requests
        token_request = requests.get(
            f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&redirect_uri={redirect_uri}&code={code}"
        )
        # 위의 get 요청을 통해 받아온 데이터를 json화 해주면 이곳에 access token이 존재
        token_json = token_request.json()
        error = token_json.get("error", None)
        if error is not None:
            return make_response({"message": "INVALID_CODE"}, 400)  # 에러 처리
        # 카카오 소셜로그인을 통해 유저에 대한 정보를 받을 권한이 있는 토큰
        access_token = token_json.get("access_token")
        # access token 받아오는 통신

        # access token 기반으로 유저 정보 요청하는 통신
        profile_request = requests.get(
            "https://kapi.kakao.com/v2/user/me", headers={"Authorization": f"Bearer {access_token}"},
        )
        data = profile_request.json()
    except KeyError:
        return make_response({"message": "INVALID_TOKEN"}, 400)

    except access_token.DoesNotExist:
        return make_response({"message": "INVALID_TOKEN"}, 400)

    return jsonify(status=200, data=data)


@kakaoOauth.route("/logout")
def logout():
    code = request.args.get("code")
    client_id = '7309b55a4ab46dd5a5936237e6c2fc95'
    redirect_uri = "http://127.0.0.1:5000/kakaoOauth/callback"

    token_request = requests.post(
        f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&redirect_uri={redirect_uri}&code={code}"
    )
    token_json = token_request.json()
    error = token_json.get("error", None)
    if error is not None:
        return make_response({"message": "INVALID_CODE"}, 400)  # 에러 처리
    access_token = token_json.get("access_token")
    profile_request = requests.get(
        "https://kapi.kakao.com/v1/user/logout", headers={"Authorization": f"Bearer {access_token}"},
    )
    data = profile_request.json()

    return jsonify(status=200, data=data)
