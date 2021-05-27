from mongoengine import Document, StringField, DictField, IntField, BooleanField
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

class UserDocument(Document):
    # mongoengine Document model 정의
    kakao_id_number = IntField(required=True)
    user_name = StringField(required=True)
    profile_img = StringField(required=True)
    agreement = StringField()

    # DB Collection 이름 지정
    meta = {"collection": 'User'}

class UserSchema(Schema):
    # marshmallow Schema 정의
    kakao_id_number = fields.Integer()
    user_name = fields.String()
    profile_img = fields.String()
    agreement = fields.String()
