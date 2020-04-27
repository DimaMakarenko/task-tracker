import React from 'react';
import { Image } from 'react-native';
// container
import TasksNavigation from './TasksNavigation';
import Statistic from '../screens/Statistic/Statistic';
// navigation
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const taskImage = require('../assets/images/alarm.png');
  const statImage = require('../assets/images/trending.png');

  return (
    <NavigationContainer independent>
      <Tab.Navigator>
        <Tab.Screen
          name='Tasks'
          component={TasksNavigation}
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

export default TabNavigation;
