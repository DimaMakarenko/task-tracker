import React from 'react';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// component
import SignInScreen from '../screens/Auth/SignIn/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUp/SignUpScreen';
// routes
import { authRoutes } from './routes';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator initialRouteName={authRoutes.SIGN_IN}>
        <Stack.Screen name={authRoutes.SIGN_IN} component={SignInScreen} />
        <Stack.Screen name={authRoutes.SIGN_UP} component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
