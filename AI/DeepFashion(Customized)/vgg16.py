import os
datasetdir = '/home/azure/passion/AI/DeepFashion(Customized)/DeepFashion/Train'
os.chdir(datasetdir)

# import the needed packages
import matplotlib.pyplot as plt
import matplotlib.image as img
import tensorflow.keras as keras
import numpy as np
import tensorflow as tf
from keras.callbacks import ModelCheckpoint, CSVLogger, TensorBoard, EarlyStopping
from tensorflow.python.client import device_lib
config = tf.compat.v1.ConfigProto()
config.gpu_options.allow_growth = True
tf.compat.v1.keras.backend.set_session(tf.compat.v1.Session(config=config))

from tensorflow.keras.preprocessing.image import ImageDataGenerator

datasetdir = r'/home/azure/passion/AI/DeepFashion(Customized)/DeepFashion/Train'
batch_size = 3

def DataLoad(shape, preprocessing):

    imgdatagen = ImageDataGenerator(
        preprocessing_function = preprocessing,
        horizontal_flip = True,
        validation_split = 0.1
    )

    height, width = shape

    train_dataset = imgdatagen.flow_from_directory(
        os.getcwd(),
        target_size = (height, width),
        classes = ['Blazer', 'Blouse', 'Cardigan', 'Dress', 'Jacket',
                 'Jeans', 'Jumpsuit', 'Romper', 'Shorts', 'Skirts', 'Sweater', 'Sweatpants', 'Tank', 'Tee', 'Top'],
        batch_size = batch_size,
        subset = 'training',
    )

    val_dataset = imgdatagen.flow_from_directory(
        os.getcwd(),
        target_size = (height, width),
        classes = ['Blazer', 'Blouse', 'Cardigan', 'Dress', 'Jacket',
                 'Jeans', 'Jumpsuit', 'Romper', 'Shorts', 'Skirts', 'Sweater', 'Sweatpants', 'Tank', 'Tee', 'Top'],
        batch_size = batch_size,
        subset = 'validation',
    )

    return train_dataset, val_dataset

# VGG16 MODEL
vgg16 = keras.applications.vgg16
conv_model = vgg16.VGG16(weights='imagenet', include_top=False)
conv_model.summary()

train_dataset, val_dataset = DataLoad((224, 224), preprocessing=vgg16.preprocess_input)

X_train, y_train = next(train_dataset)

X_train = X_train / 255.0

X_train = np.asarray(X_train)

# print(X_train[0])

conv_model = vgg16.VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

x = keras.layers.Flatten()(conv_model.output)

x = keras.layers.Dense(64, activation='relu')(x)
x = keras.layers.Dense(64, activation='relu')(x)
x = keras.layers.Dense(64, activation='relu')(x)

predictions = keras.layers.Dense(15, activation='softmax')(x)

full_model = keras.models.Model(inputs=conv_model.input, outputs=predictions)
full_model.summary()

# # for layer in conv_model.layers:
# #     layer.trainable = False

# full_model.summary()

## Register Callbacks
csv_log_filename = '/home/azure/passion/AI/DeepFashion(Customized)/DeepFashion/output'
csv_log = CSVLogger(csv_log_filename, seperator=' ', append=False)

early_stopping = EarlyStopping(
    monitor='loss', patience=early_stopping_patience, verbose=1, mode='min'
)

checkpoint_filepath = '/home/azure/passion/AI/DeepFashion(Customized)/DeepFashion/output'
checkpoint = ModelCheckpoint(checkpoint_filepath, monitor='val_loss', verbose=1,
save_best_only=True, save_weights_only=False, mode='min', period=1
)

callbacks_list = [csv_log, early_stopping, checkpoint]

full_model.compile(loss='binary_crossentropy',
                optimizer=keras.optimizers.Adamax(lr=0.001),
                metrics=['acc']
                )

history = full_model.fit(
    train_dataset,
    validation_data = val_dataset,
    workers=0,
    epochs=10,
    callbacks=callbacks_list
)


if __name__ == '__main__':
    print(tf.config.list_physical_devices('GPU'))
    print(device_lib.list_local_devices())
