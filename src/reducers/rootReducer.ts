import {combineReducers} from 'redux';
import auth from './auth/reducer';
import chat from './chat/reducer';

/**
 * Root reducer contains all reducers
 */
const rootReducer = combineReducers({
  auth,
  chat,
});

export default rootReducer;
