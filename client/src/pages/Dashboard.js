import queryString from 'query-string';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { minorCategory } from '../components/common/Category';

const URL = `http://localhost:5000`;

const styledPhoto = {
  width: '364px',
  height: '740px',
  borderRadius: '5%',
  overflow: 'hidden',
  objectFit: 'cover'
};

function Laundry({ subCategory, recommend }) {
  console.log(recommend);
  console.log(recommend[0]);
  const recommendList = recommend.map((rec, index) => {
    return <div>{rec}</div>;
  });
  return (
    <div>
      <LaundryBox>
        <LaundryComment>{minorCategory[subCategory]}</LaundryComment>
        <LaundryComment>{recommendList}</LaundryComment>
      </LaundryBox>
    </div>
  );
}

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

function LaundryInfo({ comment }) {
  let results = Object.keys(comment).map((subCategory, index) => (
    <Laundry
      subCategory={subCategory}
      recommend={comment[subCategory]}
      key={index}
    ></Laundry>
  ));
  return (
    <div>
      <h3>세탁은 이렇게 해요!</h3>
      <LaundryInfoBox>{results}</LaundryInfoBox>
      <Warning>
        세탁 추천은 간편한 세탁을 위한 참고용입니다. 고급의류는 의류의 라벨을
        확인해주세요!
      </Warning>
    </div>
  );
}

function Photo({ src, alt }) {
  return <img src={src} alt={alt} style={styledPhoto} />;
}

function Dashboard({ userName }) {
  const laundryRecommend = useSelector(
    (store) => store.laundryRecommendReducer
  );
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
        <LaundryInfo comment={laundryRecommend} />
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

const LaundryInfoBox = styled('div')`
  display: flex;
  flex-direction: column;
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

const Warning = styled('div')`
  display: flex;
  flex-direction: column;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 5px;
  line-height: 40px;
  /* or 160% */
  margin: 50px;
  color: #000000;
`;

const LaundryComment = styled(Box)`
  /*margin-top: 50px;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LaundryBox = styled(Box)`
  height: 20vh;
  width: 40vw;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  margin: 0 15px 40px 15px;
  padding: 0 15px 50px 15px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /*align-items: center;*/
`;

export default Dashboard;
