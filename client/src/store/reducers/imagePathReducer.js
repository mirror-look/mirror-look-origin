const imagePathReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_IMAGE_PATH':
      return action.payload;
    default:
      return state;
  }
};

export default imagePathReducer;
