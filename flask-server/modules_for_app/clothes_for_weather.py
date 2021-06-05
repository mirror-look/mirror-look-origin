from collections import defaultdict

clothes_by_category = {
    'top': [
        'sling',
        'vest',
        'short_sleeve_top',
        'long_sleeve_top'
    ],

    'outwear': [
        'short_sleeve_outwear',
        'long_sleeve_outwear'
    ],


    'bottom': [
        'skirt',
        'shorts',
        'trousers'
    ],

    'dress': [
        'short_sleeve_dress',
        'long_sleeve_dress',
        'vest_dress',
        'sling_dress'
    ]
}

clothes_by_temperature = {
    'top': {
        'long_sleeve_top': [17, 22],
        'short_sleeve_top': [22, 27],
        'vest': [27, 99],
        'sling': [27, 99],
    },

    'outwear': {
        'long_sleeve_outwear': [-10, 16],
        'short_sleeve_outwear': [16, 23]
    },

    'bottom': {
        'trousers': [-10, 20],
        'skirt': [6, 16],
        'shorts': [18, 99]
    },

    'dress': {
        'long_sleeve_dress': [12, 23],
        'short_sleeve_dress': [23, 27],
        'vest_dress': [27, 99],
        'sling_dress': [27, 99]
    }
}

clothes_for_recommend = {
    'top': {
        5: ["두꺼운 니트", "히트택"],
        9: ["두꺼운 니트"],
        11: ["니트", "후드티"],
        12: ["셔츠", '니트', "후드티"],
        17: ["얇은 니트", "얇은 후드티", "맨투맨"],
        20: ["긴팔티", "얇은 후드티"],
        23: ["반팔티", "얇은 셔츠"],
        27: ["반팔티", "나시티", "민소매"],
    },

    'outwear': {
        5: ["야상", "패딩"],
        9: ["코트"],
        11: ["트렌치 코트", "간절기 야상"],
        12: ["자켓", "가디건", "간절기 야상"],
        17: ["가디건"],
        20: ["얇은 가디건"],
        23: ["여름용 가디건"],
        27: ["여름용 가디건"],
    },

    'bottom': {
        5: ["두꺼운 바지", "히트택"],
        9: ["청바지"],
        11: ["청바지"],
        12: ["살색 스타킹", "청바지"],
        17: ["청바지", "면바지", "슬렉스"],
        20: ["면바지", "슬랙스", "스키니"],
        23: ["반바지", "면바지"],
        27: ["반바지"],
    },

    'dress': {
        5: ["겨울용 원피스", "히트택"],
        9: ["두꺼운 원피스"],
        11: ["두꺼운 원피스"],
        12: ["원피스"],
        17: ["원피스"],
        20: ["얇은 원피스"],
        23: ["반팔 원피스"],
        27: ["민소매 원피스"],
    }
}

# test
laundry_recommend = {
    "세탁방법 1" : {"옷 종류"},
    "세탁방법 2" : {"옷 종류"}
}

def user_clothes_by_category(user_clothes_on_fit):
    user_clothes_on_fit_by_category = list()
    for user_cloth in user_clothes_on_fit:
        for category in clothes_by_category:
            if user_cloth in clothes_by_category[category]:
                user_clothes_on_fit_by_category.append(category)

    return user_clothes_on_fit_by_category


def clothes_for_weather(categories, temperature):
    clothes_suitable_for_weather = list()
    for category in categories:
        for clothes in clothes_by_temperature[category]:
            temperature_range = clothes_by_temperature[category][clothes]
            if temperature_range[0] <= temperature < temperature_range[1]:
                clothes_suitable_for_weather.append(clothes)
    return clothes_suitable_for_weather


def recommend_clothes(temperature, categories):
    recommended_clothes_by_category = defaultdict()

    for category in categories:
        for temperature_range in clothes_for_recommend[category]:
            if temperature > temperature_range:
                continue
            else:
                recommended_clothes_by_category[category] = clothes_for_recommend[category][temperature_range]
                break

    return recommended_clothes_by_category


def say_hot_or_cold(user_clothes_on_fit, temperature, categories):
    result = dict()
    for cloth, category in zip(user_clothes_on_fit, categories):
        if clothes_by_temperature[category][cloth][0] > temperature:
            result[category + '_' + cloth] = '지금 입기는 추워요'
        elif clothes_by_temperature[category][cloth][1] < temperature:
            result[category + '_' + cloth] = '지금 입기는 더워요'
        else:
            result[category + '_' + cloth] = '지금 날씨에 적당해요'

    return result


if __name__ == '__main__':
    temperature_for_test = 10
    user_clothes_on_fit_for_test = ['short_sleeve_top', "shorts"]

    user_clothes_on_fit_by_category = user_clothes_by_category(
        user_clothes_on_fit_for_test)

    clothes_suitable_for_weather = clothes_for_weather(
        user_clothes_on_fit_by_category, temperature_for_test)

    recommended_clothes = recommend_clothes(
        temperature_for_test, user_clothes_on_fit_by_category)

    print(dict(recommended_clothes), say_hot_or_cold(
        user_clothes_on_fit_for_test, temperature_for_test, user_clothes_on_fit_by_category), sep='\n')
