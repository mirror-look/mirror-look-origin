import { Link } from 'react-router-dom';

import styled from 'styled-components';
import Logo from './Logo';
import UserName from './UserName';

function Header({ userName }) {
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
