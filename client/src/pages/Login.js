import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Logo from '../components/common/Logo';

function Login() {
  return (
    <FlexDiv>
      <Logo />
      <KakaoButton variant="contained">카카오로 로그인</KakaoButton>
    </FlexDiv>
  );
}

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

export default Login;
