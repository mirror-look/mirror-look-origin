import queryString from 'query-string';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';

const URL = `http://localhost:5000`;

const styledPhoto = {
  width: '364px',
  height: '740px',
  borderRadius: '5%',
  overflow: 'hidden',
  objectFit: 'cover'
};

function Info({ date, username }) {
  return (
    <div>
      <h3>
        {date.slice(0, 4)}년 {date.slice(5, 7)}월 {date.slice(8)}일 {username}
        님은 이런 옷을 입었네요!
      </h3>
    </div>
  );
}

function Photo({ src, alt }) {
  return <img src={src} alt={alt} style={styledPhoto} />;
}

function Dashboard({ userName }) {
  const imgAlt = 'clothes img';
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
      <PhotoBox>
        <Photo src={imgSrc} alt={imgAlt} />
      </PhotoBox>
      <Story>
        <Info date={date} username={userName}></Info>
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

const ShowDetail = styled('div')`
  display: flex;
  flex-direction: row;
`;

const PhotoBox = styled(Box)`
  width: 364px;
  height: 740px;

  background: #ffffff;
  box-shadow: 0px 20px 100px #0057ff;
  border-radius: 30px;
  margin: 50px;
`;

const Story = styled('div')`
  display: flex;
  flex-direction: column;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 40px;
  /* or 160% */

  margin: 50px;

  color: #000000;
`;

export default Dashboard;
