import React from 'react';
// container
import TasksNavigation from './TasksNavigation';
import StatisticNavigation from './StatisticNavigation';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// images
import SvgUri from 'react-native-svg-uri';
import { clocksImg, statsImg } from '../assets';
// routes
import { tabsRoutes } from './routes';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer independent>
      <Tab.Navigator>
        <Tab.Screen
          name={tabsRoutes.TASKS}
          component={TasksNavigation}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => <SvgUri source={clocksImg} fill={focused ? '#000' : '#888'} />,
          }}
        />
        <Tab.Screen
          name={tabsRoutes.STATISTIC}
          component={StatisticNavigation}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => <SvgUri source={statsImg} fill={focused ? '#000' : '#888'} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
