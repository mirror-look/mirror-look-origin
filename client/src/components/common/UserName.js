import styled from 'styled-components';
import Button from '@material-ui/core/Button';

function UserName({ userName }) {
  return <StyledUserName>{userName}님</StyledUserName>;
}

const StyledUserName = styled(Button)`
  margin: 25px 25px;
`;

export default UserName;
