import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Item from '../common/Item';
import zIndex from '@material-ui/core/styles/zIndex';

const StyledFontLeft = {
  textAlign: 'center',
  color: 'black',
  position: 'absolute',
  top: '35%',
  left: '5%',
  fontSize: '50px',
  zIndex: '1',
  textShadow: '-1px 0 gray, 0 1px gray, 1px 0 gray, 0 -1px gray'
};

const StyledFontRight = {
  textAlign: 'center',
  color: 'black',
  position: 'absolute',
  top: '45%',
  left: '15%',
  fontSize: '50px',
  zIndex: '1',
  textShadow: '-1px 0 gray, 0 1px gray, 1px 0 gray, 0 -1px gray'
};

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
    <StyledCalendarWrapper>
      <StyledCalender>
        <Link to="/calendar">
          <h3 style={StyledFontLeft}>OOTD</h3>
          <h3 style={StyledFontRight}>CALENDAR</h3>
          <Carousel
            indicators={false}
            timeout={500}
            navButtonsAlwaysInvisible={true}
            style={{ verticalAlign: 'middle' }}
          >
            {items.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </Link>
      </StyledCalender>
    </StyledCalendarWrapper>
  );
}

const StyledCalender = styled(Box)`
  /*width: 417px;*/
  flex-grow: 1;

  height: 100%;
  overflow: hidden;

  background: #ffffff;
  /*box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);*/
  border-radius: 30px;
  /*padding: 30px;*/
  text-align: center;

  position: relative;
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

const StyledCalendarWrapper = styled.div`
  /*min-width: 300px;*/
  width: 100%;
  flex-grow: 1;
  height: 100%;
  margin: 0 15px;
`;

export default CalendarBox;
