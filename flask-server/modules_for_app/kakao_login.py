logged_in_as = '고길동'


def kakao_user_info(logged_in_as):
    user_name = logged_in_as
    profile_img = 'get/img_path/from/kakao_login_api'
    kakao_id_number = 'kakao_id_number3/from/kakao_login_api'

    # mongoDB Document 파일 형식으로 return
    return {
        'user_name': user_name,
        'kakao_id_number': kakao_id_number,
        'profile_img': profile_img
    }
