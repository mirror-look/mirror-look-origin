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

    interpreter = tf.lite.Interpreter(model_path='/home/azure/passion/AI/Category and Attribute Prediction Benchmark/dataset/output/my_checkpoint3.tflite')
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

image_path = '/home/azure/passion/AI/Category and Attribute Prediction Benchmark/dataset/test/Button-Down/Classic_Collared_Button-Down_img_00000004_gt_34-69-185-271_iou_1.0.jpg'
results = get_prediction(image_path)
print(results)
