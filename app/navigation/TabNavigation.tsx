import React from 'react';
import { StyleSheet } from 'react-native';
// container
import TasksNavigation from './TasksNavigation';
import Statistic from '../screens/Statistic/Statistic';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// images
import SvgUri from 'react-native-svg-uri';
import { clocksImg, statsImg } from '../assets';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer independent>
      <Tab.Navigator>
        <Tab.Screen
          name='Tasks'
          component={TasksNavigation}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => <SvgUri source={clocksImg} fill={focused ? '#000' : '#888'} />,
          }}
        />
        <Tab.Screen
          name='Statistic'
          component={Statistic}
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

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: 'red',
  },
});
