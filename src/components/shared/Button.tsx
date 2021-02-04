import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import Colors from '../../constants/colors';

interface Props {
  /**
   * Set this to change button title
   */
  title: string;

  /**
   * Set this to set button onPress props
   */
  onPress: () => void;

  /**
   * (Optional) Set this to set button custom styles
   */
  style?: ViewStyle;
}

const Button = (props: Props): JSX.Element => (
  <TouchableOpacity
    style={[styles.container, props.style]}
    onPress={props.onPress}>
    <Text style={styles.text}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.turquoise,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
  },
  text: {
    color: Colors.white,
    fontWeight: 'bold',
    padding: 16,
  },
});
export default Button;
