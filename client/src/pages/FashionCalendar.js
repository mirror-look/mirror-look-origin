import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLaundryRecommend } from '../store/actions';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './FashionCalendar.css';
import axios from 'axios';
import WindowWrapper from '../components/common/WindowWrapper';
import { getFormatDate } from '../utils';
import NextLabel from '../components/calendar/NextLabel';
import Next2Label from '../components/calendar/Next2Label';
import PrevLabel from '../components/calendar/PrevLabel';
import Prev2Label from '../components/calendar/Prev2Label';

const URL = 'http://localhost:5000';

const tileClassName = ({ date }) => (date.getDay() === 0 ? 'sunday' : '');

function FashionCalendar({ userId }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(new Date());
  const [dates, setDates] = useState([]);
  const history = useHistory();

  //데이터가 없는 날짜는 비활성화 시킨다.
  const isData = ({ date, view }) => {
    return view === 'month' && !dates.some((d) => d === getFormatDate(date));
  };

  // 날짜를 클릭했을 때, 페이지 전환 후 해당 날짜에 해당하는 데이터를 서버에 요청. 쿼리스트링 방식.
  const onClickDay = (date, event) => {
    console.log(date, userId);
    let formatDate = getFormatDate(date);
    let realDate = new Date(formatDate);
    axios
      .get(`${URL}/recommend`, {
        params: {
          user_id: userId,
          date: realDate
        },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(function (response) {
        console.log(response.data);
        console.log('세탁방법 받아왔다!');
        dispatch(setLaundryRecommend(response.data.laundry_recommended));
        console.log(getFormatDate(date));
        history.push(`/dashboard?userId=${userId}&date=${getFormatDate(date)}`);
      })
      .catch(function (err) {
        console.log('세탁방법 못받아왔다!');
        console.log(err);
      });
  };

  useEffect(() => {
    const token = `Bearer ${window.sessionStorage.getItem('token')}`;
    const getDate = async () => {
      try {
        const { data } = await axios.get(`${URL}/calendar`, {
          headers: { Authorization: token },
          params: {
            user_id: userId,
            month:
              value.getMonth() < 10
                ? '0' + (value.getMonth() + 1)
                : value.getMonth() + 1
          }
        });
        console.log('data == ', data);
        console.log('userID -- ', userId);
        setDates(data.ootd_enrolled_dates);
      } catch (e) {
        console.error(e);
        setDates([
          '2021-04-03',
          '2021-05-01',
          '2021-05-25',
          '2021-05-17',
          '2021-04-11'
        ]);
      }
    };
    getDate();
  }, [userId, value]);

  console.log('0' + (value.getMonth() + 1));

  return (
    <WindowWrapper>
      <Calendar
        //onChange={setValue}
        onClickDay={onClickDay}
        nextLabel={<NextLabel />}
        next2Label={<Next2Label />}
        prevLabel={<PrevLabel />}
        prev2Label={<Prev2Label />}
        value={value}
        tileDisabled={isData}
        tileClassName={tileClassName}
        onActiveStartDateChange={({ activeStartDate }) => {
          setValue(activeStartDate);
          console.log(activeStartDate);
        }}
      />
    </WindowWrapper>
  );
}

export default FashionCalendar;
