import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, Text, SafeAreaView, View, TouchableOpacity, Platform, FlatList, TextInput, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "firebase";
import * as Notifications from 'expo-notifications';
import moment from 'moment';
import { FontAwesome  } from '@expo/vector-icons'; 
import InputPasswordToggle from '../components/InputPasswordToggle';
import {useAuth} from '../contexts/Auth';

import { AppStyles } from '../AppStyles';

type ScheduleOption = {
  count: number;
  alarms: Array<{time: Date; identifier: string;}>;
};

export default function SettingScreen({ navigation }:any) {
  const [alarms, setAlarms] = useState([]);
  const auth = useAuth()
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    loadStorageData()
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    })
  }, [])

  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState(auth.authData?.email)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const showTimepicker = () => {
    setShow(true)
  }
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [scheduleValue, setScheduleValue] = useState(1)
  const [scheduleItems, setScheduleItems] = useState([
    {label: 'Once a day', value: 1},
    {label: 'Twice a day', value: 2},
    {label: 'Thrice a day', value: 3},
  ])

  const onChange = async (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    if(currentDate) {
      setDate(currentDate);
      if(alarms.length<scheduleValue) {
        const identifier = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Time to donate!',
            body: "Now you can donate your 6 seconds to fix the world!",
          },
          trigger: {
            hour: currentDate.getHours(),
            minute: currentDate.getMinutes(),
            repeats: true,
          },
        })
        setAlarms([...alarms, {time: currentDate, identifier: identifier}])
        AsyncStorage.setItem('@Schedule', JSON.stringify({count: scheduleValue, alarms: [...alarms, {time: currentDate, identifier: identifier}]}))
      }else{
        Alert.alert('Error', 'You can not create a schedule anymore.', [
          { text: 'OK' },
        ]);
      }
    }
  };

  async function loadStorageData(): Promise<void> {
    try {
      //Try get the data from Async Storage
      const scheduleOption = await AsyncStorage.getItem('@Schedule')
      if (scheduleOption) {
        //If there are data, it's converted to an Object and the state is updated.
        const schedule:ScheduleOption = JSON.parse(scheduleOption)
        setScheduleValue(schedule.count)
        setAlarms(schedule.alarms)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onChangeEmailHandler = () => {
    if(email == auth.authData.email) {
      Alert.alert('Error', 'Please enter an other email address.', [
        { text: 'OK' },
      ]);
    }else if(oldPassword==''){
      Alert.alert('Error', 'Please enter your current password.', [
        { text: 'OK' },
      ]);
    }else{
      isLoading(true)
      changeEmail(oldPassword, email)
    }
  }

  const onChangePasswordHandler = () => {
    if(oldPassword == '') {
      Alert.alert('Error', 'Please enter your current password.', [
        { text: 'OK' },
      ]);
    }else if(newPassword==''){
      Alert.alert('Error', 'Please enter your new password.', [
        { text: 'OK' },
      ]);
    }else{
      isLoading(true)
      changePassword(oldPassword, newPassword)
    }
  }

  const reauthenticate = (currentPassword: string) => {
    var user = firebase.auth().currentUser
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword)
    return user.reauthenticateWithCredential(cred)
  }

  const changeEmail = (currentPassword: string, newEmail: string) => {
    reauthenticate(currentPassword)
    .then(() => {
      var user = firebase.auth().currentUser
      user.updateEmail(newEmail).then(() => {
        isLoading(false)
        Alert.alert('Congratulations!', "Your email is succesfully changed!\nPlease login with your new email.", [
          { text: 'OK', onPress:()=>{
            auth.signOut()
          }},
        ])
      }).catch((error) => { 
        isLoading(false)
        Alert.alert('Error', error.message, [
          { text: 'OK' },
        ]);
      })
    })
    .catch((error) => {
      isLoading(false)
      Alert.alert('Error', error.message, [
        { text: 'OK' },
      ]);
     })
  }

  const changePassword = (currentPassword: string, newPassword: string) => {
    reauthenticate(currentPassword)
    .then(() => {
      var user = firebase.auth().currentUser
      user.updatePassword(newPassword).then(() => {
        isLoading(false)
        setOldPassword('')
        setNewPassword('')
        Alert.alert('Congratulations!', "Your password is succesfully changed!", [
          { text: 'OK' },
        ])
      })
      .catch((error) => { 
        isLoading(false)
        Alert.alert('Error', error.message, [
          { text: 'OK' },
        ]);          
      })
    })
    .catch((error) => { 
      isLoading(false)
      Alert.alert('Error', error.message, [
        { text: 'OK' },
      ]);
     })
  }
  const onRemoveSchedule = (time)=>{
    const filteredData = alarms.filter(item => item.identifier !== time.identifier)
    setAlarms(filteredData)
    AsyncStorage.setItem('@Schedule', JSON.stringify({count: scheduleValue, alarms: filteredData}))
    Notifications.cancelScheduledNotificationAsync(time.identifier)
  }

  return (
      <FlatList style={styles.container} data={alarms} renderItem={
        ({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{moment(item.time).format('HH:mm A')}
            </Text>
            <Text style={styles.itemText}>
              <TouchableOpacity onPress={()=>{onRemoveSchedule(item)}}>
                <FontAwesome name="trash" size={18} color={AppStyles.color.primary}></FontAwesome>
              </TouchableOpacity>
            </Text>
        </View>
        )
      }  keyExtractor={item => item.identifier} ListHeaderComponent={
        <>
          <Text style={styles.titleText}>Change your Email?</Text>
          <TextInput
                  style={styles.inputStyle}
                  placeholder="Email"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  value={email}
                  onChangeText={text => setEmail(text)}
              ></TextInput>
            {loading ? (
                <ActivityIndicator color={AppStyles.color.primary} animating={true} size="large" style={{padding:12}} />
              ) : (
                <TouchableOpacity style={styles.createBtn} onPress={onChangeEmailHandler}>

                  <FontAwesome name="envelope-o" size={18} color={AppStyles.color.primary}></FontAwesome>
                  <Text style={{color:AppStyles.color.primary, fontWeight: 'bold', fontSize: AppStyles.fontSize.normal, marginLeft:10}}>CHANGE EMAIL</Text>
                </TouchableOpacity>
              )}
          
          <Text style={styles.titleText}>Change your password?</Text>
          <InputPasswordToggle 
            placeholder="Current Password"
            style={styles.inputStyle}
            iconColor='#777'
            iconSize={18}
            value={oldPassword}
            onChangeText={setOldPassword} inputStyle={undefined} icon={undefined}/>
          <InputPasswordToggle 
            placeholder="New Password"
            style={styles.inputStyle}
            iconColor='#777'
            iconSize={18}
            value={newPassword}
            onChangeText={setNewPassword} inputStyle={undefined} icon={undefined}/>
            {loading ? (
                <ActivityIndicator color={AppStyles.color.primary} animating={true} size="large" style={{padding:12}} />
              ) : (
                <TouchableOpacity style={styles.createBtn} onPress={onChangePasswordHandler}>
                  <FontAwesome name="lock" size={18} color={AppStyles.color.primary}></FontAwesome>
                  <Text style={{color:AppStyles.color.primary, fontWeight: 'bold', fontSize: AppStyles.fontSize.normal, marginLeft:10}}>CHANGE PASSWORD</Text>
                </TouchableOpacity>
              )}
          <Text style={styles.titleText}>How often do you want to donate?</Text>
          <DropDownPicker
                open={scheduleOpen}
                value={scheduleValue}
                items={scheduleItems}
                setOpen={setScheduleOpen}
                setValue={setScheduleValue}
                setItems={setScheduleItems}
                style={{
                  borderTopLeftRadius: 30, borderTopRightRadius: 30,
                  borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
                  paddingLeft: 20, borderColor: '#d1d1d1',
                  marginBottom: 10, 
                }}
                dropDownDirection="TOP"
                dropDownContainerStyle={{
                  borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                  paddingLeft: 15, borderColor: '#d1d1d1',
              }}
              />
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
        </>
      } ListFooterComponent={
        <View style={{padding:20}}></View>
      } />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  inputStyle: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: AppStyles.color.border,
    padding: 8,
    paddingLeft: 15,
    marginBottom: 15,
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
  titleText: {
    color: AppStyles.color.primary,
    fontWeight: 'bold',
    fontSize: AppStyles.fontSize.medium,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  itemText: {
    fontSize: AppStyles.fontSize.medium,
    fontWeight: 'bold',
  },
});
