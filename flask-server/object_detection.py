import cv2
from PIL import ImageFont, ImageDraw, Image
import numpy as np
import time
import os
from config import DETECTED_IMAGE_FOLDER
from tensorflow.keras.models import load_model

# config.py에 추가해서 경로 숨기기
# DETECTED_IMAGE_FOLDER
# modal_path
# labelsPath
# weightsPath
# configPath

def object_detection(image_path, labelsPath, weightsPath, configPath, DETECTED_IMAGE_FOLDER):

    # YOLO 라벨(Clothes)
    YOLO_LABELS = open(labelsPath).read().strip().split("\n")

    # YOLO 모델 호출
    yolo_net = cv2.dnn.readNetFromDarknet(configPath, weightsPath)

    # YOLO 출력층 설정
    layer_names = yolo_net.getLayerNames()
    # print(layer_names)
    # print(len(layer_names))
    output_layers = [layer_names[i[0] - 1] for i in yolo_net.getUnconnectedOutLayers()]
    # print('output_layer name: ', output_layers)

    # colors = np.random.uniform(0, 255, size=(len(YOLO_LABELS), 3))

    # 영상 할당
    file_path = image_path
    # cap = cv2.VideoCapture(file_path)
    img = cv2.imread(file_path)
    cap = cv2.cvtColor(img, cv2.COLOR_RGBA2RGB)
    # print(cap)

    # 화면 폰트
    # font = cv2.FONT_HERSHEY_SIMPLEX

    # _, frame = cap.read()
    height, width, channels = cap.shape
    # print(cap.shape)

    # Detecting objects
    blob = cv2.dnn.blobFromImage(cap, 1/255, (224, 224), (0, 0, 0), True, crop=False)

    # print('type: ', type(blob))
    # print('shape: ', blob.shape)
    # print('size: ', blob.size)


    yolo_net.setInput(blob)
    outs = yolo_net.forward(output_layers)

    # Showing informations on the screen
    count = 0
    class_ids = []
    confidences = []
    boxes = []
    crop_labels = []
    crop_img_paths = []
    for out in outs:
        for detection in out:
            # print(detection)
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.2:
                count += 1
                # Object detected
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                ww = int(detection[2] * width)
                hh = int(detection[3] * height)

                # Rectangle coordinates
                xx = int(center_x - ww / 2)
                yy = int(center_y - hh / 2)

                boxes.append([xx, yy, ww, hh])
                confidences.append(float(confidence))
                class_ids.append(class_id)

                # object detection된 이미지의 object detection label
                crop_label = YOLO_LABELS[class_id]
                # print(crop_label)
                # print(confidence)

                crop_img = cap[yy:yy + hh, xx:xx + hh]
                crop_img_path = DETECTED_IMAGE_FOLDER + '/' + crop_label + "_" + str(count) + "_" + str(confidence) + ".jpg"

                try:
                    cv2.imwrite(crop_img_path, crop_img)
                    if crop_label not in crop_labels:
                        crop_labels.append(crop_label)
                        crop_img_paths.append(crop_img_path)
                except cv2.error as e:
                    print("There is no cropped image")

    print(crop_labels)
    print(crop_img_paths)

    return crop_labels, crop_img_paths

# image_path = '/home/azure/passion/AI/YOLOv3/static/blouse3.jpg'
# labelsPath = '/home/azure/passion/AI/YOLOv3/deepfashion2yolov3model/df2.names'
# weightsPath = '/home/azure/passion/AI/YOLOv3/deepfashion2yolov3model/yolov3-df2_15000.weights'
# configPath = '/home/azure/passion/AI/YOLOv3/deepfashion2yolov3model/yolov3-df2.cfg'
# DETECTED_IMAGE_FOLDER = '/home/azure/passion/flask-server/object_detected_image'

# labels, paths = object_detection(image_path, labelsPath, weightsPath, configPath, DETECTED_IMAGE_FOLDER)

# print(labels)
# print(paths)
