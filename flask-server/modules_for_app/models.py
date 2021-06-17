from mongoengine import Document, StringField, DictField, IntField, ListField
from marshmallow import Schema, fields


class CalendarDocument(Document):
    # mongoengine Document model 정의
    user_id = IntField(required=True)
    date = StringField(required=True)
    ootd_img_path = StringField(required=True)
    clothes_subcategory = ListField(StringField())
    # DB Collection 이름 지정
    meta = {"collection": 'Calendar'}


class CalendarSchema(Schema):
    # marshmallow Schema 정의
    user_id = fields.Int()
    date = fields.Str()
    ootd_img_path = fields.Str()
    clothes_subcategory = fields.List(fields.String())


class UserDocument(Document):
    # mongoengine Document model 정의
    kakao_id_number = IntField(required=True)
    user_name = StringField(required=True)
    profile_img = StringField()
    agreement = StringField()
    gender = StringField()

    # DB Collection 이름 지정
    meta = {"collection": 'User'}


class UserSchema(Schema):
    # marshmallow Schema 정의
    kakao_id_number = fields.Integer()
    user_name = fields.String()
    profile_img = fields.String()
    agreement = fields.String()
    gender = fields.String()
