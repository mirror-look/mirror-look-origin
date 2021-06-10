import styled from 'styled-components';
import Box from '@material-ui/core/Box';

const Styledimage = {
  width: '100%',
  height: '100%',
  border: '1px solid black',
  borderRadius: '30px'
};

function Photo({ imagePath }) {
  return (
    <PhotoBox>
      <img style={Styledimage} src={imagePath} alt="사진" />
    </PhotoBox>
  );
}

const PhotoBox = styled(Box)`
  width: 35%;
  height: 100%;
  overflow: 'hidden';
  flex-grow: 1;

  background: #ffffff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  border-radius: 30px;
  margin: 0 15px;
`;

export default Photo;
