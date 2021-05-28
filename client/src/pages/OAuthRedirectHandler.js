import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import Calendar from 'react-calendar';

function OAuthRedirectHandler() {
  const history = useHistory();
  let code = new URL(window.location.href).searchParams.get('code');
  useEffect(() => {
    if (!!code) {
      axios
        .get(`http://localhost:5000/kakaoOauth/callback?code=${code}`)
        .then(function (response) {
          console.log('토큰 받아왔다!');
          console.log('토큰 세션에 넣었다!');
          window.sessionStorage.setItem('token', response.data.token);
          console.log('메인 페이지로 간다!');
          history.push('/');
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }, [code]);

  return <div></div>;
}

export default OAuthRedirectHandler;
