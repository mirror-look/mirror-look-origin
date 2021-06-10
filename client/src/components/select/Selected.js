import styled from 'styled-components';
import Box from '@material-ui/core/Box';

const Selected = styled(Box)`
  height: 100%;
  width: 330px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  margin: 0 15px 120px 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export default Selected;
