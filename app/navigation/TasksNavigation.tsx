import React from 'react';
// container
import ListTask from '../screens/Tasks/List/ListTask';
import EditTask from '../screens/Tasks/Edit/EditTask';
import CreateTask from '../screens/Tasks/Create/CreateTask';
import ShowTask from '../screens/Tasks/Show/ShowTask';
import Tags from '../screens/Tasks/Tags';
import Filters from '../screens/Tasks/Filters';
// navigation
import { tasksRoutes } from './routes';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const TasksNavigation = () => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator
        initialRouteName={tasksRoutes.LIST}
        screenOptions={{
          headerTitle: '',
          headerBackTitleStyle: { display: 'none' },
          headerStyle: { elevation: 0, height: 45 },
        }}
      >
        <Stack.Screen name={tasksRoutes.LIST} component={ListTask} />
        <Stack.Screen name={tasksRoutes.SHOW} component={ShowTask} />
        <Stack.Screen name={tasksRoutes.EDIT} component={EditTask} />
        <Stack.Screen name={tasksRoutes.CREATE} component={CreateTask} />
        <Stack.Screen name={tasksRoutes.TAGS} component={Tags} />
        <Stack.Screen name={tasksRoutes.FILTERS} component={Filters} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default TasksNavigation;
