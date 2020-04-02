import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// components
import Title from '../../../components/Title/Title';
import Button from '../../../components/Button/Button';
import {basicStyles} from '../../../theme/basicStyles';
import EmailField from '../../../components/Form/Email';
// styles

interface ISignUpScreen {
  navigation: {
    navigate: Function;
  };
}

const SignUpScreen: React.FC<ISignUpScreen> = ({navigation}) => {
  return (
    <View style={basicStyles.container}>
      <Title text="Sign-up" />
      <Button text="Sign up" />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Already have an account?</Text>
        <Text
          style={[styles.text, styles.textNavigate]}
          onPress={() => navigation.navigate('Sign In')}>
          Sign In
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

export default SignUpScreen;
