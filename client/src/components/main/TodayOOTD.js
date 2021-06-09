import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Item from '../common/Item';

const StyledFontLeft = {
  textAlign: 'center',
  color: 'white',
  position: 'absolute',
  top: '35%',
  left: '5%',
  fontSize: '50px',
  zIndex: '1',
  textShadow: '-1px 0 gray, 0 1px gray, 1px 0 gray, 0 -1px gray'
};

const StyledFontRight = {
  textAlign: 'center',
  color: 'white',
  position: 'absolute',
  top: '45%',
  left: '25%',
  fontSize: '50px',
  zIndex: '1',
  textShadow: '-1px 0 gray, 0 1px gray, 1px 0 gray, 0 -1px gray'
};

function TodayOOTD(props) {
  var items = [
    {
      label: 'mirror1',
      imgPath: '/images/mirror_1.jpg'
    },
    {
      label: 'mirror2',
      imgPath: '/images/mirror_2.jpg'
    },
    {
      label: 'mirror3',
      imgPath: '/images/mirror_3.jpg'
    }
  ];
  return (
    <StyledOOTD>
      <TodayOOTDBox>
        <Link to="/camera">
          <h3 style={StyledFontLeft}>OOTD</h3>
          <h3 style={StyledFontRight}>CAMERA</h3>
          <Carousel
            indicators={false}
            timeout={500}
            navButtonsAlwaysInvisible={true}
          >
            {items.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </Link>
      </TodayOOTDBox>
    </StyledOOTD>
  );
}

const TodayOOTDBox = styled(Box)`
  /*width: 395px;*/
  flex-grow: 1;

  height: 100%;
  background: #ffffff;
  /*box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);*/
  border-radius: 30px;
  overflow: hidden;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  /*padding: 30px;*/
  text-align: center;
  position: relative;
`;

const StyledOOTD = styled.div`
  /*min-width: 300px;*/
  width: 100%;
  flex-grow: 1;
  height: 100%;
  margin: 0 15px;
`;

export default TodayOOTD;
