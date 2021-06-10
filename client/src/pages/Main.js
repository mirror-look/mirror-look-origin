import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTemperature } from '../store/actions';
import styled from 'styled-components';
import { setUserInfo } from '../store/actions';
import axios from 'axios';
import UserInfo from '../components/main/UserInfo';
import WindowWrapper from '../components/common/WindowWrapper';
import AgreementModal from '../components/common/AgreementModal';
import Weather from '../components/main/Weather';
import TodayOOTD from '../components/main/TodayOOTD';
import CalendarBox from '../components/main/CalendarBox';

const URL = `http://localhost:5000`;

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
        <UserInfo
          userName={userName}
          profileImg={userProfileImage}
          lat={lat}
          lng={lng}
        />
        <TodayOOTD />
        <CalendarBox />
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
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default Main;
