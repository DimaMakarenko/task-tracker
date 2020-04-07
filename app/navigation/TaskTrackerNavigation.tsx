import React from 'react';
// container
import Tasks from '../screens/TaskTracker/Tasks';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const TaskTrackerNavigationas = () => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen name='Tasks' component={Tasks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default TaskTrackerNavigationas;
