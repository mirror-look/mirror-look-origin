import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import NavBar from '../components/common/NavBar';

function Login() {
  return (
    <Window>
      <NavBar />
      <FlexDiv>
        <StyledLogo> Mirror-Look </StyledLogo>
        <KakaoButton variant="contained">카카오로 로그인</KakaoButton>
      </FlexDiv>
    </Window>
  );
}

const Window = styled('div')``;

const FlexDiv = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const KakaoButton = styled(Button)`
  background-color: #f7e600;
  color: #3a1d1d;
  padding: 5px 100px;
  font-weight: bold;
`;

const StyledLogo = styled(Box)`
  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 40px;
  color: #8f00ff;
  margin-top: 300px;
  margin-bottom: 50px;
`;

export default Login;
