import React from 'react';
// container
import ListTask from '../screens/Tasks/List/ListTask';
import EditTask from '../screens/Tasks/Edit/EditTask';
import CreateTask from '../screens/Tasks/Create/CreateTask';
import ShowTask from '../screens/Tasks/Show/ShowTask';
import Tags from '../screens/Tasks/Tags';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const TasksNavigation = () => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator initialRouteName='List'>
        <Stack.Screen name='List' component={ListTask} />
        <Stack.Screen name='Show' component={ShowTask} />
        <Stack.Screen name='Edit' component={EditTask} />
        <Stack.Screen name='Create' component={CreateTask} />
        <Stack.Screen name='Tags' component={Tags} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default TasksNavigation;
