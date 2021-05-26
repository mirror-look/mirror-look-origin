import axios from 'axios';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useHistory } from 'react-router';

import AgreementModal from '../components/common/AgreementModal';

function OAuthRedirectHandler() {
  const history = useHistory();
  const [token, setToken] = useState();
  let code = new URL(window.location.href).searchParams.get('code');
  useEffect(() => {
    axios
      .get(`http://localhost:5000/kakaoOauth/callback?code=${code}`)
      .then(function (response) {
        console.log('토큰 받아왔다!');
        setToken(response.data.token);
        window.sessionStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [token]);

  return <div></div>;
}

export default OAuthRedirectHandler;
