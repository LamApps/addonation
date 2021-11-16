import React, { useState, useCallback } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker'

import moment from 'moment';
import { FontAwesome  } from '@expo/vector-icons'; 

import { AppStyles } from '../AppStyles';

export default function SettingScreen({ navigation }:any) {

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showTimepicker = () => {
    setShow(true);
  };
  // const [scheduleOpen, setScheduleOpen] = useState(false);
  // const [dayOpen, setDayOpen] = useState(false);
  // const [scheduleValue, setScheduleValue] = useState(null);
  // const [dayValue, setDayValue] = useState(null);
  // const [scheduleItems, setScheduleItems] = useState([
  //   {label: 'Once a day', value: 'ariana'},
  //   {label: 'Twice a day', value: 'batista'},
  //   {label: 'Candy', value: 'candy'},
  //   {label: 'Dish', value: 'dish'},
  // ]);

  // const onScheduleOpen = useCallback(() => {
  //   setDayOpen(false);
  // }, []);

  // const onDayOpen = useCallback(() => {
  //   setScheduleOpen(false);
  // }, []);

  // const [dayItems, setDayItems] = useState([
  //   {label: 'Sunday', value: 'sun'},
  //   {label: 'Monday', value: 'mon'},
  //   {label: 'Tuesday', value: 'tue'},
  //   {label: 'Wednesday', value: 'wed'},
  //   {label: 'Thursday', value: 'thu'},
  //   {label: 'Friday', value: 'fri'},
  //   {label: 'Saturday', value: 'sat'},
  // ]);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(moment(currentDate).format('HH:mm A'));
  };
  return (
    <View style={styles.container}>
      {show && (
        <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
      )}
      <TouchableOpacity style={styles.createBtn} onPress={showTimepicker}>
        <FontAwesome name="plus" size={18} color={AppStyles.color.primary}></FontAwesome>
        <Text style={{color:AppStyles.color.primary, fontWeight: 'bold', fontSize: AppStyles.fontSize.normal, marginLeft:10}}>CREAT SCHEDULE</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        
          {/*<Text style={styles.titleText}>How often do you want to donate?</Text>
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
          /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollView: {

  },
  createBtn: {
    flexDirection: 'row',
    borderRadius: 100,
    backgroundColor: '#fff',
    borderColor: AppStyles.color.primary,
    borderWidth: 1,
    padding: 12,
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 15,
  },
});
