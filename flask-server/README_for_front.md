# README for FRONT DEVELOPE

목차

```
Calendar API
Search API
Weather API
UserInfo API
Classification API
```

## Calendar API

### 1. CREATE

#### (1). REQUEST

##### 1). HEADER

```js
// 헤더
header = {
  "Content-Type": "multipart/form-data",
};
```

##### 2). PARAMS: ootd_img, user_id, date, color, fabric, sleeve

```js
// Params는 img 파일과 함께 FormData내에 담아서 전달

// 이미지 파일은 파일 업로드로 FormData에 삽입
ootdInfo = new FormData();

const [ootdImg, setOotdImg] = useState();
// <input type='file'>로부터 파일 업로드
setOotdImg(e.target.files[0]);
ootdInfo.append("ootd_img", ootdImg);

// 기타 Params : 'user_id', 'date', 'color', 'fabric', 'sleeve'
// user_id만 정수형, 그 외는 전부 문자열

ootdInfo.append("user_id", userId);
ootdInfo.append("date", date);
ootdInfo.append("color", color);
ootdInfo.append("fabric", fabric);
ootdInfo.append("sleeve", sleeve);
```

##### 3). METHOD: post

```js
axios.post(
    /calendar,
    ootdInfo,
    {
        headers: header
    }
);
```

#### (2). RESPONSE

```js
{
    "status" : 200,
    "ootd_created" : {
        "user_id": 123456789,
        "date": "2021-05-25",
        "ootd_path": "f10b7c38-a571-41ca-b5c7-db2d4bcf6ad9.png",
        "clothes_feature": {
            "color": "blue",
            "fabric": "cotton",
            "sleeve": "long",
        },
    };
}
```

### 2. READ

#### (1). REQUEST

##### 1). PARAMS : user_id, date

```js
// 예시 setState
const [userId, setUserId] = useState();
const [date, setDate] = useState();
const [month, setMonth] = useState();

setUserId(123456789);
setDate("2021-05-25");
setMonth("05");
// 월은 '01', '02', '03', ... '12'
```

##### 2). METHOD : GET

```js
// 월별 OOTD를 등록한 날짜 ARRAY를 받는 경우
// 캘린더 화살표를 눌러서 월을 변경할 때마다 useEffect로 get 요청
axios.get("/calendar", {
  params: {
    user_id: userId,
    month: month,
  },
});

// 사용자가 OOTD를 등록한 날짜를 클릭하여 OOTD 이미지를 받는 경우
axios.get("/calendar", {
  params: {
    user_id: userId,
    date: date,
  },
});
```

#### (2). RESPONSE

##### 1). 월별 사용자의 OOTD 등록 날짜를 ARRAY로 받는 경우

```js
{
    "ootd_enrolled_dates": [
        "2021-05-25",
        "2021-05-26",
        "2021-05-28"
    ],
    "status": 200
}
```

##### 2). 사용자가 OOTD를 등록한 날짜를 클릭하는 경우

별도의 RESPONSE는 없으나 REQUEST URL에 이미지 파일이 업로드된다. 캘린더 내의 컴포넌트 등에 img src 게시하여 사용

```js
const imgSrc = `calendar?user_id={userId}&date={date}`
<img src={imgSrc}></img>
```

### 3. UPDATE

#### (1). REQUEST

##### 1). PARAMS: ootd_img, user_id, date

```js
// 변경할 이미지 파일 업로드는 CREATE 부분과 동일

ootdInfo = new FormData();
ootdInfo.append("ootd_img", ootdImg);
ootdInfo.append("user_id", userId);
ootdInfo.append("date", date);
```

##### 2). METHOD: PUT

```js
axios.put("/calendar", ootdInfo);
```

#### (2). RESPONSE

```js
{
    "status" : 200,
    "ootd_updated" : {
        "clothes_feature": {
            "color": "red",
            "fabric": "cotton",
            "sleeve": "long"
        }
        "date": "2021-05-25"
        "ootd_path": "46358039-9487-4982-8db3-41471424008c.png"
        "user_id": 123456789
    }
}
```

## Search API

### 1. 유저 검색

#### (1). REQUEST URL / PARAMS / METHOD: /user-search, user_name, GET

Search-Bar 입력값을 user_name 값으로 request 요청

#### (2). RESPONSE

정규표현식 쿼리를 활용 : FULLNAME 안에 포함되어 있으면 전부 검색,
동명이인 구분 및 OOTD 검색을 위해 {user_name: user_id} 형식으로 리턴

```js
// 예시 user_name = '윤'
{
    "status": 200,
    "searched_user_list" : {
        '김윤주': 123456789,
        '김윤주': 328493849,
        '윤수진': 392849959,
    }
}
```

검색된 각 유저의 user_id 값은 프론트에서 저장한 뒤 아래 OOTD 검색시 사용할 것

### 2. 유저의 OOTD(캘린더) 정보 검색

#### (1). REQUEST URL / PARAMS / METHOD: /user-ootd, user_id, POST

user-search URI에서 가져온 user_id값으로 request 요청

#### (2). RESPONSE

```js
{
    "ootd_info_of_selected_user": {
        "2021-05-25": "46358039-9487-4982-8db3-41471424008c.png",
        "2021-05-26": "a95f610e-1e22-4e67-a391-c9f30178e45b.png",
        "2021-05-28": "72d4c9be-ec10-480b-8d01-101a4a30ba14.png"
    },
    "status": 200,
    "user_id": 123456789
}
```

이후 각 png 파일 이미지는 위 user_id 및 date 값으로 calendar API에 요청하여 수령

### 3. 날짜별 OOTD 검색

#### (1). REQUEST URL / PARAMS / METHOD : /day-ootd, date, POST

캘린더상 date 값으로 request 요청

#### (2). RESPONSE : {user_id : ootd_path}

```js
{
    "ootd_info_of_selected_day": {
        123456789: "46358039-9487-4982-8db3-41471424008c.png",
        328493849: "7f75ff6a-806e-4f4e-9ce6-b4d5026df8a8.png",
        392849959: "33162791-dc94-4e24-ae4a-783caeaed8ad.png"
    },
    "status": 200
    "date": '2021-05-25'
}
```

이후 각 png 파일 이미지는 위 user_id 및 date 값으로 calendar API에 요청하여 수령

## Weather API

### 1. REQUEST URL / PARAMS / METHOD : /weather, [latitude, longitude], POST

### 2. RESPONSE

```js
{
    "current_weather": "실 비",
    "hourly_weather": {
        "2021-05-20 07:00": "실 비",
        "2021-05-20 08:00": "실 비",
        "2021-05-20 09:00": "약간의 구름이 낀 하늘",
        "2021-05-20 10:00": "구름조금",
        "2021-05-20 11:00": "보통 비",
        "2021-05-20 12:00": "보통 비",
        "2021-05-20 13:00": "실 비",
        "2021-05-20 14:00": "실 비",
        "2021-05-20 15:00": "실 비",
        "2021-05-20 16:00": "실 비",
        "2021-05-20 17:00": "실 비",
        "2021-05-20 18:00": "실 비",
        "2021-05-20 19:00": "실 비",
        "2021-05-20 20:00": "실 비",
        "2021-05-20 21:00": "실 비",
        "2021-05-20 22:00": "실 비",
        "2021-05-20 23:00": "실 비",
        "2021-05-21 00:00": "실 비",
        "2021-05-21 01:00": "온흐림",
        "2021-05-21 02:00": "온흐림",
        "2021-05-21 03:00": "온흐림",
        "2021-05-21 04:00": "온흐림",
        "2021-05-21 05:00": "온흐림",
        "2021-05-21 06:00": "온흐림",
        "2021-05-21 07:00": "튼구름",
        "2021-05-21 08:00": "튼구름",
        "2021-05-21 09:00": "튼구름",
        "2021-05-21 10:00": "튼구름",
        "2021-05-21 11:00": "튼구름",
        "2021-05-21 12:00": "튼구름",
        "2021-05-21 13:00": "맑음",
        "2021-05-21 14:00": "맑음",
        "2021-05-21 15:00": "맑음",
        "2021-05-21 16:00": "맑음",
        "2021-05-21 17:00": "맑음",
        "2021-05-21 18:00": "맑음",
        "2021-05-21 19:00": "맑음",
        "2021-05-21 20:00": "맑음",
        "2021-05-21 21:00": "맑음",
        "2021-05-21 22:00": "맑음",
        "2021-05-21 23:00": "맑음",
        "2021-05-22 00:00": "맑음",
        "2021-05-22 01:00": "맑음",
        "2021-05-22 02:00": "맑음",
        "2021-05-22 03:00": "맑음",
        "2021-05-22 04:00": "맑음",
        "2021-05-22 05:00": "맑음",
        "2021-05-22 06:00": "맑음"
    }
}
```

## UserInfo API

### READ

#### (1). REQUEST

```js
const token = `Bearer ${localStorage.getItem("token")}`;

axios.get("/userinfo", {
  headers: {
    Authorization: token,
  },
});
```

#### (2). RESPONSE

```js
{
    "status": 200,
    "user_info": {
        "agreement" : true 또는 false
        "profile_img": "http://k.kakaocdn.net/dn/bXmxMW/btq5c6BLVx0/UVMWI7rjrk0BgsG8umfpNK/img_640x640.jpg",
        "user_name": "김윤주"
    }
}
```

### UPDATE

#### (1). REQUEST

```js
const token = `Bearer ${localStorage.getItem("token")}`;

axios.put("/userinfo", data, { // data는 json 형식으로 ex) {"agreement":true}
    headers: {
        Authorization: token
    },
});
```

#### (2). RESPONSE

```js
{
    "status": 200
}
```

## Classification API

### POST

#### (1). REQUEST

#### (2). RESPONSE

```js
{
    "result": [
        {
            "long_sleeve_top": [
                [
                    "Blouse",
                    "0.64969826"
                ],
                [
                    "Tank",
                    "0.09718021"
                ],
                [
                    "Tee",
                    "0.0923314"
                ]
            ]
        },
        {
            "trousers": [
                [
                    "Jeans",
                    "0.9024926"
                ],
                [
                    "Shirts",
                    "0.046128057"
                ],
                [
                    "Shorts",
                    "0.01998286"
                ]
            ]
        }
    ],
    "status": 200
}
```
