import axios from 'axios';
import { useEffect, useState } from 'react';

import AgreementModal from '../components/common/AgreementModal';

function OAuthRedirectHandler({ history }) {
  const [token, setToken] = useState();
  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    // if (!!code & !!agreement) {
    //   let data = { agreement: agreement };

    // }
    //if (!!agreement & !!token) {
    //  console.log('동의여부랑 토큰 다 있다!');
    //  console.log(agreement);
    //  console.log(token);
    //  let data = { agreement: agreement };
    //  const access = `Bearer ${token}`;
    //  axios
    //    .put('http://localhost:63712/userinfo', data, {
    //      headers: {
    //        Authorization: access
    //      }
    //    })
    //    .then(function (response) {
    //      console.log('위치동의여부 보냈다!');
    //      console.log(response.data);
    //      history.push('/');
    //    })
    //    .catch(function (err) {
    //      console.log(err);
    //    });
    //} else if (!token) {
    axios
      .get(`http://127.0.0.1:63712/kakaoOauth/callback?code=${code}`)
      .then(function (response) {
        console.log('토큰 받아왔다!');
        setToken(response.data.token);
        window.sessionStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch(function (err) {
        console.log(err);
      });
    //}
  }, []);

  return <div></div>;
}

export default OAuthRedirectHandler;
