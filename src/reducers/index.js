import { combineReducers } from 'redux';
import someReducer from './someReducer';
import loginReducer from '../scenes/Login/login.reducers';

export default combineReducers({
  someReducer,
  loginReducer
});
