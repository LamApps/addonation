import React, {useState, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from '../../src/components/Header';
import { getHeaderTitle } from '@react-navigation/elements';
import { FontAwesome } from '@expo/vector-icons';

import { AppStyles } from '../AppStyles';
import axios from 'axios';

import DashboardScreen from '../screens/DashboardScreen';
import DonateScreen from '../screens/DonateScreen';
import NewsScreen from '../screens/NewsScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import GiftScreen from '../screens/GiftScreen';
import SettingScreen from '../screens/SettingScreen';
import {baseUrl} from '../config/firebase';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function News() {
  return (
    <Stack.Navigator screenOptions={{ 
      header: ({ navigation, route, options }) => {
      const title = getHeaderTitle(options, route.name);
      return (
        <Header title={title} navigation ={navigation} viewLogout={true} />
      );
      }, }} initialRouteName="NewsList">
      <Stack.Screen options={{title: 'NEWS'}} name="NewsList" component={NewsScreen} />
      <Stack.Screen options={{title: 'NEWS DETAIL'}} name="NewsDetail" component={NewsDetailScreen} />
    </Stack.Navigator>
  );
}
export const AppStack = () => {
  const [hasNotifications, setHasNotifications] = useState(null)
  useEffect(() => {
    axios({
      method: 'get',
      url: `${baseUrl}/api/get_public_events`,
    }).then((response) => {
      const data = response.data
      setHasNotifications(data.length || null)
    }).catch(error=>{
    })
  }, [])

  return (
    <Tab.Navigator
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
        ),}} name="Donate" component={DonateScreen} />
      <Tab.Screen options={{
        headerShown: false,
        tabBarLabel: 'News',
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name="newspaper-o" size={size-3} color={color} />
        ), }} name="News" component={News} />
      <Tab.Screen options={{ 
        title: 'THANK YOU EVENT',
        tabBarLabel: 'Gift',
        tabBarBadge: hasNotifications,
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name="gift" size={size} color={color} />
        ),}} name="Gift" component={GiftScreen} />
      <Tab.Screen options={{ 
        title: 'MY PAGE',
        tabBarLabel: 'My Page',
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size} color={color} />
        ),}} name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
};