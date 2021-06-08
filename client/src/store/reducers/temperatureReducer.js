const temperatureReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEMPERATURE':
      return action.payload;
    default:
      return state;
  }
};

export default temperatureReducer;
