const geolocationReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_GEOLOCATION':
      return action.payload;
    default:
      return state;
  }
};

export default geolocationReducer;
