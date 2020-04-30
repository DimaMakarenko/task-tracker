import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// component
import AuthNavigation from './AuthNavigation';
import TabNavigation from './TabNavigation';
// redux
import { setUser } from '../store/reducers/user/user';
import { useDispatch } from 'react-redux';
// routes
import { appRoutes } from './routes';

const Stack = createStackNavigator();

const AppNavigation: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    user && dispatch(setUser(user.uid));
  });
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        {user ? (
          <Stack.Screen name={appRoutes.TASK_TRACKER} component={TabNavigation} />
        ) : (
          <Stack.Screen name={appRoutes.AUTH} component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
