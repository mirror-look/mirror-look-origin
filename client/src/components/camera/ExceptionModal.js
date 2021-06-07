import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBase64URL } from '../../store/actions';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

function ExceptionModal({ setModalOpen, modalOpen, modalTitle, modalComment }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClose = () => {
    setModalOpen(false);
  };

  const body = (
    <StyledPaper>
      <center>
        <h2 id="simple-modal-title">{modalTitle}</h2>
        <p id="simple-modal-description">{modalComment}</p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(setBase64URL(''));
            handleClose();
            history.push('/camera');
          }}
        >
          다시 촬영하기
        </Button>
      </center>
    </StyledPaper>
  );

  return (
    <StyledModal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={modalOpen}
      onClose={handleClose}
    >
      {body}
    </StyledModal>
  );
}

const StyledPaper = styled(Paper)`
  width: 30vw;
  height: 30vh;
  padding: 50px;
  position: 'absolute';
  backgroundcolor: 'white';
  border: '2px solid #000';
  border-radius: 30px;
`;
const StyledModal = styled(Modal)`
  margin-left: 35vw;
  margin-top: 25vh;
  position: 'flex';
  z-index: 1300;
  inset: 10% 5% 5% 5%;
  width: 40vw;
  height: 380px;
  backgroundcolor: 'white';
  border: '2px solid #000';
  border-radius: 30px;
`;

export default ExceptionModal;
