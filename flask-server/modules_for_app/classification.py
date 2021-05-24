import os
from flask import Blueprint, jsonify, request, redirect, url_for
from werkzeug.utils import secure_filename
from prediction import get_prediction
from config import UPLOAD_FOLDER

# Blueprint
classification = Blueprint("classification", __name__, url_prefix='/classification')

@classification.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        upload_file = request.files['file']
        image_path = UPLOAD_FOLDER + "/" + secure_filename(upload_file.filename)
        upload_file.save(image_path)
        predictions = get_prediction(image_path)
        # print(predictions)

        result = []

        for rank in predictions:
            class_name, _  = rank
            result.append(class_name)

        # result = {
        #     'predictions': predictions,
        #     'image_path': image_path
        # }

        print(result[:3])

        return jsonify(
            status=200,
            result=result[:3]
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
