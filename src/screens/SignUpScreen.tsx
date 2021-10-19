import React from 'react';
import Button from "react-native-button";
import { StyleSheet, ScrollView, SafeAreaView, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

import { FontAwesome } from '@expo/vector-icons'; 

import { AppStyles } from '../AppStyles';

export default function SignUpScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <View style={styles.topContainer}>
                <Text style={styles.secondsWorldwide}>126234521</Text>
                <Text style={{color:AppStyles.color.primary, fontSize:16, marginBottom: 15}}>SECONDS WORLD WIDE</Text>
                <Text style={{color:AppStyles.color.text, fontSize:AppStyles.fontSize.medium, fontWeight: 'bold'}}>Create an Account</Text>
            </View>
            <View style={styles.bottomContainer}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Email"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                ></TextInput>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Full name"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                ></TextInput>
                <TextInput
                style={styles.inputStyle}
                secureTextEntry={true}
                placeholder="Password"
                underlineColorAndroid="transparent"
                ></TextInput>
                <TextInput
                style={styles.inputStyle}
                secureTextEntry={true}
                placeholder="Confirm password"
                underlineColorAndroid="transparent"
                ></TextInput>
                <Button containerStyle={styles.signInButton} style={{color:'white', fontSize: AppStyles.fontSize.normal, fontWeight:'bold'}}>CREATE AN ACCOUNT</Button>
                <View
                  style={{
                    borderBottomColor: '#d1d1d1',
                    borderBottomWidth: 1,
                    marginTop: 25,
                  }}
                />
                <View style={styles.socialSignin}>
                  <TouchableOpacity style={styles.socialButton}><FontAwesome name="google" size={32} color={AppStyles.color.secondary} /></TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}><FontAwesome name="facebook" size={32} color={AppStyles.color.secondary} /></TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}><FontAwesome name="twitter" size={32} color={AppStyles.color.secondary} /></TouchableOpacity>
                </View>
                <View style={styles.footer}>
                  <TouchableOpacity onPress={() => navigation.navigate('Home')}><Text style={styles.textButtons}>Sign In</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('ResetPwd')}><Text style={styles.textButtons}>Forgot password?</Text></TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
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
    paddingTop: 10,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
  },
  inputStyle: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: AppStyles.color.border,
    padding: 8,
    paddingLeft: 15,
    marginBottom: 15,
  },
  signInButton: { 
    padding: 15, 
    overflow: 'hidden', 
    borderRadius: 30, 
    backgroundColor: '#EC6700' 
  },
  socialSignin: {
    flexDirection: 'row',
    paddingTop: 15,
    justifyContent: 'center'
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'rgba(46, 229, 157, 0.4)',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 20 ,
    shadowOffset : { width: 1, height: 13},
    marginHorizontal: 20
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between'
  },
  textButtons: {
    color:AppStyles.color.primary, 
    fontWeight: 'bold'
  }
});
