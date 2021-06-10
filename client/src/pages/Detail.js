import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ShowDetail from '../components/detail/ShowDetail';
import Photo from '../components/detail/Photo';
import Story from '../components/detail/Story';
import StyledAdvice from '../components/detail/StyledAdvice';
import StyledButton from '../components/detail/StyledButton';

function Recommend({ userName, comment }) {
  let advice1 = '';
  let advice2 = '';
  let advice3 = '';
  for (let key in comment.hot_or_cold) {
    if (key.startsWith('top') === true) {
      let advice = '';
      let line = `상의는 ${comment.hot_or_cold[key]}! `;
      for (let recTop in comment.recommended_clothes.top) {
        line = line + `${comment.recommended_clothes.top[recTop]}`;
        if (recTop < Object.keys(comment.recommended_clothes.top).length - 1) {
          line = line + ', ';
        }
      }
      line = line + '은(는) 어떠세요?';
      advice = advice + line;
      advice1 = <Box>{advice}</Box>;
    }
    if (key.startsWith('bottom') === true) {
      let advice = '';
      let line = `하의는 ${comment.hot_or_cold[key]}! `;
      for (let recBottom in comment.recommended_clothes.bottom) {
        line = line + `${comment.recommended_clothes.bottom[recBottom]}`;
        if (
          recBottom <
          Object.keys(comment.recommended_clothes.bottom).length - 1
        ) {
          line = line + ', ';
        }
      }
      line = line + '은(는) 어떠세요?';
      advice = advice + line;
      advice2 = <Box>{advice}</Box>;
    }
    if (key.startsWith('dress') === true) {
      let advice = '';
      let line = `원피스는 ${comment.hot_or_cold[key]}! `;
      for (let recDress in comment.recommended_clothes.dress) {
        line = line + `${comment.recommended_clothes.dress[recDress]}`;
        if (
          recDress <
          Object.keys(comment.recommended_clothes.dress).length - 1
        ) {
          line = line + ', ';
        }
      }
      line = line + '은(는) 어떠세요?';
      advice = advice + line;
      advice3 = <Box>{advice}</Box>;
    }
  }
  return (
    <StyledAdvice>
      <h3>오늘 {userName}님은 이런 옷을 입었군요!</h3>
      <p>{advice1}</p>
      <p>{advice2}</p>
      <p>{advice3}</p>
    </StyledAdvice>
  );
}

function Detail({ userName }) {
  const history = useHistory();
  const userInfo = useSelector((store) => store.userInfoReducer);
  const imageFullPath = useSelector((store) => store.imagePathReducer);
  const userSelects = useSelector((store) => store.userSelectsReducer);
  const imagePath = useSelector((store) => store.imageBase64Reducer);
  const location = useLocation();

  console.log('추천페이지로 넘어왔다!');
  console.log(location.state);

  function handleClick() {
    const date = new Date();
    let subCategory = [];
    for (let key in userSelects) {
      subCategory.push(userSelects[key]);
    }
    console.log('캘린더에 저장하기 클릭했다!');
    axios
      .post('http://localhost:5000/calendar', {
        ootd_img_path: imageFullPath,
        user_id: userInfo.user_id,
        clothes_subcategory: subCategory,
        date: date
      })
      .then(function (response) {
        console.log('캘린더에 분석결과 저장했다!');
        history.push('/calendar');
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  return (
    <ShowDetail>
      <Photo imagePath={'data:image/*;base64,' + imagePath} />
      <Story>
        <Recommend userName={userName} comment={location.state}></Recommend>
        <Button
          style={StyledButton}
          onClick={handleClick}
          variant="contained"
          color="primary"
        >
          캘린더에 저장하기
        </Button>
      </Story>
    </ShowDetail>
  );
}

export default Detail;
