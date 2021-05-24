import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Profile from '../components/common/Profile';

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
  //  const [username, setUsername] = useState();
  const username = '김윤주';
  return (
    <Body>
      <UserInfo>
        <Hello username={username} />
        <Profile username={username} />
        <Weather />
      </UserInfo>
      <TodayOOTD></TodayOOTD>
      <Calendar></Calendar>
    </Body>
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
