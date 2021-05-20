import Calendar from 'react-calendar';
import NavBar from '../components/common/NavBar';
import WindowWrapper from '../components/common/WindowWrapper';

function FashionCalendar() {
  return (
    <WindowWrapper>
      <NavBar />
      <Calendar />
    </WindowWrapper>
  );
}

export default FashionCalendar;
