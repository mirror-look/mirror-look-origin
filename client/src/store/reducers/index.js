import { combineReducers } from 'redux';
import geolocationReducer from './geolocationReducer';
import imageBase64Reducer from './imageBase64Reducer';

export default combineReducers({ geolocationReducer, imageBase64Reducer });
