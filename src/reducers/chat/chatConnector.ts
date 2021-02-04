import {connect} from 'react-redux';

import {ChatProps} from '../../models/ChatProps';
import {ChatState} from '../../models/ChatState';

import {getMessage, resetMessages, sendMessage} from './actions';

const mapDispatchToProps: ChatProps = {
  getMessage,
  sendMessage,
  resetMessages,
};

const mapStateToProps = (state: ChatState) => ({
  state,
});

const provideChatProps = connect(mapStateToProps, mapDispatchToProps);

export default provideChatProps;
