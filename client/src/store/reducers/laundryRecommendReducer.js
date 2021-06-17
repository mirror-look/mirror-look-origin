const laundryRecommendReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_LAUNDRY_RECOMMEND':
      return action.payload;
    default:
      return state;
  }
};

export default laundryRecommendReducer;
