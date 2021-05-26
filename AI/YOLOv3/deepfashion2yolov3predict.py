import cv2
from PIL import ImageFont, ImageDraw, Image
from matplotlib import pyplot as plt
import numpy as np
import time
import os
from tensorflow.keras.models import load_model

# YOLO 설정 파일 Path
# labelsPath = os.getcwd()+"\\coco.names" # Hand 라벨
# weightsPath = os.getcwd()+"\\yolov3_final.weights" # 가중치
# configPath = os.getcwd()+"\\yolov3_final.cfg" # 모델 구성
labelsPath = '/home/azure/passion/AI/YOLOv3/deepfashion2yolov3model/df2.names'
weightsPath = '/home/azure/passion/AI/YOLOv3/deepfashion2yolov3model/yolov3-df2_15000.weights'
configPath = '/home/azure/passion/AI/YOLOv3/deepfashion2yolov3model/yolov3-df2.cfg'

# YOLO 라벨(hand) 호출
YOLO_LABELS = open(labelsPath).read().strip().split("\n")

# YOLO 모델 호출
yolo_net = cv2.dnn.readNetFromDarknet(configPath, weightsPath)

# YOLO 출력층 설정
layer_names = yolo_net.getLayerNames()
output_layers = [layer_names[i[0] - 1] for i in yolo_net.getUnconnectedOutLayers()]
colors = np.random.uniform(0, 255, size=(len(YOLO_LABELS), 3))

# 영상 할당
file_path = "/home/azure/passion/AI/CategoryandAttributePredictionBenchmark/static/432432411.jpg"
cap = cv2.VideoCapture(file_path)

'''
.mp4 파일 생성 -> 코드 실행 속도 문제로 일단 주석 처리
size = (int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)))
fourcc = cv2.VideoWriter_fourcc('m', 'p', '4', 'v') # note the lower case
vout = cv2.VideoWriter()
success = vout.open('output.mp4', fourcc, 10, size, True)
'''

# 화면 폰트
font = cv2.FONT_HERSHEY_SIMPLEX

_, frame = cap.read()
# frame_id += 1
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
for out in outs:
    for detection in out:
        print(detection)
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

            crop_img = frame[yy:yy + hh, xx:xx + hh]
            cv2.imwrite('/home/azure/passion/AI/YOLOv3/image/'+str(count)+".jpg", crop_img)


indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.8, 0.3)

# 화면에 바운딩 박스 그리기
for i in range(len(boxes)):
    if i in indexes:
        boxes = np.array(boxes)
        x, y, w, h = boxes[i]
        label = str(YOLO_LABELS[class_ids[i]])
        confidence = confidences[i]
        color = colors[class_ids[i]]
        cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
        cv2.putText(frame, label + " " + str(round(confidence, 2)), (x, y + 30), font, 3, color, 3)

# 디스플레이
plt.imshow(frame)
key = cv2.waitKey(1)

cap.release()
