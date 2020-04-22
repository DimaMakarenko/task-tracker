import React from 'react';
import { useAuth } from '../hooks/useAuth';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// component
import AuthNavigation from './AuthNavigation';
import TabNavigation from './TabNavigation';

const Stack = createStackNavigator();

const AppNavigation: React.FC = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        {user ? (
          <Stack.Screen name='TaskTracker' component={TabNavigation} />
        ) : (
          <Stack.Screen name='Auth' component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
