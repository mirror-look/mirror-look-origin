import queryString from 'query-string';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ShowDetail from '../components/detail/ShowDetail';
import Photo from '../components/detail/Photo';
import Story from '../components/detail/Story';
import StyledAdvice from '../components/detail/StyledAdvice';
import StyledBox from '../components/detail/StyledBox';
import { Info } from '../components/detail/Info';
import LaundryInfo from '../components/laundry/LaundryInfo';

const URL = `http://localhost:5000`;

function Dashboard({ userName }) {
  const laundryRecommend = useSelector(
    (store) => store.laundryRecommendReducer
  );
  const { search } = useLocation();
  const { userId, date } = queryString.parse(search);
  const [imgSrc, setImgSrc] = useState(
    `calendar?user_id=${userId}&date=${date}`
  );

  useEffect(() => {
    console.log(`user_id ${userId}, date ${date}`);
    console.log(imgSrc);
    setImgSrc(`${URL}/calendar?user_id=${userId}&date=${date}`);
  }, []);

  if (search === '') {
    return (
      <StyledBox>
        <div> [CAUTION] 올바르지 않은 주소입니다. 뒤로가기를 눌러주세요 </div>
      </StyledBox>
    );
  }

  return (
    <ShowDetail>
      <Photo imagePath={imgSrc} />
      <Story>
        <StyledAdvice>
          <Info date={date} username={userName} />
          <LaundryInfo comment={laundryRecommend} />
        </StyledAdvice>
      </Story>
    </ShowDetail>
  );
}

export default Dashboard;
