import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import WindowWrapper from '../components/common/WindowWrapper';

function SelectedBox({ result, userSelectList, setUserSelectList }) {
  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [disabled3, setDisabled3] = useState(false);

  return (
    <div>
      <Selected>
        {result[0]}
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
            {result[1]}
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
            {result[2]}
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
            {result[3]}
          </Button>
        </ButtonBox>
      </Selected>
    </div>
  );
}

function SelectTop3() {
  let location = useLocation();
  let history = useHistory();
  const geolocationInfo = useSelector((store) => store.geolocationReducer);
  const [userSelectList, setUserSelectList] = useState();
  const [temperature, setTemperature] = useState();
  const resultList = location.state.results;
  const results = resultList.map((result, index) => (
    <SelectedBox
      result={result}
      userSelectList={userSelectList}
      setUserSelectList={setUserSelectList}
      key={index}
    ></SelectedBox>
  ));

  useEffect(() => {
    if (!temperature) {
      axios
        .post('http://localhost:5000/weather', {
          latitude: geolocationInfo[0],
          longitude: geolocationInfo[1]
        })
        .then(function (response) {
          console.log('기온 받아왔다!');
          setTemperature(response.data.current_temperatures);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  });

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
      <WindowWrapper>
        <Body>{results}</Body>
      </WindowWrapper>
      <center>
        <Button variant="contained" color="secondary" size="large">
          다시 찍을래요
        </Button>
        &nbsp;
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          size="large"
        >
          선택했어요
        </Button>
      </center>
    </div>
  );
}

const Selected = styled(Box)`
  height: 50vh;
  width: 395px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  margin: 30px;
  padding: 30px;
  text-align: center;
`;

const ButtonBox = styled(Box)`
  margin-top: 50px;
`;

const Body = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default SelectTop3;
