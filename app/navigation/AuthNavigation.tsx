import React from 'react';
// navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// component
import SignInScreen from '../screens/Auth/SignIn/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUp/SignUpScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator initialRouteName="Sign In">
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
