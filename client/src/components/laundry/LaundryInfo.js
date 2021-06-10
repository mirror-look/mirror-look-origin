import { minorCategory } from '../components/common/Category';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';

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

const LaundryInfoBox = styled('div')`
  display: flex;
  flex-direction: column;
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

export default LaundryInfo;
