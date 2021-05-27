import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Logo from './Logo';
import UserName from './UserName';

function Header() {
  const [userName, setUserName] = useState();
  useEffect(() => {
    const token = `Bearer ${window.sessionStorage.getItem('token')}`;
    axios
      .get('http://localhost:5000/userinfo', {
        headers: {
          Authorization: token
        }
      })
      .then(function (response) {
        console.log('헤더에 사용자 이름 받아왔다!');
        setUserName(response.data.user_info.user_name);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <StyledHeader>
      <Link to="/">
        <Logo />
      </Link>
      <UserName userName={userName} />
    </StyledHeader>
  );
}

const StyledHeader = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  a {
    text-decoration: none;
  }
`;

export default Header;
