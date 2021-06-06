import tensorflow as tf

def get_prediction(image_path, model_path, user_gender):

    user_gender = user_gender

    img = tf.keras.preprocessing.image.load_img(
        image_path,
        target_size=[224, 224],
        color_mode='rgb'
    )

    img = tf.keras.preprocessing.image.img_to_array(img)
    img = abs(img - 255.)
    img = img / 255.
    input_data = tf.expand_dims(img, axis=0)

    interpreter = tf.lite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()

    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    # print("input_details: ", input_details)
    # print("output_details: ", output_details)

    input_shape = input_details[0]['shape']
    # print("input_shape: ", input_shape)

    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    # print("output_details_keys: ", output_details[0].keys())
    # print("output_details_shape: ", output_details[0]['shape'])

    output_data = interpreter.get_tensor(output_details[0]['index'])
    # print("output_data: ", output_data)
    if user_gender == 'female':
        class_indices = {'Blazer': 0, 'Blouse-Shirts': 1, 'Cardigan': 2, 'Coat': 3, 'Cottonpants': 4, 'Cutoffs': 5, 'Dress': 6, 'Hoodie': 7, 'Jacket': 8, 'Jeans': 9, 'Joggers': 10, 'Jumpsuit-Romper': 11, 'Leggings': 12, 'Parka': 13, 'Shorts': 14, 'Skirt': 15, 'Sweater': 16, 'Sweatpants': 17, 'Tee': 18}
    else:
        class_indices = {'Blazer': 0, 'Shirts': 1, 'Cardigan': 2, 'Coat': 3, 'Cottonpants': 4, 'Cutoffs': 5, 'Dress': 6, 'Hoodie': 7, 'Jacket': 8, 'Jeans': 9, 'Joggers': 10, 'Jumpsuit-Romper': 11, 'Leggings': 12, 'Parka': 13, 'Shorts': 14, 'Pants': 15, 'Sweater': 16, 'Sweatpants': 17, 'Tee': 18}

    new_class_indices = {}

    for k,v in class_indices.items():
        new_class_indices[v] = k

    # print(new_class_indices)

    results = dict()

    for label, prob in enumerate(output_data[0]):
        results[new_class_indices[label]] = prob

    results = sorted(results.items(), key=lambda x: x[1], reverse=True)

    tmp = results[:5]

    top_3_results = []

    for i in tmp[:3]:
        label, pred = i
        t = label
        top_3_results.append(t)

    # top_5_results = []

    # for i in tmp:
    #     label, pred = i
    #     t = label
    #     top_5_results.append(t)

    # print(top_3_results)

    return top_3_results

# image_path = '/home/azure/passion/flask-server/ootd_storage/42142123.jpg'
# model_path = '/home/azure/passion/AI/Demo/output/resnet50_model_serving2.tflite'
# results = get_prediction(image_path, model_path)
# print(results)
