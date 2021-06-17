laundry_recommend = {
    'Blazer': ['드라이클리닝'],
    'Blouse-Shirts': ['드라이클리닝', '찬물 손세탁', '세탁 망에 넣은 후 세탁기 별도의 셔츠 모드 사용'],
    'Shirts': ['드라이클리닝', '찬물 손세탁', '세탁 망에 넣은 후 세탁기 별도의 셔츠 모드 사용'],
    'Cardigan': ['미온수에 중성세제로 손 세탁', '뒤집고 세탁 망에 넣은 후 울 코스로 세탁기 사용'],
    'Coat': ['드라이클리닝', '찬물에 샴푸와 식초 또는 중성세제를 이용해 손세탁'],
    'Cottonpants': ['손 세탁', '세탁기로 울 세탁'],
    'Cutoffs': ['세탁기 사용'],
    'Dress': ['미온수에 중성세제로 손 세탁'],
    'Hoodie': ['세탁기 사용'],
    'Jacket': ['드라이클리닝'],
    'Jeans': ['중성세제를 푼 찬물에 청바지를 담근 뒤 가볍게 손으로 주물러 주고, 뒤집어서도 반복', '물빠짐을 예방하려면 소금물(1:10)로 세탁'],
    'Joggers': ['손 세탁', '세탁기로 울 세탁'],
    'Jumpsuit-Romper': ['30도이하 찬물세탁'],
    'Leggings': ['세탁 망에 넣고 세탁기 사용', '찬물 손세탁'],
    'Parka': ['30도 정도의 미온수에 울 샴푸와 같은 중성세제를 풀어 최대한 빨리 손으로 주물러 세탁'],
    'Shorts': ['세탁기 사용'],
    'Skirt': ['세탁기 사용'],
    'Sweater': ['미온수에 중성세제로 손 세탁', '세탁 망에 넣은 후 울 코스로 세탁기 사용'],
    'Sweatpants': ['미온수에 중성세제로 손 세탁', '세탁 망에 넣은 후 울 코스로 세탁기 사용'],
    'Tee': ['세탁기 사용'],
    'Pants': ['손 세탁', '세탁기로 울 세탁']
}


def recommend_laundry(user_clothes_on_fit):
    recommended = dict()
    for cloth in user_clothes_on_fit:
        recommended[cloth] = laundry_recommend[cloth]
    return recommended


if __name__ == '__main__':
    user_clothes_on_fit_for_test = ['Sweater', 'Shorts']

    a = recommend_laundry(user_clothes_on_fit_for_test)

    print(a)
