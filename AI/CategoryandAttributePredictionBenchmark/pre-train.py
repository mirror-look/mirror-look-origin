import os

datasetdir = '/home/azure/passion/AI/Category and Attribute Prediction Benchmark/dataset/train'
os.chdir(datasetdir)

# import the needed packages
import matplotlib.pyplot as plt
import matplotlib.image as img
import tensorflow.keras as keras
import numpy as np
import tensorflow as tf
from tensorflow.python.client import device_lib
config = tf.compat.v1.ConfigProto()
config.gpu_options.allow_growth = True
tf.compat.v1.keras.backend.set_session(tf.compat.v1.Session(config=config))

from tensorflow.keras.preprocessing.image import ImageDataGenerator

datasetdir_train = r'/home/azure/passion/AI/Category and Attribute Prediction Benchmark/dataset/train'
batch_size_train = 64

datasetdir_validation = r'/home/azure/passion/AI/Category and Attribute Prediction Benchmark/dataset/validation'
batch_size_validation = 64

def DataLoad(preprocessing):

    imgdatagen_train = ImageDataGenerator(
        preprocessing_function=preprocessing,
        horizontal_flip = True,
    )

    imgdatagen_val = ImageDataGenerator(
        preprocessing_function=preprocessing,
        horizontal_flip = True
    )

    img_height = 224 # For VGG16
    img_width = 224 # For VGG16

    train_dataset = imgdatagen_train.flow_from_directory(
        datasetdir_train,
        target_size = (img_height, img_width),
        classes = ['Anorak', 'Blazer', 'Blouse', 'Bomber', 'Button-Down', 'Cardigan', 'Flannel', 'Halter', 'Henley', 'Hoodie', 'Jacket', 'Jersey', 'Parka', 'Peacoat', 'Poncho', 'Sweater', 'Tank', 'Tee', 'Top', 'Turtleneck', 'Capris', 'Chinos', 'Culottes', 'Cutoffs', 'Gauchos', 'Jeans', 'Jeggings', 'Jodhpurs', 'Joggers', 'Leggings', 'Sarong', 'Shorts', 'Skirt', 'Sweatpants', 'Sweatshorts', 'Trunks', 'Caftan', 'Cape', 'Coat', 'Coverup', 'Dress', 'Jumpsuit', 'Kaftan', 'Kimono', 'Nightdress', 'Onesie', 'Robe', 'Romper', 'Shirtdress', 'Sundress'],
        batch_size = batch_size_train
    )

    val_dataset = imgdatagen_val.flow_from_directory(
        datasetdir_validation,
        target_size = (img_height, img_width),
        classes = ['Anorak', 'Blazer', 'Blouse', 'Bomber', 'Button-Down', 'Cardigan', 'Flannel', 'Halter', 'Henley', 'Hoodie', 'Jacket', 'Jersey', 'Parka', 'Peacoat', 'Poncho', 'Sweater', 'Tank', 'Tee', 'Top', 'Turtleneck', 'Capris', 'Chinos', 'Culottes', 'Cutoffs', 'Gauchos', 'Jeans', 'Jeggings', 'Jodhpurs', 'Joggers', 'Leggings', 'Sarong', 'Shorts', 'Skirt', 'Sweatpants', 'Sweatshorts', 'Trunks', 'Caftan', 'Cape', 'Coat', 'Coverup', 'Dress', 'Jumpsuit', 'Kaftan', 'Kimono', 'Nightdress', 'Onesie', 'Robe', 'Romper', 'Shirtdress', 'Sundress'],
        batch_size = batch_size_validation
    )

    return train_dataset, val_dataset

# VGG16 MODEL
vgg16 = keras.applications.vgg16
conv_model = vgg16.VGG16(weights='imagenet', include_top=False)
# conv_model.summary()

train_dataset, val_dataset = DataLoad(preprocessing=vgg16.preprocess_input)

X_train, y_train = next(train_dataset)

print("X_train_shape: ", X_train.shape)
print("y_train_shape: ", y_train.shape)

X_val, y_val = next(val_dataset)

print("X_val_shape: ", X_val.shape)
print("y_val_shape: ", y_val.shape)

conv_model = vgg16.VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

x = keras.layers.Flatten()(conv_model.output)

x = keras.layers.Dense(128, activation='relu')(x)
x = keras.layers.Dense(128, activation='relu')(x)
x = keras.layers.Dense(128, activation='relu')(x)


predictions = keras.layers.Dense(50, activation='softmax')(x)

full_model = keras.models.Model(inputs=conv_model.input, outputs=predictions)
full_model.summary()

# ## Register Callbacks

# # CSVLogger
# filename = '/home/azure/passion/AI/Category and Attribute Prediction Benchmark/dataset/output/model_train.csv'
# csv_log = keras.callbacks.CSVLogger(filename, separator=' ', append=False)

# # EarlyStopping
# early_stopping = keras.callbacks.EarlyStopping(
#     monitor='loss', patience=500, verbose=1, mode='min'
# )

# # ModelCheckpoint
# filepath = '/home/azure/passion/AI/Category and Attribute Prediction Benchmark/dataset/output/best-weights-{epoch:03d}-{val_loss:.4f}.ckpt'
# checkpoint = keras.callbacks.ModelCheckpoint(
#     filepath, monitor='val_loss', verbose=1,
#     save_best_only=True, save_weights_only=False, mode='min', period=1
# )

# callbacks_list = [csv_log, early_stopping]

full_model.compile(
    loss='binary_crossentropy',
    optimizer=keras.optimizers.Adamax(lr=0.001),
    metrics=['acc']
)

history = full_model.fit(
    train_dataset,
    validation_data = (X_val, y_val),
    workers=0,
    epochs=10,
    verbose=2
)

if __name__ == '__main__':
    print(tf.config.list_physical_devices('GPU'))
    print(device_lib.list_local_devices())
