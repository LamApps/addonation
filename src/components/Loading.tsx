import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import { AppStyles } from '../AppStyles';

export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <ActivityIndicator color={AppStyles.color.primary} animating={true} size="large" />
    </View>
  );
};