import React from 'react';
// navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// component
import AuthNavigation from './AuthNavigation';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Auth" component={AuthNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
