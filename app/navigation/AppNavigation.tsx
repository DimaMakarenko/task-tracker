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
import TabNavigation from './TabNavigation';

interface IAppNavigation {
  setUserId: Function;
}
const Stack = createStackNavigator();

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
          <Stack.Screen name='TaskTracker' component={TabNavigation} />
        ) : (
          <Stack.Screen name='Auth' component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default connect(null, { setUserId })(AppNavigation);
