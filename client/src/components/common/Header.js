import styled from 'styled-components';
import Logo from './Logo';
import UserName from './UserName';

function Header({ userName }) {
  return (
    <StyledHeader>
      <Logo />
      <UserName userName={userName} />
    </StyledHeader>
  );
}

const StyledHeader = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default Header;
