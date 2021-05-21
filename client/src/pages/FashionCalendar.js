import React, { useState } from 'react';
import Calendar from 'react-calendar';
import NavBar from '../components/common/NavBar';
import styled from 'styled-components';
import Header from '../components/common/Header';
import 'react-calendar/dist/Calendar.css';
import './FashionCalendar.css';

//데이터가 없는 날짜는 비활성화 시킨다.
const hehe = ({ activeStartDate, date, view }) => date.getDay() === 1;

// 날짜를 클릭했을 때, 페이지 전환 후 해당 날짜에 해당하는 데이터를 서버에 요청. 쿼리스트링 방식.
const onClickDay = (value, event) => alert('New date is: ', value);

const tileClassName = ({ date }) => (date.getDay() === 0 ? 'sunday' : '');

function FashionCalendar() {
  const [value, setValue] = useState(new Date());
  const username = '김윤주';
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
          tileDisabled={hehe}
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
