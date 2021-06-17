import { combineReducers } from 'redux';
import temperatureReducer from './temperatureReducer';
import imageBase64Reducer from './imageBase64Reducer';
import predictionReducer from './predictionReducer';
import imagePathReducer from './imagePathReducer';
import userInfoReducer from './userInfoReducer';
import laundryRecommendReducer from './laundryRecommendReducer';
import userSelectsReducer from './userSelectsReducer';

export default combineReducers({
  temperatureReducer,
  imageBase64Reducer,
  predictionReducer,
  imagePathReducer,
  userInfoReducer,
  laundryRecommendReducer,
  userSelectsReducer
});
