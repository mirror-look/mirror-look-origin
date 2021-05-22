from config import *

def selective_search_bbox(image):
    logging.debug('image {}'.format(image))

    # load image
    img = skimage.io.imread(image)
    # print(img.shape)

    width, height, channels = img.shape
    logging.debug('img shape {}'.format(img.shape))
    logging.debug('img type {}'.format(type(img)))
    region_pixels_threshold = (width * height) / 100
    logging.debug('region_pixels_threshold {}'.format(region_pixels_threshold))

    # perform selective search
    _, regions = selectivesearch.selective_search(img, scale=500, sigma=0.9, min_size=10)
    logging.debug('regions {}'.format(len(regions)))
    # sizes = [i['size'] for i in regions]
    # logging.debug('sizes {}'.format(sizes))
    # [ {'rect': (x 시작 좌표, y 시작 좌표, 너비, 높이), 'size': Bounding box의 크기, 'labels': 해당 rect로 지정된 Bounding Box내에 있는 오브젝트들의 고유 ID}
    #   {'rect': (0, 0, 19, 9), 'size': 137, 'labels': [0.0]},
    #   {'rect': (0, 0, 185, 267), 'size': 22111, 'labels': [1.0]},
    #   {'rect': (47, 0, 12, 4), 'size': 25, 'labels': [2.0]},
    #   {'rect': (75, 0, 3, 10), 'size': 15, 'labels': [3.0]},
    #   {'rect': (77, 0, 8, 11), 'size': 56, 'labels': [4.0]}
    # ]

    # filter regions
    candidates = set()
    for r in regions:

        # distorted rects
        x, y, w, h = r['rect'] # (0, 0, 19, 9)

        # excluding same rectangle witn different segments
        if r['rect'] in candidates:
            continue

        # excluding regions smaller than 2000 pixels
        if r['size'] < region_pixels_threshold:
            logging.debug('Discarding - region_pixels_threshold - {} < {} - x: {} y: {} w: {} h: {}'.format(region_pixels_threshold, r['size'], x, y, w, h))
            continue

        # # Orig

        # if w / h > 1.2 or h / w > 1.2:
        #     continue

        if h != 0 and w / h > 6:
            logging.debug('Discarding w/h {} - x: {} y: {} w: {} h: {}'.format(w/h, x, y, w, h))
            continue

        if w != 0 and h / w > 6:
            logging.debug('Discarding h/w {} - x: {} y: {} w: {} h: {}'.format(h/w, x, y, w, h))
            continue

        if w == 0 or h == 0:
            logging.debug('Discarding h or w is zero - x: {} y: {} w: {} h: {}'.format(x, y, w, h))
            continue



        candidates.add(r['rect'])
        logging.debug('candidates {}'.format(candidates))

        return candidates

if __name__ == '__main__':
    # image = '/home/azure/passion/AI/Category and Attribute Prediction Benchmark/Img/img/Abstract_Animal_Print_Dress/img_00000001.jpg'
    image = '/home/azure/passion/AI/Category and Attribute Prediction Benchmark/Img/img/Cami_Peplum_Top/img_00000001.jpg'
    # image = '/home/azure/passion/AI/Category and Attribute Prediction Benchmark/Img/img/Zippered_Open-Front_Jacket/img_00000002.jpg'
    # image = '/home/azure/passion/AI/Category and Attribute Prediction Benchmark/Img/img/2-in-1_Space_Dye_Athletic_Tank/img_00000001.jpg'
    selective_search_bbox(image)
