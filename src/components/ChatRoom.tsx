import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat, Send, Actions, Bubble} from 'react-native-gifted-chat';
import {StyleSheet, TouchableOpacity, Modal, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/colors';
import DocumentPicker from 'react-native-document-picker';
import provideChatProps from '../reducers/chat/chatConnector';
import {ChatState} from '../models/ChatState';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';
import {ChatProps} from '../models/ChatProps';
import {Message} from '../models/Message';
import Pdf from 'react-native-pdf';

interface Props extends ChatProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  state: {chat: ChatState};
}

/**
 * ChatRoom screen for reading/receiving chat messages
 */
const ChatRoom = (props: Props) => {
  /**
   * Random integer generator to create a unique chat _id
   */
  const getRandomInt = () => {
    return Date.now();
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const initialChat: string = "What's up?";
  const chatState: ChatState = props.state.chat;
  const messages: Message[] = chatState.messages;

  /**
   * Get initial message for the chat
   */
  useEffect(() => {
    props.getMessage(getRandomInt(), initialChat);
  }, []);

  useEffect(() => {
    // Display popup alert if there's error during sign in
    if (chatState.errorStatus) {
      Alert.alert('', chatState.errorStatus, [{text: 'OK'}]);
    }
  }, [chatState]);

  /**
   * Action for chat composer send button
   * @param messages
   */
  const onSend = useCallback((messages = []) => {
    // Append the new message to the message list
    let message = messages[0];
    message.sent = true;
    message.received = true;
    props.sendMessage(message);

    // Retrieve the dummy reply from the API
    props.getMessage(getRandomInt(), undefined);
  }, []);

  /**
   * Set custom icon for chat composer send button
   * @param props
   */
  const renderSend = (props: Send['props']) => {
    return (
      <Send {...props} containerStyle={styles.sendContainer}>
        <Icon name="send" size={30} color={Colors.turquoise} />
      </Send>
    );
  };

  /**
   * Actions for chat custom left toolbar
   * @param props
   */
  const onPressActionButton = async (actionProps: Actions['props']) => {
    // Pick multiple files
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      for (const res of results) {
        const {uri, type} = res;

        let message: Message = {
          _id: getRandomInt(),
          text: actionProps.text,
          createdAt: new Date(),
          user: {
            _id: 1,
          },
        };

        if (type === 'image/jpeg' || type === 'image/png') {
          message.image = uri;
        }

        /**
         * Set custom attributes for pdf file type since
         * it is not supported by default
         */
        if (type === 'application/pdf') {
          message.file_type = 'pdf';
          message.uri = uri;
        }

        props.sendMessage(message);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        /**
         * User cancelled the picker,
         * exit menu/picker, do nothing
         *  */
      } else {
        throw err;
      }
    }
  };

  /**
   * Set custom actions in chat composer left toolbar
   * for document picker
   * @param props
   */
  const renderActions = (props: Actions['props']) => (
    <Actions
      {...props}
      containerStyle={styles.actionContainer}
      icon={() => <Icon name="attach" size={35} color={Colors.grey} />}
      options={{
        'Choose From Library': () => {
          onPressActionButton(props);
        },
        Cancel: () => {
          /**
           * User cancelled the picker,
           * exit action sheet, do nothing
           *  */
        },
      }}
    />
  );

  /**
   * Set custom appearance of the chat bubble
   * @param props
   */
  const renderBubble = (props: Bubble['props']) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {borderColor: Colors.turquoise, borderWidth: 2},
        right: {backgroundColor: Colors.turquoise},
      }}
      usernameStyle={{color: Colors.darkGrey}}
    />
  );

  /**
   * Pdf viewer modal for pdf file type
   * @param source
   */
  const renderPdfViewer = (source: string) => {
    const data = {uri: source};
    return (
      <Modal animationType="fade" visible={isModalVisible}>
        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
          <Icon name="close" size={35} color={Colors.black} />
        </TouchableOpacity>
        <Pdf style={styles.container} source={data} />
      </Modal>
    );
  };

  /**
   * Set custom view for pdf viewer chat bubble
   * @param props
   */
  const renderCustomView = (props: Bubble['props']) => {
    if (props.currentMessage && props.currentMessage.file_type === 'pdf') {
      return (
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => setIsModalVisible(true)}>
          <Icon name="file-tray-full" size={50} color={Colors.darkGrey} />
          {renderPdfViewer(props.currentMessage.uri)}
        </TouchableOpacity>
      );
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      inverted={false}
      alwaysShowSend
      renderBubble={(props: Bubble['props']) => renderBubble(props)}
      renderUsernameOnMessage
      renderSend={(props: Send['props']) => renderSend(props)}
      renderCustomView={(props: Bubble['props']) => renderCustomView(props)}
      renderActions={(props: Actions['props']) => renderActions(props)}
    />
  );
};

ChatRoom.navigationOptions = (props: Props) => {
  return {
    title: props.navigation.getParam('username', ''),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 15,
  },
  actionContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 0,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 100,
  },
});

export default provideChatProps(ChatRoom);
