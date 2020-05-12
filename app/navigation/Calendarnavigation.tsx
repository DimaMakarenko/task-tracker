import React from 'react';
// navigation
import { tabsRoutes } from './routes';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// component
import Calendar from '../screens/Calendar';

const Stack = createStackNavigator();

const CalendarNavigation = () => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator
        initialRouteName={tabsRoutes.CALENDAR}
        screenOptions={{
          headerTitle: '',
          headerBackTitleStyle: { display: 'none' },
          headerStyle: { elevation: 0, height: 45 },
        }}
      >
        <Stack.Screen name={tabsRoutes.CALENDAR} component={Calendar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default CalendarNavigation;
