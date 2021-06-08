export const setTemperature = (item) => {
  return {
    type: 'SET_TEMPERATURE',
    payload: item
  };
};

export const setBase64URL = (item) => {
  return {
    type: 'SET_BASE64_URL',
    payload: item
  };
};

export const setPrediction = (item) => {
  return {
    type: 'SET_PREDICTION_RESULT',
    payload: item
  };
};
