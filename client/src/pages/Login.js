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

//const FlexDiv = styled('div')`
//  display: flex;
//  width: 100%;
//  height: 100vh;
//  flex-direction: column;
//  justify-content: center;
//  align-items: center;
//  transform: translate(0px, -32px);
//`;

//const KakaoButton = styled(Button)`
//  background-color: #f7e600;
//  color: #3a1d1d;
//  padding: 10px 150px;
//  font-weight: bold;
//  font-size: 18px;
//`;

//const StyledLogo = styled(Box)`
//  font-family: Rubik;
//  font-style: normal;
//  font-weight: bold;
//  font-size: 75px;
//  line-height: 40px;
//  color: #8f00ff;
//  margin: 50px;
//`;

export default Login;
