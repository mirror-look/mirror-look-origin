import { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Webcam from 'react-webcam';
import DragDrop from '../components/camera/DragDrop';
import Countdown from '../components/camera/Countdown';
import Tutorial from '../components/camera/Tutorial';

const videoConstraints = {
  facingMode: 'user'
};

function Camera() {
  const history = useHistory();
  const [countdown, setCountdown] = useState();
  const [cam, setCam] = useState();
  const [dragDrop, setDragDrop] = useState();
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    let imageSrc = webcamRef.current.getScreenshot();
    console.log('촬영했다!');
    let imageBase64 = imageSrc.split(',')[1];
    axios
      .post('http://localhost:63094/classification/upload', {
        image_base64: imageBase64
      })
      .then(function (response) {
        console.log('촬영된 Base64 이미지 보내서 예측 결과 가져왔다!');
        console.log('선택 페이지로 간다!');
        history.push({
          pathname: '/select',
          state: { results: response.data.result }
        });
      })
      .catch(function (err) {
        console.log('촬영된 Base64 이미지 보냈는데 예측 결과 못가져왔다!');
        console.log(err);
      });
  }, [webcamRef]);

  function handleConfirm() {
    console.log('이미지 확인 클릭했다!');
    if (cam === true) {
      setCountdown(true);
      setTimeout(function () {
        setCountdown(false);
        console.log('촬영 준비!');
        capture();
      }, 5000);
    } else if (
      (dragDrop === true) &
      !!window.sessionStorage.getItem('uploadedImage')
    ) {
      console.log('업로드된 이미지 보낼 준비!');
      let imageBase64 = window.sessionStorage.getItem('uploadedImage');
      axios
        .post('http://localhost:63094/classification/upload', {
          image_base64: imageBase64
        })
        .then(function (response) {
          console.log('업로드된 Base64 이미지 보내서 예측 결과 가져왔다!');
          console.log('선택 페이지로 간다!');
          history.push({
            pathname: '/select',
            state: { results: response.data.result.top_3_result }
          });
        })
        .catch(function (err) {
          console.log('업로드된 Base64 이미지 보냈는데 예측 결과 못가져왔다!');
          console.log(err);
        });
    }
  }
  return (
    <StyledBox>
      <Window>
        {!cam && !dragDrop ? <Tutorial /> : ''}
        {cam === true ? (
          <Webcam
            style={{
              height: '100%',
              width: '100%'
            }}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/*"
            videoConstraints={videoConstraints}
          />
        ) : (
          ''
        )}
        {countdown === true ? (
          <CountdownBox>
            <Countdown />
          </CountdownBox>
        ) : (
          ''
        )}
        {dragDrop === true ? <DragDrop /> : ''}
      </Window>
      <StyledButton>
        <SearchFile
          onClick={() => {
            console.log('파일업로드 클릭했다!');
            setCam(false);
            setDragDrop(true);
          }}
        >
          파일업로드
        </SearchFile>
        <TakePhoto
          onClick={() => {
            console.log('촬영하기 클릭했다!');
            setCam(true);
            setDragDrop(false);
          }}
        >
          촬영하기
        </TakePhoto>
        <Confirm onClick={handleConfirm}>확인</Confirm>
      </StyledButton>
    </StyledBox>
  );
}

const StyledBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Window = styled(Box)`
  border-radius: 30px;
  width: 1230px;
  height: 682px;
  background: #f4f5fa;
  box-shadow: 0px 20px 100px #0057ff;
  border-radius: 30px;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 57px;
  line-height: 24px;
  /* or 42% */

  display: flex;
  align-items: center;
  justify-content: center;

  color: rgba(120, 63, 215, 0.59);

  border: 1px solid #ffffff;
`;

const StyledButton = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  width: 1230px;
  /* width 크기에 따라서 버튼 위치와 간격이 달라짐.. 어떻게 할 것인지? */
  margin: 50px;
`;

const SearchFile = styled(Button)`
  background: #ffffff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 30px;
  height: 50px;
  width: 300px;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 24px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #783fd7;
`;

const TakePhoto = styled(Button)`
  background: #ffffff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 30px;
  height: 50px;
  width: 300px;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 24px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #783fd7;
`;

const Confirm = styled(Button)`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 30px;
  background: #8a48f5;
  height: 50px;
  width: 300px;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 24px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #f4f5fa;
`;

const CountdownBox = styled(Box)`
  position: absolute;
`;

export default Camera;
