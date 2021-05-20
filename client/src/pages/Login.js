import { useEffect, useState } from 'react';
import axios from 'axios';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import NavBar from '../components/common/NavBar';
import WindowWrapper from '../components/common/WindowWrapper';
import AgreementModal from '../components/common/AgreementModal';

const { Kakao } = window;

function Login({ history }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [kakaoId, setKakaoId] = useState();
  const [agreement, setAgreement] = useState();
  const [userName, setUserName] = useState();
  const [imageUrl, setImageUrl] = useState('');

  const modalTitle = '위치 정보 제공 동의';
  const modalComment =
    'Mirror-Look은 날씨 기반 추천 서비스예요. 저희가 ' +
    userName +
    '님의 위치 정보를 열람해도 될까요?';

  useEffect(() => {
    if (!!agreement & !!userName) {
      let data = {
        kakao_id: kakaoId,
        user_name: userName,
        agreement: agreement
      };
      console.log('useEffect 실행됐다! : ', data);
      axios
        .put('https://localhost:5000/login', data)
        .then(function (response) {
          console.log('정보 입력 성공!');
          console.log(response);
          history.push({ pathname: '/', state: data });
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }, [agreement, userName]);

  function kakaoLogin() {
    Kakao.Auth.login({
      success: function (response) {
        Kakao.API.request({
          url: '/v2/user/me',
          data: {
            property_keys: ['kakao_account.profile']
          },
          success: function (response) {
            console.log(response);
            console.log('KakaoId 받아왔다! : ', response.id);
            setKakaoId(response.id);
            setUserName(response.kakao_account.profile.nickname);
            setImageUrl(response.kakao_account.profile.thumbnail_image_url);
            setModalOpen(true);
          },
          fail: function (error) {
            console.log(error);
          }
        });
      },
      fail: function (error) {
        console.log(error);
      }
    });
  }

  function kakaoLogout() {
    if (Kakao.Auth.getAccessToken()) {
      Kakao.API.request({
        url: '/v1/user/unlink',
        success: function (response) {
          console.log(response);
        },
        fail: function (error) {
          console.log(error);
        }
      });
      Kakao.Auth.setAccessToken(undefined);
    }
  }

  function handleClick(e) {
    console.log('로그인 클릭했다!');
    kakaoLogin();
  }

  if ((agreement === true) & (userName === true)) {
    history.push('/');
  }

  return (
    <WindowWrapper>
      <NavBar />
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
    </WindowWrapper>
  );
}

const FlexDiv = styled('div')`
  display: flex;
  width: 100%;
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
  margin: 50px;
`;

export default Login;
