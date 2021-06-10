import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setBase64URL } from '../store/actions';
import { setUserSelects } from '../store/actions';
import Button from '@material-ui/core/Button';
import WindowWrapper from '../components/common/WindowWrapper';
import ExceptionModal from '../components/camera/ExceptionModal';
import { majorCategory, minorCategory } from '../components/common/Category';

function SelectedBox({ result, userSelectList, setUserSelectList }) {
  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [disabled3, setDisabled3] = useState(false);

  return (
    <div>
      <Selected>
        {majorCategory[result[0]]}
        <ButtonBox>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: '20px' }}
            onClick={() => {
              setDisabled1(true);
              setDisabled2(false);
              setDisabled3(false);
              let temp = { ...userSelectList };
              temp[result[0]] = result[1];
              setUserSelectList(temp);
              console.log('선택');
            }}
            disabled={disabled1}
          >
            {minorCategory[result[1]]}
          </Button>
          <br />
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: '20px' }}
            onClick={() => {
              setDisabled1(false);
              setDisabled2(true);
              setDisabled3(false);
              let temp = { ...userSelectList };
              temp[result[0]] = result[2];
              setUserSelectList(temp);
              console.log('선택');
            }}
            disabled={disabled2}
          >
            {minorCategory[result[2]]}
          </Button>
          <br />
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: '20px' }}
            onClick={() => {
              setDisabled1(false);
              setDisabled2(false);
              setDisabled3(true);
              let temp = { ...userSelectList };
              temp[result[0]] = result[3];
              setUserSelectList(temp);
              console.log('선택');
            }}
            disabled={disabled3}
          >
            {minorCategory[result[3]]}
          </Button>
        </ButtonBox>
      </Selected>
    </div>
  );
}

function SelectTop3() {
  let history = useHistory();
  const dispatch = useDispatch();
  const temperature = useSelector((store) => store.temperatureReducer);
  const prediction = useSelector((store) => store.predictionReducer);
  const [userSelectList, setUserSelectList] = useState();
  const [modalOpen, setModalOpen] = useState();
  const modalTitle = '입고 계신 옷을 찾지 못했어요 ㅠ';
  const modalComment = `튜토리얼을 참고하여 다시 찍어주세요!`;
  const [results, setResults] = useState();

  useEffect(() => {
    if (!!prediction) {
      if (prediction.length !== 0) {
        let _results = prediction.map((result, index) => (
          <SelectedBox
            result={result}
            userSelectList={userSelectList}
            setUserSelectList={setUserSelectList}
            key={index}
          />
        ));
        setResults(_results);
      } else {
        setModalOpen(true);
      }
    }
    console.log(userSelectList);
  }, [prediction, userSelectList]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setUserSelects(userSelectList));
    let category = [];
    for (let key in userSelectList) {
      console.log(key);
      category.push(key);
      console.log(category);
    }
    axios
      .post('http://localhost:5000/recommend', {
        selected_clothes_from_top_3_result: category,
        temperature_from_openweather_api: temperature
      })
      .then(function (response) {
        console.log('사용자가 선택한 카테고리 보내서 예측 결과 받아왔다!');
        console.log('분석 결과 페이지로 간다!');
        history.push({ pathname: '/detail', state: response.data });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <div>
      {modalOpen === true ? (
        <ExceptionModal
          setModalOpen={setModalOpen}
          modalOpen={true}
          modalTitle={modalTitle}
          modalComment={modalComment}
        />
      ) : (
        <WindowWrapper>
          <Body>{results}</Body>
          <center>
            <Button
              onClick={() => {
                dispatch(setBase64URL(''));
                history.push('/camera');
              }}
              variant="contained"
              color="secondary"
              size="large"
              style={styledButtonAgain}
            >
              다시 찍을래요
            </Button>
            &nbsp;
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              size="large"
              style={styledButton}
            >
              선택했어요
            </Button>
          </center>
        </WindowWrapper>
      )}
    </div>
  );
}

export default SelectTop3;
