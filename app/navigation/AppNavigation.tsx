import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
// redux
import { connect } from 'react-redux';
import { setUserId } from '../store/reducers/user';
// navigation
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator, createSwitchNavigator } from '@react-navigation/stack';
// import { StackNavigator, SwitchNavigator } from 'react-navigation';
// component
import AuthNavigation from './AuthNavigation';
import TaskTrackerNavigationas from './TaskTrackerNavigation';

const Stack = createSwitchNavigator();

const AppNavigation = () => {
  const { identified, user } = useAuth();
  console.log('identified', identified);
  console.log('user', user);
  // useEffect(() => {
  //   identified :
  // }, [user]);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' initialRouteName={'Auth'}>
        <Stack.Screen name='Auth' component={AuthNavigation} />
        <Stack.Screen name='TaskTracker' component={TaskTrackerNavigationas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
