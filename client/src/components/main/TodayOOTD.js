import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Item from '../common/Item';

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
    <TodayOOTDBox>
      <Link to="/camera">
        OOTD CAMERA
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
  );
}

const TodayOOTDBox = styled(Box)`
  /*width: 395px;*/
  flex-grow: 1;

  height: 764px;
  background: #ffffff;
  /*box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);*/
  border-radius: 30px;
  overflow: hidden;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  margin: 15px;
  /*padding: 30px;*/
  text-align: center;
`;

export default TodayOOTD;
