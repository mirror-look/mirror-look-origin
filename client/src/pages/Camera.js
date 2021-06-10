import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPrediction } from '../store/actions';
import { setImagePath } from '../store/actions';
import axios from 'axios';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Cam from '../components/camera/Cam';
import DragDrop from '../components/camera/DragDrop';
import Tutorial from '../components/camera/Tutorial';
import WindowWrapper from '../components/common/WindowWrapper';

function Camera() {
  const dispatch = useDispatch();
  const uploadImageBase64 = useSelector((store) => store.imageBase64Reducer);
  const history = useHistory();
  const token = `Bearer ${window.sessionStorage.getItem('token')}`;
  const [cam, setCam] = useState();
  const [dragDrop, setDragDrop] = useState();
  const [buttonEnabled, setButtonEnabled] = useState(true);

  useEffect(() => {
    if (!!uploadImageBase64) {
      console.log('업로드된 이미지 보낼 준비!');
      const imageBase64 = uploadImageBase64;
      axios
        .post(
          'http://localhost:5000/classification/upload',
          {
            image_base64: imageBase64
          },
          {
            headers: {
              Authorization: token
            }
          }
        )
        .then(function (response) {
          console.log('업로드된 Base64 이미지 보내서 예측 결과 가져왔다!');
          console.log(response.data.result.top_3_result);
          console.log('예측 결과 넣는다!');
          dispatch(setImagePath(response.data.result.original_image_path));
          dispatch(setPrediction(response.data.result.top_3_result));
          setButtonEnabled(false);
        })
        .catch(function (err) {
          console.log('업로드된 Base64 이미지 보냈는데 예측 결과 못가져왔다!');
          console.log(err);
        });
    }
  }, [uploadImageBase64]);

  function handleConfirm(e) {
    e.preventDefault();
    console.log('이미지 확인 클릭했다!');
    history.push('/select');
  }

  return (
    <WindowWrapper>
      <StyledBox>
        <Window>
          {!cam && !dragDrop ? <Tutorial /> : ''}
          {cam === true ? <Cam setButtonEnabled={setButtonEnabled} /> : ''}
          {dragDrop === true ? (
            <DragDrop setButtonEnabled={setButtonEnabled} />
          ) : (
            ''
          )}
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
            카메라
          </TakePhoto>
          <Confirm disabled={buttonEnabled} onClick={handleConfirm}>
            결과보기
          </Confirm>
        </StyledButton>
      </StyledBox>
    </WindowWrapper>
  );
}

const StyledBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Window = styled(Box)`
  border-radius: 30px;
  width: 95%;
  height: 100%;
  background: #f4f5fa;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  /*box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);*/
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
  width: 95%;
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

export default Camera;
