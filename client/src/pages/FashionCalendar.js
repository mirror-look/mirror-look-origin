import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Calendar from 'react-calendar';
import NavBar from '../components/common/NavBar';
import styled from 'styled-components';
import Header from '../components/common/Header';
import 'react-calendar/dist/Calendar.css';
import './FashionCalendar.css';
import axios from 'axios';

function getFormatDate(date) {
  var year = date.getFullYear();
  var month = 1 + date.getMonth();
  month = month >= 10 ? month : '0' + month;
  var day = date.getDate();
  day = day >= 10 ? day : '0' + day;
  return year + '-' + month + '-' + day;
}

const tileClassName = ({ date }) => (date.getDay() === 0 ? 'sunday' : '');

const URL = 'http://localhost:5000';

function FashionCalendar() {
  const [value, setValue] = useState(new Date());
  const [dates, setDates] = useState([]);
  const history = useHistory();
  const username = '김윤주';
  const userId = 1;

  //데이터가 없는 날짜는 비활성화 시킨다.
  const noData = ({ activeStartDate, date, view }) => {
    return !dates.some((d) => d === getFormatDate(date));
  };

  // 날짜를 클릭했을 때, 페이지 전환 후 해당 날짜에 해당하는 데이터를 서버에 요청. 쿼리스트링 방식.
  const onClickDay = (date, event) => {
    console.log(getFormatDate(date));
    history.push(`/dashboard?user_id=${userId}&date=${getFormatDate(date)}`);
  };

  const getDate = async () => {
    try {
      const { data } = await axios.get(`${URL}/calendar/${userId}`);
      setDates(data.ootd_enrolled_dates);
    } catch (e) {
      console.error(e);
      setDates(['2021-05-01', '2021-05-25', '2021-05-17']);
    }
  };

  useEffect(() => {
    getDate();
  }, []);

  return (
    <WindowWrapper>
      <NavBar />
      <FlexDiv>
        <Header username={username} />
        <Calendar
          onChange={setValue}
          onClickDay={onClickDay}
          nextLabel={'▶'}
          next2Label={'▷'}
          prevLabel={'◀'}
          prev2Label={'◁'}
          value={value}
          tileDisabled={noData}
          tileClassName={tileClassName}
        />
      </FlexDiv>
    </WindowWrapper>
  );
}

const WindowWrapper = styled('div')`
  display: flex;
  height: 100vh;
`;

const FlexDiv = styled('div')`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export default FashionCalendar;
