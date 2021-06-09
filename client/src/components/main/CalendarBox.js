import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Item from '../common/Item';

function CalendarBox() {
  var items = [
    {
      label: 'mirror1',
      imgPath: '/images/calendar_1.jpg'
    },
    {
      label: 'mirror2',
      imgPath: '/images/calendar_2.jpg'
    },
    {
      label: 'mirror3',
      imgPath: '/images/calendar_3.jpg'
    }
  ];
  return (
    <StyledCalender>
      <Link to="/calendar">
        OOTD CALENDAR
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
    </StyledCalender>
  );
}

const StyledCalender = styled(Box)`
  /*width: 417px;*/
  flex-grow: 1;

  height: 764px;
  overflow: hidden;

  background: #ffffff;
  /*box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);*/
  border-radius: 30px;
  margin: 15px;
  /*padding: 30px;*/
  text-align: center;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  a {
    text-decoration: none;
    color: #8f00ff;
  }
  /* identical to box height, or 120% */
`;

export default CalendarBox;
