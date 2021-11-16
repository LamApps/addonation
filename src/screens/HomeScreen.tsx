import React, {useState, useEffect} from 'react';
import Button from "react-native-button";
import { StyleSheet, ScrollView, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import {useAuth} from '../contexts/Auth';
import Firebase from "../config/firebase";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AppStyles } from '../AppStyles';

import InputPasswordToggle from '../components/InputPasswordToggle';

export default function HomeScreen({ navigation }:any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, isLoading] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const auth = useAuth();

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

  const signIn = async () => {
    try {
      if (email !== '' && password !== '') {
        isLoading(true);
        await auth.signIn(email, password);
      }else{
        Alert.alert('Alert', 'Enter your credential info!', [
          { text: 'OK' },
        ]);
      }
    } catch (error) {
      console.log(error.message);
      isLoading(false);
      Alert.alert('Error', error.message, [
        { text: 'OK', onPress: () => {
          setEmail('');
          setPassword('');
        }},
      ]);
    }
  };
  return (
      <ScrollView style={styles.scrollView}>
          <View style={styles.topContainer}>
              <Text style={styles.secondsWorldwide}>{totalSeconds}</Text>
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
                value={email}
                onChangeText={text => setEmail(text)}
              ></TextInput>
              <InputPasswordToggle 
                placeholder="Password"
                style={styles.inputStyle}
                iconColor='#777'
                iconSize={18}
                value={password}
                onChangeText={setPassword}/>
              {loading ? (
                <ActivityIndicator color={'#000'} animating={true} size="small" />
              ) : (
                <Button containerStyle={styles.signInButton} onPress={signIn} style={{color:'white', fontSize: AppStyles.fontSize.normal, fontWeight:'bold'}}>Sign in</Button>
              )}
              <View
                style={{
                  borderBottomColor: '#d1d1d1',
                  borderBottomWidth: 1,
                  marginTop: 25,
                }}
              />
              <View style={styles.socialSignin}>
                <TouchableOpacity style={styles.socialButton}><MaterialCommunityIcons name="google" size={32} color={AppStyles.color.secondary} /></TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}><MaterialCommunityIcons name="facebook" size={32} color={AppStyles.color.secondary} /></TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}><MaterialCommunityIcons name="twitter" size={32} color={AppStyles.color.secondary} /></TouchableOpacity>
              </View>
              <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={styles.textButtons}>Sign Up</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ResetPwd')}><Text style={styles.textButtons}>Forgot password?</Text></TouchableOpacity>
              </View>
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
    width: '100%',
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
  },
});
