import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Header from '../components/common/Header';

function Camera() {
  const username = '김윤주';
  return (
    <MainLayout>
      <Header username={username} />
      <StyledBox>
        <Window>Drag and drop!!</Window>
        <StyledButton>
          <SearchFile>파일 찾기</SearchFile>
          <TakePhoto>촬영 하기</TakePhoto>
          <Confirm>확인</Confirm>
        </StyledButton>
      </StyledBox>
    </MainLayout>
  );
}

const MainLayout = styled('div')`
  display: flex;
  flex-direction: column;
`;

const StyledBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Window = styled(Box)`
  height: 50px;
  border-radius: 30px;
  width: 1230px;
  height: 682px;

  background: #f4f5fa;
  box-shadow: 0px 20px 100px #0057ff;
  border-radius: 30px;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 57px;
  line-height: 24px;
  /* or 42% */

  display: flex;
  align-items: center;
  justify-content: center;

  color: rgba(120, 63, 215, 0.59);

  border: 1px solid #ffffff;
`;

const StyledButton = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  width: 1230px;
  /* width 크기에 따라서 버튼 위치와 간격이 달라짐.. 어떻게 할 것인지? */
  margin: 50px;
`;

const SearchFile = styled(Button)`
  background: #ffffff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 30px;
  height: 50px;
  width: 300px;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 24px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #783fd7;
`;

const TakePhoto = styled(Button)`
  background: #ffffff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 30px;
  height: 50px;
  width: 300px;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 24px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #783fd7;
`;

const Confirm = styled(Button)`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 30px;
  background: #8a48f5;
  height: 50px;
  width: 300px;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 24px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #f4f5fa;
`;

export default Camera;
