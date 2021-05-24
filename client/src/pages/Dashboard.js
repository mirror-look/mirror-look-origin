import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';

const styledPhoto = {
  width: '364px',
  height: '740px',
  borderRadius: '5%',
  overflow: 'hidden',
  objectFit: 'cover'
};

function Photo({ imgSrc, imgAlt }) {
  return <img src={imgSrc} alt={imgAlt} style={styledPhoto} />;
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

function Dashboard() {
  const username = '김윤주';

  let { search } = useLocation();
  console.log(search);
  const { userId, date } = queryString.parse(search);
  console.log(userId, date);
  const imgSrc = `calendar?user_id=${userId}&date=${date}`;
  const imgAlt = 'clothes img';

  return (
    <ShowDetail>
      <PhotoBox>
        <Photo src={imgSrc} alt={imgAlt} />
      </PhotoBox>
      <Story>
        <Info date={date} username={username}></Info>
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

export default Dashboard;
