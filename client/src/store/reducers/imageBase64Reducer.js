const imageBase64Reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_BASE64_URL':
      return action.payload;
    default:
      return state;
  }
};

export default imageBase64Reducer;
