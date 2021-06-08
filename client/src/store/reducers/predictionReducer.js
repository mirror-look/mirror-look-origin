const predictionReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_PREDICTION_RESULT':
      return action.payload;
    default:
      return state;
  }
};

export default predictionReducer;
