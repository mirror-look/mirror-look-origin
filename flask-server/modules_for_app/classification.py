import os
from flask import Blueprint, jsonify, request, redirect, url_for
# from flask_jwt_extened import jwt_required
from werkzeug.utils import secure_filename
from prediction import get_prediction
from object_detection import object_detection
from config import UPLOAD_FOLDER

labelsPath = '/home/azure/passion/AI/YOLOv3/deepfashion2yolov3model/df2.names'
weightsPath = '/home/azure/passion/AI/YOLOv3/deepfashion2yolov3model/yolov3-df2_15000.weights'
configPath = '/home/azure/passion/AI/YOLOv3/deepfashion2yolov3model/yolov3-df2.cfg'

# Blueprint
classification = Blueprint("classification", __name__, url_prefix='/classification')

@classification.route('/upload', methods=['GET', 'POST'])
# @jwt_required()
def upload_file():
    if request.method == 'POST':
        upload_file = request.files['file']
        image_path = UPLOAD_FOLDER + "/" + secure_filename(upload_file.filename)
        upload_file.save(image_path)
        labels, paths = object_detection(image_path, labelsPath, weightsPath, configPath)
        # print(labels) ['long_sleeve_top', 'skirt']
        # print(paths) ['/home/azure/passion/flask-server/object_detected_image/long_sleeve_top_1_0.7096048.jpg', '/home/azure/passion/flask-server/object_detected_image/skirt_2_0.8293095.jpg']
        top_3_result = []
        # top_5_result = []
        for idx, path in enumerate(paths):
            top_3_prediction, top_5_prediction = get_prediction(path)
            temp_3 = {labels[idx]: top_3_prediction}
            # temp_5 = {labels[idx]: top_5_prediction}
            # print(temp)
            top_3_result.append(temp_3)
            # top_5_result.append(temp_5)

        result = {
                'original_image_path' : image_path,
                'top_3_result' : top_3_result
            }

        print(top_3_result)

        return jsonify(
            status=200,
            result=result
        )

    return jsonify(
        status=200
    )







    # if request.method == 'POST':
    #     upload_file = request.get_json('file')
    #     if upload_file.filename != '':
    #         image_path = os.path.join('static', upload_file.filename)
    #         upload_file.save(image_path)
    #         predictions = get_prediction(image_path)

    #         result = {
    #             'predictions': predictions,
    #             'image_path': image_path,
    #         }
    #         return jsonify(
    #             status=200,
    #             result=result
    #         )
    #     else:
    #         return jsonify(
    #             status=400,
    #             error='There is no image file'
    #         )
    # return jsonify(
    #     status=200
    # )
