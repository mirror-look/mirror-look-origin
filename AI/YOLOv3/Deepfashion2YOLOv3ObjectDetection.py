import cv2
from PIL import ImageFont, ImageDraw, Image
import numpy as np
import time
import os
from tensorflow.keras.models import load_model

# config.py에 추가해서 경로 숨기기
# UPLOAD_FOLDER
# labelsPath
# weightsPath
# configPath

def object_detection(image_path, labelsPath, weightsPath, configPath):

    # YOLO 라벨(Clothes)
    YOLO_LABELS = open(labelsPath).read().strip().split("\n")

    # YOLO 모델 호출
    yolo_net = cv2.dnn.readNetFromDarknet(configPath, weightsPath)

    # YOLO 출력층 설정
    layer_names = yolo_net.getLayerNames()
    output_layers = [layer_names[i[0] - 1] for i in yolo_net.getUnconnectedOutLayers()]
    colors = np.random.uniform(0, 255, size=(len(YOLO_LABELS), 3))

    # 영상 할당
    file_path = image_path
    cap = cv2.VideoCapture(file_path)

    # 화면 폰트
    font = cv2.FONT_HERSHEY_SIMPLEX

    _, frame = cap.read()
    height, width, channels = frame.shape

    # Detecting objects
    blob = cv2.dnn.blobFromImage(frame, 0.00392, (416, 416), (0, 0, 0), True, crop=False)

    yolo_net.setInput(blob)
    outs = yolo_net.forward(output_layers)

    # Showing informations on the screen
    count = 0
    class_ids = []
    confidences = []
    boxes = []
    crop_labels = {}
    for out in outs:
        for detection in out:
            # print(detection)
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5:
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
                print(crop_label)
                print(confidence)

                # object detection된 이미지 중 label이 중복된 값이 있다면 confidence가 높은 이미지 채택
                crop_labels[crop_label] = confidence

                crop_img = frame[yy:yy + hh, xx:xx + hh]
                cv2.imwrite('/home/azure/passion/AI/YOLOv3/image/' +  crop_label + "_" + str(count) + "_" + str(confidence) + ".jpg", crop_img)

    return crop_labels

image_path = '/home/azure/passion/AI/CategoryandAttributePredictionBenchmark/static/shirtsshorts.jpg'
labelsPath = '/home/azure/passion/AI/YOLOv3/deepfashion2yolov3model/df2.names'
weightsPath = '/home/azure/passion/AI/YOLOv3/deepfashion2yolov3model/yolov3-df2_15000.weights'
configPath = '/home/azure/passion/AI/YOLOv3/deepfashion2yolov3model/yolov3-df2.cfg'

object_detection_result = object_detection(image_path, labelsPath, weightsPath, configPath)

print(object_detection_result)
