import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
// redux
import { connect } from 'react-redux';
import { setUserId } from '../store/reducers/user';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// component
import AuthNavigation from './AuthNavigation';
import TaskTrackerNavigationas from './TaskTrackerNavigation';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const { identified, user } = useAuth();
  useEffect(() => {});
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        {identified ? (
          <Stack.Screen name='TaskTracker' component={TaskTrackerNavigationas} />
        ) : (
          <Stack.Screen name='Auth' component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
