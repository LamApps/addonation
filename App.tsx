import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ResetPwdScreen from './src/screens/ResetPwdScreen';
import TabNavRoot from './src/screens/TabNavRoot';

import { getHeaderTitle } from '@react-navigation/elements';

import Header from './src/components/Header';
import { AppStyles } from './src/AppStyles';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          header: ({ navigation, route, options }) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <Header title={title} navigation ={navigation} viewLogout={false} />
            );
          }
        }}
      >
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ title: 'SIGN UP'}} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{ title: 'RESET PASSWORD' }} name="ResetPwd" component={ResetPwdScreen} />
        <Stack.Screen options={{headerShown: false}} name="TabRoot" component={TabNavRoot} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}