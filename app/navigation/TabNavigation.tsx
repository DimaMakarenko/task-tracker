import React from 'react';
import { View } from 'react-native';
// container
import TasksNavigation from './TasksNavigation';
import StatisticNavigation from './StatisticNavigation';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// routes
import { tabsRoutes } from './routes';
import { Icon } from 'native-base';
import { basicStyles } from '../theme/basicStyles';

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
            tabBarIcon: ({ focused }) => (
              <View>
                <Icon type='MaterialCommunityIcons' name='alarm-check' style={[!focused && basicStyles.grayColor]} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={tabsRoutes.STATISTIC}
          component={StatisticNavigation}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (
              <View>
                <Icon type='MaterialCommunityIcons' name='trending-up' style={[!focused && basicStyles.grayColor]} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
