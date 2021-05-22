import tensorflow as tf

def get_prediction(image_path):

    import pdb; pdb.set_trace()
    img = tf.keras.preprocessing.image.load_img(
        image_path,
        target_size=[224, 224],
        color_mode='rgb'
    )

    img = tf.keras.preprocessing.image.img_to_array(img)
    img = abs(img - 255.)
    img = img / 255.
    input_data = tf.expand_dims(img, axis=0)

    interpreter = tf.lite.Interpreter(model_path='/home/azure/passion/flask-server/models/my_checkpoint4serving.tflite')
    interpreter.allocate_tensors()

    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    input_shape = input_details[0]['shape']
    print(input_shape)

    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    print(output_details[0].keys())
    print(output_details[0]['shape'])

    output_data = interpreter.get_tensor(output_details[0]['index'])
    print(output_data)

    results = dict()

    for label, prob in enumerate(output_data[0]):
        results[label] = prob

    results = sorted(results.items(), key=lambda x: x[1], reverse=True)

    return results

# # class indices of train dataset:
# # {'Anorak': 0, 'Blazer': 1, 'Blouse': 2, 'Bomber': 3, 'Button-Down': 4, 'Caftan': 5,
# # 'Cape': 6, 'Capris': 7, 'Cardigan': 8, 'Chinos': 9, 'Coat': 10,
# # 'Coverup': 11, 'Culottes': 12, 'Cutoffs': 13, 'Dress': 14, 'Flannel': 15,
# # 'Gauchos': 16, 'Halter': 17, 'Henley': 18, 'Hoodie': 19, 'Jacket': 20,
# # 'Jeans': 21, 'Jeggings': 22, 'Jersey': 23, 'Jodhpurs': 24, 'Joggers': 25,
# # 'Jumpsuit': 26, 'Kaftan': 27, 'Kimono': 28, 'Leggings': 29, 'Nightdress': 30,
# # 'Onesie': 31, 'Parka': 32, 'Peacoat': 33, 'Poncho': 34, 'Robe': 35,
# # 'Romper': 36, 'Sarong': 37, 'Shirtdress': 38, 'Shorts': 39, 'Skirt': 40,
# # 'Sundress': 41, 'Sweater': 42, 'Sweatpants': 43, 'Sweatshorts': 44, 'Tank': 45,
# # 'Tee': 46, 'Top': 47, 'Trunks': 48, 'Turtleneck': 49}

image_path = '/home/azure/passion/flask-server/ootd_storage/3c15427e-9bdd-44ca-9e1b-6e972711d692.png'
results = get_prediction(image_path)
print(results)
