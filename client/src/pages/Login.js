import { useState, useEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import AgreementModal from '../components/common/AgreementModal';

function Login({ history }) {
  const [loginReq, setLoginReq] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [agreement, setAgreement] = useState();

  const modalTitle = '위치 정보 제공 동의';
  const modalComment =
    'Mirror-Look은 날씨 기반 추천 서비스예요. \n저희가 김윤주 님의 위치 정보를 열람해도 될까요?';

  useEffect(() => {
    if (loginReq !== false) {
      axios
        .get('http://localhost:5000/kakaoOauth/login')
        .then(function (response) {
          console.log(response.data);
        });
    }
  }, [loginReq]);

  function handleClick(e) {
    console.log('로그인 클릭했다!');
    setModalOpen(true);
    //setLoginReq(true);
  }

  if (agreement === true) {
    history.push('/');
  }

  return (
    <FlexDiv>
      <StyledLogo> Mirror-Look </StyledLogo>
      <KakaoButton onClick={handleClick} variant="contained">
        카카오로 로그인
      </KakaoButton>
      {modalOpen === true ? (
        <AgreementModal
          setAgreement={setAgreement}
          modalTitle={modalTitle}
          modalComment={modalComment}
        />
      ) : (
        ''
      )}
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
