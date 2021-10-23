import React from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker'

import { FontAwesome5  } from '@expo/vector-icons'; 

import { AppStyles } from '../AppStyles';

export default function SettingScreen({ navigation }:any) {

  return (
    <ScrollView style={styles.scrollView}>
        <Text style={styles.titleText}>How often do you want to donate?</Text>
        <DropDownPicker
          items={[
              {label: 'English', value: 'en'},
              {label: 'Deutsch', value: 'de'},
              {label: 'French', value: 'fr'},
          ]}
          defaultIndex={0}
          containerStyle={{height: 40}}
          onChangeItem={item => console.log(item.label, item.value)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
    padding: 20,
  },
  titleText: {
    color: AppStyles.color.primary,
    fontWeight: 'bold',
    fontSize: AppStyles.fontSize.medium,
  },
});
