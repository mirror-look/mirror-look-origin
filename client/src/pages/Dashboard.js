import queryString from 'query-string';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ShowDetail from '../components/common/ShowDetail';
import Photo from '../components/common/Photo';
import Story from '../components/common/Story';

const URL = `http://localhost:5000`;

function Info({ date, username }) {
  return (
    <div>
      <h3>
        {date.slice(0, 4)}년 {date.slice(5, 7)}월 {date.slice(8)}일
      </h3>
      <h3>{username} 님은 이런 옷을 입었네요!</h3>
    </div>
  );
}

function Dashboard({ userName }) {
  const { search } = useLocation();
  const { userId, date } = queryString.parse(search);
  const [imgSrc, setImgSrc] = useState(
    `calendar?user_id=${userId}&date=${date}`
  );

  useEffect(() => {
    console.log(`user_id ${userId}, date ${date}`);
    console.log(imgSrc);
    setImgSrc(`${URL}/calendar?user_id=${userId}&date=${date}`);
  }, []);

  if (search === '') {
    return (
      <StyledBox>
        <div> [CAUTION] 올바르지 않은 주소입니다. 뒤로가기를 눌러주세요 </div>
      </StyledBox>
    );
  }

  return (
    <ShowDetail>
      <Photo imagePath={imgSrc} />
      <Story>
        <StyledAdvice>
          <Info date={date} username={userName}></Info>
        </StyledAdvice>
      </Story>
    </ShowDetail>
  );
}

const StyledBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #8f00ff;
  font-size: 25px;
  font-weight: bold;
`;

const StyledAdvice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45px;
  border: 1px solid white;
  border-radius: 30px;
  background: #ffffff;
  height: 100%;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export default Dashboard;
