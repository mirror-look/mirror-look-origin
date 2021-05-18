import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Header from '../components/common/Header';

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

function Info({ username }) {
  return (
    <div>
      <h3>오늘 {username}님은 이런 옷을 입었군요!</h3>
      <p>오늘 서울 지역은 최고기온 24도, 최저기온 18도입니다.</p>
      <p>
        옷이 조금 더울 수 있을 것 같아요! 가벼운 반팔과 반바지를 입어보는 것은
        어떨까요?
      </p>
    </div>
  );
}

function Recommend({ username }) {
  return (
    <div>
      <h3>{username}님, 이런 색상의 옷은 어떨까요?</h3>
      <p>분석 결과 {username}님의 옷은 파란색과 좋은 조합이 될 것 같아요!</p>
    </div>
  );
}

function Detail() {
  const username = '김윤주';
  return (
    <MainLayout>
      <Header username={username} />
      <ShowDetail>
        <PhotoBox>
          <Photo />
        </PhotoBox>
        <Story>
          <Info username={username}></Info>
          <Recommend username={username}></Recommend>
        </Story>
      </ShowDetail>
    </MainLayout>
  );
}

const MainLayout = styled('div')`
  display: flex;
  flex-direction: column;
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

export default Detail;
