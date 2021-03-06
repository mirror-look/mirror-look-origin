import tensorflow as tf

def get_prediction(image_path):

    img = tf.keras.preprocessing.image.load_img(
        image_path,
        target_size=[224, 224],
        color_mode='rgb'
    )

    img = tf.keras.preprocessing.image.img_to_array(img)
    img = abs(img - 255.)
    img = img / 255.
    input_data = tf.expand_dims(img, axis=0)

    interpreter = tf.lite.Interpreter(model_path='/home/azure/passion/AI/CategoryandAttributePredictionBenchmark/dataset/output/my_checkpoint6serving.tflite')
    interpreter.allocate_tensors()

    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    print("input_details: ", input_details)
    print("output_details: ", output_details)

    input_shape = input_details[0]['shape']
    print("input_shape: ", input_shape)

    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    print("output_details_keys: ", output_details[0].keys())
    print("output_details_shape: ", output_details[0]['shape'])

    output_data = interpreter.get_tensor(output_details[0]['index'])
    print("output_data: ", output_data)

    # class_indices = {'Blazer': 0, 'Blouse': 1, 'Cardigan': 2, 'Coat': 3,
    #                 'Cutoffs': 4, 'Dress': 5, 'Hoodie': 6, 'Jacket': 7,
    #                 'Jeans': 8, 'Joggers': 9, 'Jumpsuit': 10, 'Leggings': 11,
    #                 'Nightdress': 12, 'Parka': 13, 'Poncho': 14, 'Romper': 15,
    #                 'Shirtdress': 16, 'Shirts': 17, 'Shorts': 18, 'Skirt': 19,
    #                 'Sundress': 20, 'Sweater': 21, 'Tank': 22, 'Tee': 23,
    #                 'Top': 24, 'Trunks': 25
    #                 }

    class_indices = {'Blazer' : 0, 'Cardigan' : 1, 'Coat' : 2, 'Cutoffs' : 3, 'Dress' : 4,
    'Hoodie' : 5, 'Jacket' : 6, 'Jeans' : 7, 'Joggers' : 8, 'Jumpsuit' : 9, 'Leggings' : 10,
    'Parka' : 11, 'Romper' : 12, 'Shirts' : 13, 'Shorts' : 14, 'Sweater' : 15, 'Tank' : 16, 'Top' : 17, 'Trunks' : 18}

    new_class_indices = {}

    for k,v in class_indices.items():
        new_class_indices[v] = k

    # print(new_class_indices)

    results = dict()

    for label, prob in enumerate(output_data[0]):
        results[new_class_indices[label]] = prob

    results = sorted(results.items(), key=lambda x: x[1], reverse=True)

    return results

# class indices of test dataset:
# {'Blazer': 0, 'Blouse': 1, 'Cardigan': 2, 'Coat': 3,
# 'Cutoffs': 4, 'Dress': 5, 'Hoodie': 6, 'Jacket': 7,
# 'Jeans': 8, 'Joggers': 9, 'Jumpsuit': 10, 'Leggings': 11,
# 'Nightdress': 12, 'Parka': 13, 'Poncho': 14, 'Romper': 15,
# 'Shirtdress': 16, 'Shirts': 17, 'Shorts': 18, 'Skirt': 19,
# 'Sundress': 20, 'Sweater': 21, 'Tank': 22, 'Tee': 23,
# 'Top': 24, 'Trunks': 25}

image_path = '/home/azure/passion/AI/YOLOv3/image/trousers_2_0.962722.jpg'
results = get_prediction(image_path)
print(results)
