import React from 'react';
import { useAuth } from '../hooks/useAuth';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// component
import AuthNavigation from './AuthNavigation';
import TabNavigation from './TabNavigation';
import Loader from '../components/Loader/Loader';
// redux
import { setUser } from '../store/reducers/user/user';
import { useDispatch } from 'react-redux';
// routes
import { appRoutes } from './routes';

const Stack = createStackNavigator();

const AppNavigation: React.FC = () => {
  const { auth, isLoading } = useAuth();
  const { user } = auth;
  const dispatch = useDispatch();

  user && dispatch(setUser(user.uid));

  console.log('user', user);
  return (
    <Loader isLoading={isLoading}>
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          {user ? (
            <Stack.Screen name={appRoutes.TASK_TRACKER} component={TabNavigation} />
          ) : (
            <Stack.Screen name={appRoutes.AUTH} component={AuthNavigation} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Loader>
  );
};

export default AppNavigation;
