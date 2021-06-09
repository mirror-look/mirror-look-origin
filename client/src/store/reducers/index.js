import { combineReducers } from 'redux';
import temperatureReducer from './temperatureReducer';
import imageBase64Reducer from './imageBase64Reducer';
import predictionReducer from './predictionReducer';
import imagePathReducer from './imagePathReducer';
import userInfoReducer from './userInfoReducer';

export default combineReducers({
  temperatureReducer,
  imageBase64Reducer,
  predictionReducer,
  imagePathReducer,
  userInfoReducer
});
