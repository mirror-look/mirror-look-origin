import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

function AgreementModal({ setModalOpen, modalOpen, modalTitle, modalComment }) {
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
            const token = `Bearer ${window.sessionStorage.getItem('token')}`;
            const data = {
              agreement: 'true'
            };
            axios
              .put('http://localhost:5000/userinfo', data, {
                headers: {
                  Authorization: token
                }
              })
              .then(function (response) {
                console.log('위치동의여부 넣었다!');
                handleClose();
              })
              .catch(function (err) {
                console.log(err);
              });
            console.log('동의한대!');
          }}
        >
          좋아요!
        </Button>
        &nbsp;&nbsp;
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const token = `Bearer ${window.sessionStorage.getItem('token')}`;
            const data = {
              agreement: 'false'
            };
            axios
              .put('http://localhost:5000/userinfo', data, {
                headers: {
                  Authorization: token
                }
              })
              .then(function (response) {
                console.log('위치동의여부 넣었다!');
                handleClose();
              })
              .catch(function (err) {
                console.log(err);
              });
            console.log('동의안한대!');
          }}
        >
          나중에요!
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

export default AgreementModal;
