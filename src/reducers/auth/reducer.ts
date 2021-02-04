import {AuthState} from '../../models/AuthState';
import * as actionTypes from './actionTypes';

const initialState: AuthState = {
  loading: false,
  errorStatus: '',
  token: null,
  isLoggedIn: false,
  loginError: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        errorStatus: '',
        token: action.token,
        isLoggedIn: true,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        errorStatus: action.errorStatus,
        token: null,
        isLoggedIn: false,
        loginError: action.loginError ? action.loginError : false,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        errorStatus: '',
        token: null,
        isLoggedIn: false,
      };
    case actionTypes.RESET_LOGIN:
      return initialState;
    default:
      return state;
  }
};

export default auth;
