import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { getHeaderTitle } from '@react-navigation/elements';

import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ResetPwdScreen from '../screens/ResetPwdScreen';

import Header from '../components/Header';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home"
        screenOptions={{
        header: ({ navigation, route, options }) => {
            const title = getHeaderTitle(options, route.name);
            return (
            <Header title={title} navigation ={navigation} viewLogout={false} />
            );
        }
        }}>
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ title: 'SIGN UP'}} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{ title: 'RESET PASSWORD' }} name="ResetPwd" component={ResetPwdScreen} />
    </Stack.Navigator>
  );
};