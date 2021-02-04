import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Colors from '../constants/colors';
import Button from './shared/Button';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';
import provideAuthProps from '../reducers/auth/authConnector';
import {AuthProps} from '../models/AuthProps';
import {AuthState} from '../models/AuthState';

interface Props extends AuthProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  state: {auth: AuthState};
}

interface State {
  email: string;
  password: string;
}

/**
 * SignIn screen user authentication
 */
const SignIn = (props: Props): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef<TextInput>(null);
  const authState: AuthState = props.state.auth;

  useEffect(() => {
    // If there's auth token, navigate to Home screen
    if (authState.token) {
      props.navigation.navigate('Home');
    }

    // Display popup alert if there's error during sign in
    if (authState.errorStatus) {
      Alert.alert('', authState.errorStatus, [{text: 'OK'}]);
    }
  }, [authState]);

  /**
   * Header component for SignIn screen
   */
  const Header = () => (
    <View style={styles.header}>
      <Icon name="chat" size={100} color={Colors.grey} />
    </View>
  );

  /**
   * Action for SignIn button
   */
  const onSignIn = () => {
    // Sign in using email and password entered
    props.signIn(email, password);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sign In</Text>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'john@gmail.com'}
          keyboardType={'email-address'}
          placeholderTextColor={Colors.grey}
          onChangeText={(value) => {
            setEmail(value);
          }}
          autoCapitalize={'none'}
          onSubmitEditing={() => {
            passwordInputRef.current && passwordInputRef.current.focus();
          }}
        />
        <Text style={styles.title}>Password</Text>
        <TextInput
          ref={passwordInputRef}
          style={styles.textInput}
          placeholder={'password'}
          placeholderTextColor={Colors.grey}
          onChangeText={(value) => setPassword(value)}
          autoCapitalize={'none'}
          secureTextEntry={true}
          onSubmitEditing={() => onSignIn()}
        />
        <Button title={'Sign In'} onPress={onSignIn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4,
  },
  section: {
    width: '80%',
    flex: 0.6,
  },
  sectionTitle: {
    fontSize: 30,
    color: Colors.black,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  title: {
    color: Colors.turquoise,
    fontWeight: 'bold',
    paddingTop: 16,
  },
  textInput: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
    paddingVertical: 10,
  },
});

export default provideAuthProps(SignIn);
