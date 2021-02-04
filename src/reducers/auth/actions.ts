import * as actionTypes from './actionTypes';

/**
 * Dummy data to authenticate user
 */
const identifiedEmail = 'test@user.com';
const identifiedPassword = 'password';

/**
 * login
 * @param email
 * @param password
 * @returns {Function}
 */
export const signIn = (email: string, password: string): Function => (
  dispatch,
) => {
  dispatch({
    type: actionTypes.RESET_LOGIN,
  });

  if (email === identifiedEmail && password === identifiedPassword) {
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      token: Date.now(),
    });
  } else {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      errorStatus: 'Invalid email or password',
    });
  }
};

/**
 * signout
 * @returns {Function}
 */
export const signOut = (): Function => (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT_SUCCESS,
  });
};
