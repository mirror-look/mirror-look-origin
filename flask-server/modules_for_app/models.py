from mongoengine import Document, StringField, DictField, IntField
from marshmallow import Schema, fields


class CalendarDocument(Document):
    # mongoengine Document model 정의
    user_id = IntField(required=True)
    user_id = StringField(required=True)
    date = StringField(required=True)
    ootd_path = StringField(required=True)
    clothes_feature = DictField(required=True)
    # DB Collection 이름 지정
    meta = {"collection": 'Calendar'}


class CalendarSchema(Schema):
    # marshmallow Schema 정의
    user_id = fields.Str()
    date = fields.Str()
    ootd_path = fields.Str()
    clothes_feature = fields.Dict()
