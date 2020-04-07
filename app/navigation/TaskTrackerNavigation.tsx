import React from 'react';
import { Image } from 'react-native';
// container
import Tasks from '../screens/TaskTracker/Tasks/Tasks';
import Statistic from '../screens/TaskTracker/Statistic/Statistic';
// navigation
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TaskTrackerNavigationas = () => {
  const taskImage = require('../assets/alarm.png');
  const statImage = require('../assets/trending.png');
  return (
    <NavigationContainer independent>
      <Tab.Navigator>
        <Tab.Screen
          name='Tasks'
          component={Tasks}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => <Image source={taskImage} style={{ opacity: focused ? 1 : 0.5 }} />,
          }}
        />
        <Tab.Screen
          name='Statistic'
          component={Statistic}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => <Image source={statImage} style={{ opacity: focused ? 1 : 0.5 }} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TaskTrackerNavigationas;
