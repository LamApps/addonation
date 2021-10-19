import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Header from '../../src/components/Header';
import { getHeaderTitle } from '@react-navigation/elements';

import DashboardScreen from '../../src/screens/DashboardScreen';

import { FontAwesome } from '@expo/vector-icons';
import { AppStyles } from '../AppStyles';
const Tab = createBottomTabNavigator();

export default function TabNavRoot({ navigation }) {
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={{
        header: ({ navigation, route, options }) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <Header title={title} navigation ={navigation} viewLogout={true} />
          );
        },
        tabBarActiveBackgroundColor: AppStyles.color.primary,
        tabBarInactiveBackgroundColor: AppStyles.color.primary,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: AppStyles.color.menuInactive,
      }}
      backBehavior="history"
    >
      <Tab.Screen options={{ 
        title: 'DASHBOARD',
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
        ),}} name="Dashboard" component={DashboardScreen}  />
      <Tab.Screen options={{ 
        title: 'DONATE',
        tabBarLabel: 'Donate',
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name="heart" size={size-2} color={color} />
        ),}} name="Donate" component={DashboardScreen} />
      <Tab.Screen options={{ 
        title: 'NEWS',
        tabBarLabel: 'News',
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name="newspaper-o" size={size-3} color={color} />
        ),}} name="News" component={DashboardScreen} />
      <Tab.Screen options={{ 
        title: 'THANK YOU EVENT',
        tabBarLabel: 'Gift',
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name="gift" size={size} color={color} />
        ),}} name="Gift" component={DashboardScreen} />
      <Tab.Screen options={{ 
        title: 'SETTINGS',
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size} color={color} />
        ),}} name="Settings" component={DashboardScreen} />
    </Tab.Navigator>
  );
}