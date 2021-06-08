import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBase64URL } from '../../store/actions';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { Fab } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import ReplayIcon from '@material-ui/icons/Replay';
import Countdown from './Countdown';

const videoConstraints = {
  facingMode: 'user'
};

function Cam({ setButtonEnabled }) {
  const dispatch = useDispatch();
  const webcamRef = useRef(null);
  const [countdown, setCountdown] = useState();
  const [shutter, setShutter] = useState(true);
  const [imgSrc, setImgSrc] = useState();

  const capture = useCallback(() => {
    let imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log('촬영했다!');
    setShutter(false);
    let imageBase64 = imageSrc.split(',')[1];
    dispatch(setBase64URL(imageBase64));
  }, [webcamRef]);

  return (
    <Window>
      {!!imgSrc ? (
        <img src={imgSrc} />
      ) : (
        <WebcamBox>
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
        </WebcamBox>
      )}
      {countdown === true ? (
        <CountdownBox>
          <Countdown />
        </CountdownBox>
      ) : (
        ''
      )}
      <ShutterBox>
        <CameraButton>
          {shutter === true ? (
            <Fab
              color="primary"
              onClick={() => {
                setCountdown(true);
                setTimeout(function () {
                  setCountdown(false);
                  console.log('촬영 준비!');
                  capture();
                  setButtonEnabled(false);
                }, 5000);
              }}
            >
              <PhotoCameraIcon />
            </Fab>
          ) : (
            <Fab
              color="primary"
              onClick={() => {
                setImgSrc('');
                setShutter(true);
              }}
            >
              <ReplayIcon />
            </Fab>
          )}
        </CameraButton>
      </ShutterBox>
    </Window>
  );
}

const CountdownBox = styled(Box)`
  position: absolute;
`;

const WebcamBox = styled(Box)`
  align-items: center;
  justify-content: center;
`;

const ShutterBox = styled(Box)`
  margin-top: 50vh;
  position: absolute;
`;

const CameraButton = styled('div')`
  position: 'absolute';
  width: '100vw';
  display: 'flex';
  justify-content: 'center';
  align-items: 'center';
  bottom: 30;
  zindex: 10;
`;

const Window = styled(Box)`
  border-radius: 30px;
  width: 1230px;
  height: 682px;
  background: #f4f5fa;
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
  flex-direction: column;
`;

export default Cam;
