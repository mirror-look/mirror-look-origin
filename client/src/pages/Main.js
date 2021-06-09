import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTemperature } from '../store/actions';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';
import { setUserInfo } from '../store/actions';
import axios from 'axios';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Profile from '../components/common/Profile';
import WindowWrapper from '../components/common/WindowWrapper';
import AgreementModal from '../components/common/AgreementModal';
import Weather from '../components/main/Weather';

const URL = `http://localhost:5000`;

function Hello({ userName }) {
  return <StyledHello>{userName}님 안녕하세요!</StyledHello>;
}

function TodayOOTD(props) {
  var items = [
    {
      label: 'mirror1',
      imgPath: '/images/mirror_1.jpg'
    },
    {
      label: 'mirror2',
      imgPath: '/images/mirror_2.jpg'
    },
    {
      label: 'mirror3',
      imgPath: '/images/mirror_3.jpg'
    }
  ];
  return (
    <Link to="/camera">
      <TodayOOTDBox>
        OOTD CAMERA
        <Carousel
          indicators={false}
          timeout={500}
          navButtonsAlwaysInvisible={true}
        >
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      </TodayOOTDBox>
    </Link>
  );
}

function Item(props) {
  return (
    <Paper>
      <img
        style={{
          width: '100%',
          height: '764px'
        }}
        src={props.item.imgPath}
      />
    </Paper>
  );
}

function Calendar() {
  var items = [
    {
      label: 'mirror1',
      imgPath: '/images/calendar_1.jpg'
    },
    {
      label: 'mirror2',
      imgPath: '/images/calendar_2.jpg'
    },
    {
      label: 'mirror3',
      imgPath: '/images/calendar_3.jpg'
    }
  ];
  return (
    <Link to="/calendar">
      <StyledCalender>
        OOTD CALENDAR
        <Carousel
          indicators={false}
          timeout={500}
          navButtonsAlwaysInvisible={true}
        >
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      </StyledCalender>
    </Link>
  );
}

function Main({ setAgreement, setUserKakaoId, userName, setUserName }) {
  const dispatch = useDispatch();
  const [userProfileImage, setUserProfileImage] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [modalOpen, setModalOpen] = useState();
  const modalTitle = '위치 정보 제공 동의';
  const modalComment = `Mirror-Look은 날씨 기반 추천 서비스예요. 저희가 위치 정보를 열람해도 될까요?`;

  useEffect(() => {
    const token = `Bearer ${window.sessionStorage.getItem('token')}`;
    axios
      .get(`${URL}/userinfo`, {
        headers: {
          Authorization: token
        }
      })
      .then(function (response) {
        console.log(response);
        setUserName(response.data.user_info.user_name);
        setUserProfileImage(response.data.user_info.profile_img);
        setUserKakaoId(response.data.user_info.user_id);
        setAgreement(response.data.user_info.agreement);
        dispatch(setUserInfo(response.data.user_info));
        console.log('사용자 정보 받았다!');
        if (response.data.user_info.agreement === 'false') {
          console.log('동의여부가 false 여서 Modal 띄운다!');
          setModalOpen(true);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  if (!lat && !lng) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('위치 받아왔다!');
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        axios
          .post('http://localhost:5000/weather', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
          .then(function (response) {
            dispatch(setTemperature(response.data.current_temperatures));
          });
      });
    } else {
      console.log('위치 못받아왔다!');
    }
  }

  return (
    <WindowWrapper>
      <Body>
        <UserInfo>
          <Hello userName={userName} />
          <Profile username={userName} profileImg={userProfileImage} />
          {!!lat && !!lng ? <Weather lat={lat} lng={lng} /> : ''}
        </UserInfo>
        <TodayOOTD />
        <Calendar />
      </Body>
      {modalOpen === true ? (
        <AgreementModal
          setModalOpen={setModalOpen}
          modalOpen={true}
          modalTitle={modalTitle}
          modalComment={modalComment}
        />
      ) : (
        ''
      )}
    </WindowWrapper>
  );
}

const Body = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const UserInfo = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledCalender = styled(Box)`
  width: 417px;
  height: 764px;
  overflow: hidden;

  background: #ffffff;
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  // border-radius: 30px;
  margin: 30px;
  padding: 30px;
  text-align: center;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  a {
    text-decoration: none;
    color: #8f00ff;
  }
  /* identical to box height, or 120% */
`;

const StyledHello = styled('div')`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 40px;
`;

const WeatherBox = styled(Box)`
  width: 365px;
  height: 315px;
  border-radius: 30px;
  background: linear-gradient(1.51deg, #ebf1ff 5.34%, #f2f5fe 72.41%);
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WeatherText = styled(Box)`
  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  margin: 20px;
`;

const RealWeather = styled(Box)`
  border: 3px dotted black;
  border-radius: 150px;
  padding: 100px;
`;

const TodayOOTDBox = styled(Box)`
  width: 395px;
  height: 764px;
  background: #ffffff;
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  // border-radius: 30px;
  overflow: hidden;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  margin: 30px;
  padding: 30px;
  text-align: center;
`;
export default Main;
