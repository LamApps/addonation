import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import {useAuth} from '../contexts/Auth';
import Firebase from "../config/firebase";
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import firebase from 'firebase';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AppStyles } from '../AppStyles';

import InputPasswordToggle from '../components/InputPasswordToggle';

WebBrowser.maybeCompleteAuthSession();

export default function HomeScreen({ navigation }:any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, isLoading] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const auth = useAuth();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      expoClientId: '675640908306-eastohfr65lgv76bajr0ajk5qg14fola.apps.googleusercontent.com',
      iosClientId: Constants.manifest.extra.iosOauthClientId,
      androidClientId: Constants.manifest.extra.androidOauthClientId,
    },
  );
  useEffect(() => {
    if (response?.type === 'success') {
      isLoading(true)
      const { id_token } = response.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token)
      // Firebase.database().ref('users').push({ id: credential.user.uid, email: email, password: password, name: name, type: 'email'});
      auth.signInWithCredential(credential)
      .then(value=>{
        isLoading(false)
      })
      .catch(error => {
        isLoading(false)
        Alert.alert('Error', error.message, [
          { text: 'OK' },
        ]);
      }) 
    }
  }, [response]);

  useEffect(() => {
    var ref = Firebase.database().ref('totalSeconds')
    ref.once('value', (snapshot: { val: () => any; }) => {
      const data = snapshot.val()
      setTotalSeconds(data || 0)
    })
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
        { text: 'OK' },
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
                onChangeText={setPassword} inputStyle={undefined} icon={undefined}/>
              {loading ? (
                <ActivityIndicator color={AppStyles.color.primary} animating={true} size="large" />
              ) : (
                <TouchableOpacity style={styles.signInButton} onPress={signIn}><Text style={{color:'white', fontSize: AppStyles.fontSize.normal, fontWeight:'bold'}}>Sign In</Text></TouchableOpacity>
              )}
              <View
                style={{
                  borderBottomColor: '#d1d1d1',
                  borderBottomWidth: 1,
                  marginTop: 25,
                }}
              />
              <View style={styles.socialSignin}>
                <TouchableOpacity style={styles.socialButton}><MaterialCommunityIcons name="google" size={32} color={AppStyles.color.secondary} onPress={()=>{promptAsync()}} /></TouchableOpacity>
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
    padding: 13, 
    overflow: 'hidden', 
    borderRadius: 30, 
    backgroundColor: AppStyles.color.primary,
    justifyContent: 'center',
    alignItems: 'center',
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
