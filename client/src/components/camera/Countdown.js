import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">0</div>;
  }

  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
    </div>
  );
};

function Countdown() {
  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying
        duration={5}
        colors={[['#6f00ff', 0.33], ['#6f00ff', 0.33], ['#6f00ff']]}
        onComplete={() => [true, 1000]}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}

export default Countdown;
