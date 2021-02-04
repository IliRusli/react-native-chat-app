import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Colors from '../constants/colors';
import Button from './shared/Button';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';
import provideAuthProps from '../reducers/auth/authConnector';
import provideChatProps from '../reducers/chat/chatConnector';
import {AuthState} from '../models/AuthState';
import {AuthProps} from '../models/AuthProps';
import {ChatProps} from '../models/ChatProps';

interface Props extends AuthProps, ChatProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  state: {auth: AuthState};
}

/**
 * Home screen for displaying chat list and sign out button
 */
const Home = (props: Props): JSX.Element => {
  const username = 'John Smith';
  const authState: AuthState = props.state.auth;

  useEffect(() => {
    // Navigate to SignIn screen if token is null
    if (authState.token == null) {
      props.navigation.navigate('SignIn');
    }
  }, [authState]);

  /**
   * Action for sign out button
   */
  const onSignOut = () => {
    // Sign out and clear the auth token
    props.signOut();

    // Once signed out, reset chat messages
    props.resetMessages();
  };

  /**
   * Action for chat component
   */
  const onPressChat = () => {
    // Navigate to ChatRoom screen, pass the username for header title
    props.navigation.navigate('ChatRoom', {username: username});
  };

  /**
   * Chat component, use dummy data to show the latest message received
   */
  const Chat = () => {
    return (
      <TouchableOpacity onPress={onPressChat} style={styles.chatContainer}>
        <View style={styles.userContainer}>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://placeimg.com/140/140/any',
            }}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.message}>What's up?</Text>
          </View>
        </View>
        <Icon name="chevron-right" size={25} color={Colors.turquoise} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Chat />
      <Button title={'Sign Out'} onPress={onSignOut} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  chatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingLeft: 16,
    paddingRight: 5,
    paddingVertical: 12,
    width: '100%',
    borderRadius: 5,
  },
  username: {
    color: Colors.black,
    fontSize: 16,
  },
  message: {
    color: Colors.grey,
    fontSize: 14,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  userContainer: {
    flexDirection: 'row',
  },
  detailsContainer: {
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  button: {
    marginBottom: 30,
  },
});

export default provideChatProps(provideAuthProps(Home));
