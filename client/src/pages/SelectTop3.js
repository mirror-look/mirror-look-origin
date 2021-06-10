import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setBase64URL } from '../store/actions';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import WindowWrapper from '../components/common/WindowWrapper';
import ExceptionModal from '../components/camera/ExceptionModal';

function onClickButton(
  i,
  userSelectList,
  setUserSelectList,
  disabled,
  setDisaled,
  result
) {
  console.log('i == ', i);
  const isdisabled = disabled.map((item, idx) => {
    console.log(idx);
    if (idx === i - 1) {
      return true;
    } else {
      return false;
    }
  });
  console.log(isdisabled);
  setDisaled(isdisabled);
  let temp = { ...userSelectList };
  temp[result[0]] = result[i];
  setUserSelectList(temp);
  console.log('선택');
}

const styledSelectButton = {
  filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))',
  //backgroundColor: '#8f00ff',
  margin: '15px',
  borderRadius: '30px',
  height: '50px',
  width: '300px',

  fontFamily: 'Rubik',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '25px',
  lineHeight: '24px'
};

function SelectButton({
  i,
  userSelectList,
  setUserSelectList,
  disabled,
  setDisaled,
  result
}) {
  return (
    <Button
      variant="outlined"
      color="primary"
      style={styledSelectButton}
      onClick={() => {
        onClickButton(
          i,
          userSelectList,
          setUserSelectList,
          disabled,
          setDisaled,
          result
        );
      }}
      disabled={disabled[i - 1]}
    >
      {result[i]}
    </Button>
  );
}

function SelectedBox({ result, userSelectList, setUserSelectList }) {
  const [disabled, setDisaled] = useState([false, false, false]);

  return (
    <div>
      <Selected>
        <h2>{result[0]}</h2>
        <ButtonBox>
          <SelectButton
            i={1}
            userSelectList={userSelectList}
            setUserSelectList={setUserSelectList}
            disabled={disabled}
            setDisaled={setDisaled}
            result={result}
          />
          <SelectButton
            i={2}
            userSelectList={userSelectList}
            setUserSelectList={setUserSelectList}
            disabled={disabled}
            setDisaled={setDisaled}
            result={result}
          />
          <SelectButton
            i={3}
            userSelectList={userSelectList}
            setUserSelectList={setUserSelectList}
            disabled={disabled}
            setDisaled={setDisaled}
            result={result}
          />
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
          ></SelectedBox>
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
    console.log(userSelectList);
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

const styledButton = {
  filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))',
  backgroundColor: '#8f00ff',
  margin: '50px 15px',
  borderRadius: '30px',
  height: '50px',
  width: '300px',

  fontFamily: 'Rubik',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '25px',
  lineHeight: '24px'
};

const styledButtonAgain = {
  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  backgroundColor: '#ccacff',
  margin: '0 15px',
  borderRadius: '30px',
  height: '50px',
  width: '300px',

  fontFamily: 'Rubik',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '25px',
  lineHeight: '24px'
};

const Selected = styled(Box)`
  height: 50vh;
  width: 330px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  margin: 0 15px 50px 15px;
  /*padding: 0 15px 50px 15px;*/
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /*align-items: center;*/
`;

const ButtonBox = styled(Box)`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Body = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default SelectTop3;
