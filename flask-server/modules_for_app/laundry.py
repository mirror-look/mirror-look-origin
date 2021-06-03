from collections import defaultdict

clothes_by_category = {
    'top': [
        'sling'
        'vest',
        'short_sleeve_top',
        'long_sleeve_top',
    ],

    'outwear': [
        'short_sleeve_outwear',
        'long_sleeve_outwear'
    ],


    'bottom': [
        'skirt'
        'shorts',
        'trousers',
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
        'long_sleeve_top': [17, 22],  # 25
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
            if temperature in range(clothes_by_temperature[category][clothes][0], clothes_by_temperature[category][clothes][1]):
                clothes_suitable_for_weather.append(clothes)
    return clothes_suitable_for_weather

# def say_hot_or_cold:(user_clothes_on_fit, temperature, categories):
#     clothes_that_look_cold, clothes_that_look_hot = list(), list()

#     for user_cloth in user_clothes_on_fit:

    return


def recommend_clothes(temperature, user_clothes_on_fit):

    return


if __name__ == '__main__':
    temperature_for_test = 25
    user_clothes_on_fit_for_test = ['long_sleeve_top', 'trousers']

    user_clothes_on_fit_by_category = user_clothes_by_category(
        user_clothes_on_fit_for_test)

    clothes_suitable_for_weather = clothes_for_weather(
        user_clothes_on_fit_by_category, temperature_for_test)

    #

    print(clothes_suitable_for_weather)
