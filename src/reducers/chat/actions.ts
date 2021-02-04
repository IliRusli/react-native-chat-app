import {API_TOKEN} from '../../constants/appContants';
import {Message} from '../../models/Message';

import * as actionTypes from './actionTypes';

/**
 * getMessage gets a message
 * @param id
 * @param text
 * @returns {Function}
 */
export const getMessage = (id?: number, text?: any): Function => async (
  dispatch,
) => {
  dispatch({
    type: actionTypes.GET_MESSAGE_START,
  });

  /**
   * Payload for fakejson api call
   * [doc](https://fakejson.com/documentation#request_structure)
   */
  let payload = {
    token: API_TOKEN,
    data: {
      _id: id,
      text: 'stringShort',
      createdAt: 'dateNow',
      user: {
        _id: 2,
        name: 'John Smith',
      },
      sent: true,
    },
  };

  if (id) {
    payload.data._id = id;
  }

  if (text) {
    payload.data.text = text;
  }

  try {
    let response = await fetch('https://app.fakejson.com/q', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    let message = await response.json();
    dispatch({type: actionTypes.GET_MESSAGE_SUCCESS, message});
  } catch (error) {
    dispatch({
      type: actionTypes.GET_MESSAGE_FAIL,
      errorStatus:
        'Failed to retrieve message from the server. Please try again later.',
    });
  }
};

/**
 * sendMessage sends a message
 * @param message
 * @returns {Function}
 */
export const sendMessage = (message: Message) => async (dispatch) => {
  if (message) {
    dispatch({type: actionTypes.SEND_MESSAGE_SUCCESS, message});
  } else {
    dispatch({
      type: actionTypes.SEND_MESSAGE_FAIL,
      errorStatus: 'Failed to upload a message',
    });
  }
};

/**
 * resetMessage clears all the messages
 * @returns {Function}
 */
export const resetMessages = (): Function => (dispatch) => {
  dispatch({
    type: actionTypes.RESET_MESSAGES,
  });
};
