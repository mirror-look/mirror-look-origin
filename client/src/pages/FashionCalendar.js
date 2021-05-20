import React, { useState } from 'react';
import Calendar from 'react-calendar';
import NavBar from '../components/common/NavBar';
import styled from 'styled-components';
import Header from '../components/common/Header';
import 'react-calendar/dist/Calendar.css';
import './FashionCalendar.css';

function FashionCalendar() {
  const [value, setValue] = useState(new Date());
  const username = '김윤주';
  return (
    <WindowWrapper>
      <NavBar />
      <FlexDiv>
        <Header username={username} />
        <Calendar onChange={setValue} value={value} />
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
