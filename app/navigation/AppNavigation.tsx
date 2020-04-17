import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
// redux
import { useDispatch } from 'react-redux';
import { setUserId } from '../store/reducers/user';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// component
import AuthNavigation from './AuthNavigation';
import TabNavigation from './TabNavigation';
import { fetchTasks } from '../store/reducers/tasks';

const Stack = createStackNavigator();

const AppNavigation: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(setUserId(user.uid));
      dispatch(fetchTasks());
    }
  }, [user]);
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
