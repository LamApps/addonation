import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import {useAuth} from '../contexts/Auth';
import Firebase from "../config/firebase";

import { FontAwesome } from '@expo/vector-icons'; 

import { AppStyles } from '../AppStyles';
import InputPasswordToggle from '../components/InputPasswordToggle';

export default function SignUpScreen({navigation}:any) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, isLoading] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const auth = useAuth();

  useEffect(() => {
    var ref = Firebase.database().ref('totalSeconds')
    ref.once('value', (snapshot: { val: () => any; }) => {
      const data = snapshot.val()
      setTotalSeconds(data || 0)
    })
  }, [])
  
  const signUp = async () => {
    try {
      if (email !== '' && password !== '' && name !== '') {
        isLoading(true);
        await auth.signUp(email, password, name);
        Alert.alert('Congratulations!', 'Registered successfully!', [
          { text: 'OK', onPress: () => {
            navigation.navigate('Home')
          }},
        ]);
      }else{
        Alert.alert('Alert', 'Enter details to signup!', [
          { text: 'OK' },
        ]);
      }
    } catch (error) {
      isLoading(false);
      Alert.alert('Error', 'An error occured!', [
        { text: 'OK', onPress: () => {
          setEmail('');
          setPassword('');
          setName('');
        }},
      ]);
    }
  };
  return (
    <ScrollView style={styles.scrollView}>
        <View style={styles.topContainer}>
            <Text style={styles.secondsWorldwide}>{totalSeconds}</Text>
            <Text style={{color:AppStyles.color.primary, fontSize:16, marginBottom: 15}}>SECONDS WORLD WIDE</Text>
            <Text style={{color:AppStyles.color.text, fontSize:AppStyles.fontSize.medium, fontWeight: 'bold'}}>Create an Account</Text>
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
            <TextInput
              style={styles.inputStyle}
              placeholder="Full name"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              value={name}
              onChangeText={text => setName(text)}
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
                <TouchableOpacity style={styles.signInButton} onPress={signUp} ><Text style={{color:'white', fontSize: AppStyles.fontSize.normal, fontWeight:'bold'}}>CREATE AN ACCOUNT</Text></TouchableOpacity>
              )}
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
    padding: 13, 
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
  }
});
