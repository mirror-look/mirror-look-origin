import { ClientID } from '../Config';
import StyledLogo from '../components/login/StyledLogo';
import KakaoButton from '../components/login/KakaoButton';
import FlexDiv from '../components/login/FlexDiv';

function Login() {
  function handleClick() {
    console.log('로그인 클릭했다!');
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${ClientID}&redirect_uri=http://localhost:3000/oauth/callback/kakao&response_type=code`;
  }

  return (
    <FlexDiv>
      <StyledLogo> Mirror-Look </StyledLogo>
      <KakaoButton onClick={handleClick} variant="contained">
        카카오로 로그인
      </KakaoButton>
    </FlexDiv>
  );
}

export default Login;
