import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const tutorialSteps = [
  {
    label: '좋은예시',
    imgPath: '/images/page1.png'
  },
  {
    label: '나쁜예시',
    imgPath: '/images/page2.png'
  }
];

const TutorialBox = styled(Box)`
  flexgrow: 1;
  justify-content: center;
  alignitems: 'center';
`;

function Tutorial() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [tutorialBox, setTutorialBox] = useState();
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      {tutorialBox === false ? (
        '파일업로드 또는 촬영하기를 선택하세요!'
      ) : (
        <TutorialBox>
          <center>
            <img
              width={650}
              height={400}
              src={tutorialSteps[activeStep].imgPath}
              alt={tutorialSteps[activeStep].label}
            />
          </center>
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="dots"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  if (activeStep === maxSteps - 1) {
                    setTutorialBox(false);
                  } else {
                    handleNext();
                  }
                }}
              >
                {theme.direction === 'rtl' ? '이전' : '다음'}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === 'rtl' ? '다음' : '이전'}
              </Button>
            }
          />
        </TutorialBox>
      )}
    </div>
  );
}

export default Tutorial;
