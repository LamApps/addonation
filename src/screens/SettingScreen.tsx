import React, { useState, useCallback } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker'

import { FontAwesome5  } from '@expo/vector-icons'; 

import { AppStyles } from '../AppStyles';

export default function SettingScreen({ navigation }:any) {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [dayOpen, setDayOpen] = useState(false);
  const [scheduleValue, setScheduleValue] = useState(null);
  const [dayValue, setDayValue] = useState(null);
  const [scheduleItems, setScheduleItems] = useState([
    {label: 'Once a day', value: 'ariana'},
    {label: 'Twice a day', value: 'batista'},
    {label: 'Candy', value: 'candy'},
    {label: 'Dish', value: 'dish'},
  ]);

  const onScheduleOpen = useCallback(() => {
    setDayOpen(false);
  }, []);

  const onDayOpen = useCallback(() => {
    setScheduleOpen(false);
  }, []);

  const [dayItems, setDayItems] = useState([
    {label: 'Sunday', value: 'sun'},
    {label: 'Monday', value: 'mon'},
    {label: 'Tuesday', value: 'tue'},
    {label: 'Wednesday', value: 'wed'},
    {label: 'Thursday', value: 'thu'},
    {label: 'Friday', value: 'fri'},
    {label: 'Saturday', value: 'sat'},
  ]);

  return (
    <View style={styles.scrollView}>
        <Text style={styles.titleText}>How often do you want to donate?</Text>
        <DropDownPicker
          open={scheduleOpen}
          onOpen={onScheduleOpen}
          value={scheduleValue}
          items={scheduleItems}
          setOpen={setScheduleOpen}
          setValue={setScheduleValue}
          setItems={setScheduleItems}
          zIndex={3000}
          zIndexInverse={1000}
          style={{
            borderTopLeftRadius: 30, borderTopRightRadius: 30,
            borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
            paddingLeft: 20, borderColor: '#d1d1d1',
            marginBottom: 10, 
          }}
          dropDownContainerStyle={{
            borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
            paddingLeft: 15, borderColor: '#d1d1d1',
        }}
        />
        <Text style={styles.titleText}>Choose your convenient day</Text>
        <DropDownPicker
          mode="BADGE"
          multiple={true}
          min={0}
          max={2}
          open={dayOpen}
          onOpen={onDayOpen}
          value={dayValue}
          items={dayItems}
          setOpen={setDayOpen}
          setValue={setDayValue}
          setItems={setScheduleItems}
          zIndex={1000}
          zIndexInverse={3000}
          style={{
            borderTopLeftRadius: 30, borderTopRightRadius: 30,
            borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
            paddingLeft: 20, borderColor: '#d1d1d1',
            marginBottom: 10,
          }}
          dropDownContainerStyle={{
            borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
            paddingLeft: 15, borderColor: '#d1d1d1',
        }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  titleText: {
    color: AppStyles.color.primary,
    fontWeight: 'bold',
    fontSize: AppStyles.fontSize.medium,
    marginBottom: 10,
  },
});
