//import { useState } from 'react';

import styled from 'styled-components';
//import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Header from '../components/common/Header';
import NavBar from '../components/common/NavBar';
import WindowWrapper from '../components/common/WindowWrapper';
import AgreementModal from '../components/common/AgreementModal';

import { useEffect, useState } from 'react';
import axios from 'axios';

//import Calendar from './Calendar';

function Hello({ username }) {
  return <StyledHello>{username}님 안녕하세요!</StyledHello>;
}

const StyledHello = styled('div')`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 40px;
`;

function Profile({ username }) {
  return (
    <ProfileBox>
      <ProfileContent>{username}</ProfileContent>
      {/*// 이미지 ..아마 path로 받을듯?
			// 이름
			// 별명?
			// 이상한 숫자??
			// 나의 코디*/}
    </ProfileBox>
  );
}

const ProfileContent = styled(Box)`
  margin: 30px;
`;

const ProfileBox = styled(Box)`
  width: 364px;
  height: 380px;
  left: 131px;
  top: 216px;

  background: #ffffff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 30px;
  margin: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Weather() {
  return (
    <WeatherBox>
      <WeatherText>오늘의 날씨</WeatherText>
      <RealWeather>(날씨)</RealWeather>
    </WeatherBox>
  );
}

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

function TodayOOTD() {
  return <TodayOOTDBox>오늘의 OOTD</TodayOOTDBox>;
}

const TodayOOTDBox = styled(Box)`
  width: 395px;
  height: 764px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  margin: 30px;
  padding: 30px;
  text-align: center;
`;

function Calendar() {
  return <StyledCalender>OOTD 캘린더</StyledCalender>;
}

const StyledCalender = styled(Box)`
  width: 417px;
  height: 764px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  margin: 30px;
  padding: 30px;
  text-align: center;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height, or 120% */
`;

function Main() {
  // api server에서 username을 받아와야함
  const [userName, setUserName] = useState();
  const [userProfileImage, setUserProfileImage] = useState();
  const [userAgreement, setUserAgreement] = useState();
  const [modalOpen, setModalOpen] = useState(true);
  const modalTitle = '위치 정보 제공 동의';
  const modalComment = `Mirror-Look은 날씨 기반 추천 서비스예요. 저희가 ${userName} 님의 위치 정보를 열람해도 될까요?`;
  useEffect(() => {
    const token = `Bearer ${window.sessionStorage.getItem('token')}`;
    axios
      .get('http://localhost:5000/userinfo', {
        headers: {
          Authorization: token
        }
      })
      .then(function (response) {
        console.log('사용자 정보 받아왔다!');
        setUserName(response.data.user_info.user_name);
        setUserProfileImage(response.data.user_info.profile_img);
        setUserAgreement(response.data.user_info.agreement);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <WindowWrapper>
      <NavBar />
      <MainLayout>
        <Header username={userName} />
        <Body>
          <UserInfo>
            <Hello username={userName} />
            <Profile username={userName} />
            <Weather />
          </UserInfo>
          <TodayOOTD></TodayOOTD>
          <Calendar></Calendar>
        </Body>
      </MainLayout>
      {modalOpen === true ? (
        <AgreementModal
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          setUserAgreement={setUserAgreement}
          modalTitle={modalTitle}
          modalComment={modalComment}
        />
      ) : (
        ''
      )}
    </WindowWrapper>
  );
}

const MainLayout = styled('div')`
  display: flex;
  flex-direction: column;
`;

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

export default Main;
