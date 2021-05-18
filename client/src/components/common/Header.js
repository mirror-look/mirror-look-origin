import styled from 'styled-components';
import Logo from './Logo';
import UserName from './UserName';

function Header({ username }) {
  return (
    <StyledHeader>
      <Logo />
      <UserName username={username} />
    </StyledHeader>
  );
}

const StyledHeader = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default Header;
