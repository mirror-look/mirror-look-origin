import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Profile from '../components/common/Profile';
import NavBar from '../components/common/NavBar';
import Header from '../components/common/Header';
import WindowWrapper from '../components/common/WindowWrapper';
import AgreementModal from '../components/common/AgreementModal';

function Hello({ userName }) {
  return <StyledHello>{userName}님 안녕하세요!</StyledHello>;
}

const StyledHello = styled('div')`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 40px;
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
  const [userName, setUserName] = useState('');
  const [userProfileImage, setUserProfileImage] = useState('');
  const [userAgreement, setUserAgreement] = useState();
  const [agreement, setAgreement] = useState();
  const [userKakaoId, setUserKakaoId] = useState('');
  const [modalOpen, setModalOpen] = useState();
  const modalTitle = '위치 정보 제공 동의';
  const modalComment = `Mirror-Look은 날씨 기반 추천 서비스예요. 저희가 위치 정보를 열람해도 될까요?`;

  useEffect(() => {
    const token = `Bearer ${window.sessionStorage.getItem('token')}`;
    axios
      .get('http://localhost:5000/userinfo', {
        headers: {
          Authorization: token
        }
      })
      .then(function (response) {
        console.log(response);
        setUserName(response.data.user_info.user_name);
        setUserKakaoId(response.data.user_info.kakao_id_number);
        setUserProfileImage(response.data.user_info.profile_img);
        setAgreement(response.data.user_info.agreement);
        console.log('사용자 정보 받았다!');
        if (!response.data.user_info.agreement) {
          console.log('동의여부가 false 여서 Modal 띄운다!');
          setModalOpen(true);
        }
      })
      .catch(function (err) {
        console.log(err);
      }, []);

    if (!!window.sessionStorage.getItem('userAgreement')) {
      const token = `Bearer ${window.sessionStorage.getItem('token')}`;
      const data = {
        agreement: window.sessionStorage.getItem('userAgreement')
      };
      axios
        .put('http://localhost:5000/userinfo', data, {
          headers: {
            Authorization: token
          }
        })
        .then(function (response) {
          console.log('위치동의여부 넣었다!');
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  });

  return (
    <WindowWrapper>
      <Body>
        <UserInfo>
          <Hello userName={userName} />
          <Profile userName={userName} />
          <Weather />
        </UserInfo>
        <TodayOOTD></TodayOOTD>
        <Calendar></Calendar>
      </Body>
      {modalOpen === true ? (
        <AgreementModal
          setModalOpen={setModalOpen}
          modalOpen={true}
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
