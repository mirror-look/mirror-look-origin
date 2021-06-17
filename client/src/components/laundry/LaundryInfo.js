import { minorCategory } from '../common/Category';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';

function Laundry({ subCategory, recommend }) {
  console.log(recommend);
  console.log(recommend[0]);
  const recommendList = recommend.map((rec, index) => {
    return (
      <ul>
        <li>{rec}</li>
      </ul>
    );
  });
  return (
    <LaundryBox>
      <StyledSubCategory>{minorCategory[subCategory]}</StyledSubCategory>
      <LaundryComment>{recommendList}</LaundryComment>
    </LaundryBox>
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
      <h3 style={{ textAlign: 'center' }}>세탁은 이렇게 해요!</h3>
      <LaundryInfoBox>{results}</LaundryInfoBox>
      <Warning>
        세탁 추천은 간편한 세탁을 위한 참고용입니다. <br /> 고급의류는 의류의
        라벨을 확인해주세요!
      </Warning>
    </div>
  );
}

const LaundryComment = styled(Box)`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 15px;
  align-items: left;
  text-align: left;
`;

const StyledSubCategory = styled(Box)`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: left;
`;

const LaundryBox = styled(Box)`
  background: #ffffff;
  border-radius: 30px;
  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  flex-direction: row;
`;

const LaundryInfoBox = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Warning = styled('div')`
  display: flex;
  flex-direction: column;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
  text-align: center;
`;

export default LaundryInfo;
