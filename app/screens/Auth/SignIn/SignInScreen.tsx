import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// components
import Title from '../../../components/Title/Title';

interface ISignInScreen {
  navigation: {
    navigate: Function;
  };
}

const SignInScreen: React.FC<ISignInScreen> = ({navigation}) => {
  return (
    <View>
      <Title text="Sign-in" />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Don’t have an account yet?</Text>
        <Text
          style={[styles.text, styles.textNavigate]}
          onPress={() => navigation.navigate('Sign Up')}>
          Sign Up
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {fontSize: 16},
  textNavigate: {marginLeft: 10},
});

export default SignInScreen;
