import os
import sys
from flask_restx import reqparse, Api, Resource
from flask import Blueprint, jsonify, url_for, send_file
from werkzeug.datastructures import FileStorage
from app import get_database
import uuid
from mongoengine import Document, StringField, DictField, IntField, Q
from marshmallow import Schema, fields
from .models import CalendarDocument, CalendarSchema

database = get_database()


def make_file_path():
    local_file_name = str(uuid.uuid4()) + '.png'
    local_file_path = os.path.join('object_detected_image', local_file_name)

    return local_file_name, local_file_path


def save_ootd_img(ootd_img, local_file_path):
    ootd_img.save(local_file_path)

    return


def create_calendar_document(user_id, date, clothes_subcategory, ootd_img_path):
    calendar_document = CalendarDocument(
        user_id=user_id,
        date=date,
        ootd_img_path=ootd_img_path,
        clothes_feature={
            'clothes_subcategory': clothes_subcategory
        }
    )

    return calendar_document


def create_date_array(user_id, month):
    next_month = '0' + str(int(month)+1)
    prev_month = '0' + str(int(month)-1)
    calendar_document = CalendarDocument.objects(
        (Q(user_id=user_id) & Q(date__contains=month)) | (Q(user_id=user_id) & Q(
            date__contains=next_month)) | (Q(user_id=user_id) & Q(date__contains=prev_month))
    )
    ootd_enrolled_dates = list()
    for document in calendar_document:
        ootd_enrolled_dates.append(document.date)

    return ootd_enrolled_dates


def get_file_path(date, user_id):
    local_file_name = CalendarDocument.objects.get(
        Q(date=date) & Q(user_id=user_id)).ootd_img_path
    local_file_path = os.path.join('object_detected_image', local_file_name)

    return local_file_path


def delete_ootd_img(user_id, date):
    old_local_file_name = CalendarDocument.objects.get(
        Q(user_id=user_id) & Q(date=date)).ootd_img_path
    old_local_file_path = os.path.join(
        'object_detected_image', old_local_file_name)
    os.remove(old_local_file_path)

    return


def update_calendar_document(user_id, date, local_file_name):
    CalendarDocument.objects(Q(user_id=user_id) & Q(
        date=date)).update_one(set__ootd_img_path=local_file_name)
    calendar_schema = CalendarSchema()

    calendar_document = CalendarDocument.objects.get(
        Q(user_id=user_id) & Q(date=date))

    return calendar_document
