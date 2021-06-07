import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Photo() {
  return (
    <img
      src="https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2232&q=80"
      alt="사진"
      width="364px"
      height="740px"
      border="1px solid black"
      border-radius="30%"
      overflow="hidden"
      object-fit="cover"
    />
  );
}

function Recommend({ userName, comment }) {
  let advice1 = '';
  let advice2 = '';
  let advice3 = '';
  for (let key in comment.hot_or_cold) {
    if (key.startsWith('top') === true) {
      let advice = '';
      let line = `상의는 ${comment.hot_or_cold[key]}! `;
      for (let recTop in comment.recommended_clothes.top) {
        line = line + `${comment.recommended_clothes.top[recTop]}`;
        if (recTop < Object.keys(comment.recommended_clothes.top).length - 1) {
          line = line + ', ';
        }
      }
      line = line + '은(는) 어떠세요?';
      advice = advice + line;
      advice1 = <Box>{advice}</Box>;
    }
    if (key.startsWith('bottom') === true) {
      let advice = '';
      let line = `하의는 ${comment.hot_or_cold[key]}! `;
      for (let recBottom in comment.recommended_clothes.bottom) {
        line = line + `${comment.recommended_clothes.bottom[recBottom]}`;
        if (
          recBottom <
          Object.keys(comment.recommended_clothes.bottom).length - 1
        ) {
          line = line + ', ';
        }
      }
      line = line + '은(는) 어떠세요?';
      advice = advice + line;
      advice2 = <Box>{advice}</Box>;
    }
    if (key.startsWith('dress') === true) {
      let advice = '';
      let line = `원피스는 ${comment.hot_or_cold[key]}! `;
      for (let recDress in comment.recommended_clothes.dress) {
        line = line + `${comment.recommended_clothes.dress[recDress]}`;
        if (
          recDress <
          Object.keys(comment.recommended_clothes.dress).length - 1
        ) {
          line = line + ', ';
        }
      }
      line = line + '은(는) 어떠세요?';
      advice = advice + line;
      advice3 = <Box>{advice}</Box>;
    }
  }
  return (
    <div>
      <h3>오늘 {userName}님은 이런 옷을 입었군요!</h3>
      <p>{advice1}</p>
      <p>{advice2}</p>
      <p>{advice3}</p>
    </div>
  );
}

function Detail() {
  const userName = '김윤주';
  let location = useLocation();

  console.log('추천페이지로 넘어왔다!');
  console.log(location.state);

  return (
    <ShowDetail>
      <PhotoBox>
        <Photo />
      </PhotoBox>
      <Story>
        <Recommend userName={userName} comment={location.state}></Recommend>
      </Story>
    </ShowDetail>
  );
}

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

export default Detail;