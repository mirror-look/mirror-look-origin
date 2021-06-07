import json

with open('/data/Deepfashion-high/In-shop/Anno/list_description_inshop.json') as f:
    data = json.load(f)

laundry_label = []

for d in data:
    tmp = d['description']
    if len(tmp) != 0:
        laundry_label.append(tmp[-2])

print(laundry_label)

# laundry_label_count = {}

# for label in laundry_label:
#     if label not in laundry_label_count:
#         laundry_label_count[label] = 1
#     else:
#         laundry_label_count[label] += 1

# print(laundry_label_count)

# print(len(laundry_label_count.keys()))

# sorted_count = sorted(laundry_label_count.items(), key=lambda x: x[1], reverse=True)
# print(sorted_count)

# {'item': 'id_00007982',
# 'color': 'Cream-black',
# 'description': ["We love classics that are updated for the modern fashionista and this blazer is just that. Unique details like an open-front with contrast trim and subtle darting make for a stylish flair, but with padded shoulders and front mock pockets, it's still sharp enough for any occasion that requires a dose of business-wear. Pair it with a polished tote bag to finish your smart ensemble. ",
# 'Long sleeves',
# 'Lightweight stretch-knit',
# '77% polyester, 19% rayon, 4% spandex',
# '26.5" full length, 36" chest, 36" waist, 23.25" sleeve length',
# 'Measured from Small',
# 'Dry clean',
# 'Imported']}
