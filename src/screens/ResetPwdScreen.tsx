import React, {useState, useEffect} from 'react';
import Button from "react-native-button";
import { StyleSheet, ScrollView, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import Firebase from "../config/firebase";

import { AppStyles } from '../AppStyles';

export default function ResetPwdScreen({navigation}:any) {
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    var ref = Firebase.database().ref('totalSeconds')
    ref.on('value', (snapshot: { val: () => any; }) => {
      const data = snapshot.val()
      setTotalSeconds(data || 0)
    })
    return function cleanup() {
      ref.off()
    }
  }, [])
  
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.topContainer}>
            <Text style={styles.secondsWorldwide}>{totalSeconds}</Text>
            <Text style={{color:AppStyles.color.primary, fontSize:16, marginBottom: 35}}>SECONDS WORLD WIDE</Text>
            <Text style={{color:AppStyles.color.text, fontSize:AppStyles.fontSize.medium, fontWeight: 'bold'}}>Forgot Password?</Text>
            <Text style={{color:AppStyles.color.textMute, textAlign: 'center', paddingHorizontal: 30}}>Please input your email address and click "RESET PASSWORD" button. And then you will receive a mail with new password.</Text>
        </View>
        <View style={styles.bottomContainer}>
            <TextInput
              style={styles.inputStyle}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
            ></TextInput>
            <Button containerStyle={styles.resetButton} style={{color:'white', fontSize: AppStyles.fontSize.normal, fontWeight:'bold'}}>RESET PASSWORD</Button>
            <Button containerStyle={styles.signInButton} onPress={() => navigation.navigate('Home')} style={{color:'black', fontSize: AppStyles.fontSize.normal, fontWeight:'bold'}}>SIGN IN</Button>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff'
  },
  topContainer: {
    alignSelf: 'stretch',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  secondsWorldwide: {
    color: AppStyles.color.textMute,
    fontSize: AppStyles.fontSize.extraLarge,
    fontFamily: 'normal',
    fontWeight: 'bold',
  },
  logo: {
    width:200,
    height:185,
    resizeMode:'contain',
    marginBottom: 8,
  },
  imageContent: {
      width: '100%',
      height: 120,
      resizeMode: 'stretch'
  },
  bottomContainer: {
    paddingHorizontal: 40,
    paddingTop: 30,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
  },
  inputStyle: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: AppStyles.color.border,
    padding: 8,
    paddingLeft: 15,
    marginBottom: 25,
  },
  resetButton: { 
    padding: 15, 
    overflow: 'hidden', 
    borderRadius: 30, 
    backgroundColor: '#EC6700',
    marginBottom: 25,
  },
  signInButton: {
    padding: 15, 
    overflow: 'hidden', 
    borderRadius: 30, 
    backgroundColor: '#d1d1d1' 
  },
});
