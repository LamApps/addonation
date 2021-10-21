import React from 'react';
import Button from "react-native-button";
import { StyleSheet, ScrollView, SafeAreaView, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

import { FontAwesome } from '@expo/vector-icons'; 

import { AppStyles } from '../AppStyles';

export default function HomeScreen({ navigation }:any) {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <View style={styles.topContainer}>
                <Text style={styles.secondsWorldwide}>126234521</Text>
                <Text style={{color:'white', fontSize:16, marginBottom: 5}}>SECONDS WORLD WIDE</Text>
                <Image source={require('../../assets/img/white-pig.png')} style={styles.logo}></Image>
                <Text style={{color:'white', fontSize:AppStyles.fontSize.large, fontWeight: 'bold'}}>SIX SECONDS</Text>
            </View>
            <View>
                <Image source={require('../../assets/img/first_back.png')} style={styles.imageContent}>
                </Image>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{color:'white', fontSize:AppStyles.fontSize.medium}}>TO FIX THE WORLD!</Text>
                    <Text style={{color:'black', fontSize:AppStyles.fontSize.medium}}>Login to your account</Text>
                </View>
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
                secureTextEntry={true}
                placeholder="Password"
                underlineColorAndroid="transparent"
                ></TextInput>
                <Button containerStyle={styles.signInButton} onPress={() => navigation.navigate('TabRoot', { screen: 'Dashboard' })} style={{color:'white', fontSize: AppStyles.fontSize.normal, fontWeight:'bold'}}>Sign in</Button>
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
                  <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={styles.textButtons}>Sign Up</Text></TouchableOpacity>
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
    backgroundColor: AppStyles.color.primary,
    paddingTop: 35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  secondsWorldwide: {
    color: 'white',
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
