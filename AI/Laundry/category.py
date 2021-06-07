dataset_path = '/data/Deepfashion-high/dataset'
dataset_train_path = '/data/Deepfashion-high/dataset/train'
dataset_val_path = '/data/Deepfashion-high/dataset/validation'
dataset_test_path = '/data/Deepfashion-high/dataset/test'

# img/WOMEN/Blouses_Shirts/id_00000001/02_1_front.jpg

def get_category_names():
    women_category_names = {}
    men_category_names = {}
    with open('/data/Deepfashion-high/Anno/list_bbox_inshop.txt') as file_list_category_cloth:
        next(file_list_category_cloth)
        next(file_list_category_cloth)
        for line in file_list_category_cloth:
            category_name = line.split('/')[2]
            if line.split('/')[1] == 'WOMEN':
                if category_name not in women_category_names:
                    women_category_names[category_name] = 0
                else:
                    women_category_names[category_name] += 1
            else:
                if category_name not in men_category_names:
                    men_category_names[category_name] = 0
                else:
                    men_category_names[category_name] += 1


    return women_category_names, men_category_names

women_category_names, men_category_names = get_category_names()

women_category_names = sorted(women_category_names.items(), key=lambda x: x[1], reverse=True)
men_category_names = sorted(men_category_names.items(), key=lambda x: x[1], reverse=True)

print('WOMEN_CATEGORY_NAMES: ', women_category_names)
print('MEN_CATEGORY_NAMES: ', men_category_names)

# WOMEN_CATEGORY_NAMES:  [('Tees_Tanks', 11641), ('Blouses_Shirts', 7963), ('Dresses', 6998), ('Shorts', 3475), ('Sweaters', 3035), ('Skirts', 2044), ('Jackets_Coats', 1894), ('Pants', 1803), ('Rompers_Jumpsuits', 1695), ('Cardigans', 1435), ('Graphic_Tees', 1296), ('Sweatshirts_Hoodies', 855), ('Denim', 392), ('Leggings', 334)]
# MEN_CATEGORY_NAMES:  [('Tees_Tanks', 2844), ('Pants', 1016), ('Shorts', 999), ('Sweatshirts_Hoodies', 774), ('Shirts_Polos', 721), ('Sweaters', 604), ('Jackets_Vests', 423), ('Denim', 410), ('Suiting', 38)]

women_category = []

for i in women_category_names:
    category, _ = i
    women_category.append(category)

men_category = []

for i in men_category_names:
    category, _ = i
    men_category.append(category)

print(women_category)
# ['Tees_Tanks', 'Blouses_Shirts', 'Dresses', 'Shorts', 'Sweaters', 'Skirts', 'Jackets_Coats', 'Pants', 'Rompers_Jumpsuits', 'Cardigans', 'Graphic_Tees', 'Sweatshirts_Hoodies', 'Denim', 'Leggings']
print(men_category)
# ['Tees_Tanks', 'Pants', 'Shorts', 'Sweatshirts_Hoodies', 'Shirts_Polos', 'Sweaters', 'Jackets_Vests', 'Denim', 'Suiting']
