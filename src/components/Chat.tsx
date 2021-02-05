import React from 'react';
import {Send, Bubble} from 'react-native-gifted-chat';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/colors';

/**
 * Set custom icon for chat composer send button
 * @param props
 */
export const renderSend = (props: Send['props']) => {
  return (
    <Send {...props} containerStyle={styles.sendContainer}>
      <Icon name="send" size={30} color={Colors.turquoise} />
    </Send>
  );
};

/**
 * Set custom appearance of the chat bubble
 * @param props
 */
export const renderBubble = (props: Bubble['props']) => (
  <Bubble
    {...props}
    wrapperStyle={{
      left: {borderColor: Colors.turquoise, borderWidth: 2},
      right: {backgroundColor: Colors.turquoise},
    }}
    usernameStyle={{color: Colors.darkGrey}}
  />
);

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
