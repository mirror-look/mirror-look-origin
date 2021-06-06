import os
import binascii
import base64
import random
from flask import Blueprint, jsonify, request, redirect, url_for
# from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from prediction import get_prediction
from object_detection import object_detection
from .models import UserDocument, UserSchema
from config import UPLOAD_FOLDER, DETECTED_IMAGE_FOLDER, model_path, labelsPath, weightsPath, configPath

from app import get_database

# DB 및 Collection 연결
database = get_database()

# Blueprint
classification = Blueprint("classification", __name__, url_prefix='/classification')

@classification.route('/upload', methods=['GET', 'POST'])
# @jwt_required()
def upload_file():
    if request.method == 'POST':
        # kakao_id = get_jwt_identity()
        kakao_id = 1757786245
        print('kakao id: ', kakao_id)

        user = UserDocument.objects.get(kakao_id_number=kakao_id)
        user_gender = user.gender
        print('user_gender: ', user_gender)

        image_base64 = request.get_json()['image_base64']
        # print(image_base64)
        random_num = int(binascii.hexlify(os.urandom(3)), 16)
        image_path = UPLOAD_FOLDER + '/' + str(random_num) + '.jpg'
        decoded_image = base64.b64decode(image_base64)
        with open(image_path, 'wb') as f:
            f.write(decoded_image)
        labels, paths = object_detection(image_path, labelsPath, weightsPath, configPath, DETECTED_IMAGE_FOLDER, user_gender)
        top_3_result = []
        # top_5_result = []
        for idx, path in enumerate(paths):
            top_3_prediction = get_prediction(path, model_path, user_gender) # ['Blouse-Shirts', 'Tee', 'Jacket']
            # temp_3 = {labels[idx]: top_3_prediction}
            temp_3 = [labels[idx], top_3_prediction[0], top_3_prediction[1], top_3_prediction[2]]
            # temp_5 = {labels[idx]: top_5_prediction}
            # print(temp)
            top_3_result.append(temp_3)
            # top_5_result.append(temp_5)

        result = {
                'original_image_path' : image_path,
                'top_3_result' : top_3_result
            }

        print(result)

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
