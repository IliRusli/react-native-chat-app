import * as actionTypes from './actionTypes';
import {ChatState} from '../../models/ChatState';

const initialState: ChatState = {
  loading: false,
  errorStatus: '',
  messages: [],
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MESSAGE_START:
    case actionTypes.SEND_MESSAGE_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SEND_MESSAGE_SUCCESS:
    case actionTypes.GET_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        errorStatus: '',
        messages: [...state.messages, action.message],
      };
    case actionTypes.SEND_MESSAGE_FAIL:
    case actionTypes.GET_MESSAGE_FAIL:
      return {
        ...state,
        loading: false,
        errorStatus: action.errorStatus,
      };
    case actionTypes.RESET_MESSAGES:
      return initialState;
    default:
      return state;
  }
};

export default chat;
