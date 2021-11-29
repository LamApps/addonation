import React, { useState, useEffect}  from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import Firebase from "../config/firebase";
import {useAuth} from '../contexts/Auth';

import Seconds from '../components/Seconds';

import { FontAwesome5  } from '@expo/vector-icons'; 

import { AppStyles } from '../AppStyles';

export default function GiftScreen({ navigation }:any) {
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [mySeconds, setMySeconds] = useState(0)
  const auth = useAuth()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      var uid = auth.authData?.token;
      const mySecRef = Firebase.database().ref('seconds/'+uid)
      mySecRef.once('value', (snapshot: { val: () => any; }) => {
        const data = snapshot.val()
        setMySeconds(data.total || 0)
      })
      var ref = Firebase.database().ref('totalSeconds')
      ref.once('value', (snapshot: { val: () => any; }) => {
        const data = snapshot.val()
        setTotalSeconds(data || 0)
      })
    })
    return unsubscribe
  }, [])

  return (
    <ScrollView style={styles.scrollView}>
        <Seconds totalSeconds={totalSeconds} mySeconds={mySeconds} />
        <Image source={require('../../assets/img/gift.png')} style={styles.gift}></Image>
        <View style={styles.textContainer}>
            <Text style={{textAlign: 'center'}}>
                Thank you, <Text style={{color: AppStyles.color.primary}}>Sweetheart</Text> 
            </Text>
            <Text style={{textAlign: 'center'}}>
                You have donated 5000 seconds in total now. As a token of our appreciation, we will reward you with <Text style={{color: AppStyles.color.primary}}>5000</Text> USD.
            </Text>
        </View>
        <View style={styles.rewardContainer}>
            <TouchableOpacity style={styles.rewardButton}>
                <FontAwesome5  name="hand-holding-usd" size={32} color='white' />
                <Text style={{color:'white', fontWeight: 'bold'}}>Get</Text>
                <Text style={{color:'white', fontWeight: 'bold'}}>Rewarded</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff'
  },
  gift: {
    width:300,
    height:204,
    resizeMode:'contain',
    marginVertical: 10,
    alignSelf: 'center',
  },
  textContainer: {
    padding: 15,
  },
  rewardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardButton: {
    marginVertical: 20,
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.color.primary,
    elevation: 8,
  }

});
