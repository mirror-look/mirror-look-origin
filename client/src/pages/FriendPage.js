//import Calendar from 'react-calendar';
//import React, { useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
//import axios from 'axios';
//import './FriendPage.css';
//import styled from 'styled-components';
//import Box from '@material-ui/core/Box';
//import Profile from '../components/main/Profile';

//function Hello({ username }) {
//  return <StyledHello>{username}님 안녕하세요!</StyledHello>;
//}

//const StyledHello = styled('div')`
//  font-family: Rubik;
//  font-style: normal;
//  font-weight: 500;
//  font-size: 30px;
//  line-height: 40px;
//`;

//function Weather() {
//  return (
//    <WeatherBox>
//      <WeatherText>오늘의 날씨</WeatherText>
//      <RealWeather>(날씨)</RealWeather>
//    </WeatherBox>
//  );
//}

//const WeatherBox = styled(Box)`
//  width: 365px;
//  height: 315px;
//  border-radius: 30px;
//  background: linear-gradient(1.51deg, #ebf1ff 5.34%, #f2f5fe 72.41%);
//  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
//  display: flex;
//  flex-direction: column;
//  align-items: center;
//`;

//const WeatherText = styled(Box)`
//  font-family: Rubik;
//  font-style: normal;
//  font-weight: bold;
//  font-size: 20px;
//  line-height: 24px;
//  text-align: center;
//  margin: 20px;
//`;

//const RealWeather = styled(Box)`
//  border: 3px dotted black;
//  border-radius: 150px;
//  padding: 100px;
//`;

//function getFormatDate(date) {
//  var year = date.getFullYear();
//  var month = 1 + date.getMonth();
//  month = month >= 10 ? month : '0' + month;
//  var day = date.getDate();
//  day = day >= 10 ? day : '0' + day;
//  return year + '-' + month + '-' + day;
//}

//function FriendPage() {
//  // api server에서 username을 받아와야함
//  //  const [username, setUsername] = useState();
//  const username = '하성민';
//  const [value, setValue] = useState(new Date());
//  const [dates, setDates] = useState([]);
//  const history = useHistory();
//  const userId = 1;

//  //데이터가 없는 날짜는 비활성화 시킨다.
//  const noData = ({ activeStartDate, date, view }) => {
//    return !dates.some((d) => d === getFormatDate(date));
//  };

//  // 날짜를 클릭했을 때, 페이지 전환 후 해당 날짜에 해당하는 데이터를 서버에 요청. 쿼리스트링 방식.
//  const onClickDay = (date, event) => {
//    console.log(getFormatDate(date));
//    history.push(`/dashboard?user_id=${userId}&date=${getFormatDate(date)}`);
//  };

//  const getDate = async () => {
//    try {
//      const { data } = await axios.get(`${URL}/calendar/${userId}`);
//      setDates(data.ootd_enrolled_dates);
//    } catch (e) {
//      console.error(e);
//      setDates(['2021-05-01', '2021-05-25', '2021-05-17', '2021-04-11']);
//    }
//  };

//  const tileClassName = ({ date }) => (date.getDay() === 0 ? 'sunday' : '');

//  useEffect(() => {
//    getDate();
//  }, []);
//  return (
//    <Body>
//      <UserInfo>
//        <Hello username={username} />
//        <Profile username={username} />
//        <Weather />
//      </UserInfo>
//      <Calendar
//        onChange={setValue}
//        onClickDay={onClickDay}
//        nextLabel={'▶'}
//        next2Label={'▷'}
//        prevLabel={'◀'}
//        prev2Label={'◁'}
//        value={value}
//        tileDisabled={noData}
//        tileClassName={tileClassName}
//      />
//    </Body>
//  );
//}

//const Body = styled('div')`
//  display: flex;
//  flex-direction: row;
//  justify-content: center;
//  align-items: center;
//`;

//const UserInfo = styled('div')`
//  display: flex;
//  flex-direction: column;
//  justify-content: center;
//  align-items: center;
//`;

//export default FriendPage;
