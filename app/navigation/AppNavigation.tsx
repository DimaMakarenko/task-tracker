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
import TaskTrackerNavigation from './TaskTrackerNavigation';

const Stack = createStackNavigator();

interface IAppNavigation {
  setUserId: Function;
}

const AppNavigation: React.FC<IAppNavigation> = ({ setUserId }) => {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        {user ? (
          <Stack.Screen name='TaskTracker' component={TaskTrackerNavigation} />
        ) : (
          <Stack.Screen name='Auth' component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default connect(null, { setUserId })(AppNavigation);
