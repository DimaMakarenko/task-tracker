import React from 'react';
// navigation
import { tabsRoutes } from './routes';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// component
import Statistic from '../screens/Statistic';

const Stack = createStackNavigator();

const StatisticNavigation = () => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator
        initialRouteName={tabsRoutes.STATISTIC}
        screenOptions={{
          headerTitle: '',
          headerBackTitleStyle: { display: 'none' },
        }}
      >
        <Stack.Screen name={tabsRoutes.STATISTIC} component={Statistic} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StatisticNavigation;
