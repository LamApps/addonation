import React, { useState, useEffect, useCallback}  from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import Firebase from "../config/firebase";
import {useAuth} from '../contexts/Auth';
import axios from 'axios';
import moment from 'moment';
import Seconds from '../components/Seconds';

import { AppStyles } from '../AppStyles';

import {baseUrl} from '../config/firebase';

export default function GiftScreen({ navigation }:any) {
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [mySeconds, setMySeconds] = useState(0)
  const [donors, setDonors] = useState([])
  const [isMine, setMine]  = useState(false)
  const [message, setMessage]  = useState('')

  const auth = useAuth()
  //get all donors from api

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
      axios({
        method: 'get',
        url: `${baseUrl}/api/get_public_events`,
      }).then((response) => {
        const data = response.data
        setDonors(data)
        if(data.length>0) setMessage(data[0].message)
        var uid = auth.authData?.token;
        var index = data.findIndex((donor) => {
          return donor.uid == uid
        })
        setMine(index>-1?true:false)
      }).catch(error=>{
        Alert.alert('Error', error.message, [
            { text: 'OK' },
          ]);
      })
    })
    return unsubscribe
  }, [])

  const renderItem =  useCallback((donor) => 
  (
    <View style={styles.donorItemContainer} key={donor.uid}>
      <View>
        <Text style={{fontWeight: 'bold', fontSize:18, color: AppStyles.color.primary}}>{donor.name}</Text>
        <Text>{donor.seconds} seconds</Text>
      </View>
      <View>
        <Text>{moment(donor.created_at).fromNow()}</Text>
      </View>
    </View>
  ), [donors]
  )
  return (
    <ScrollView style={styles.scrollView}>
        <Seconds totalSeconds={totalSeconds} mySeconds={mySeconds} />
        <Image source={require('../../assets/img/gift.png')} style={styles.gift}></Image>
        <View style={styles.textContainer}>
          {isMine && 
            <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 10}}>
                Congratulations, <Text style={{color: AppStyles.color.primary}}>{auth.authData?.name}</Text> !
            </Text>
          }
            <Text>
                {message}
            </Text>
        </View>
        <View style={styles.donorsTitle}><Text style={{textAlign: 'center', fontSize: AppStyles.fontSize.medium}}>Donors Awarded</Text></View>
        { donors.length>0 ? donors.map(renderItem) : <View style={styles.donorItemContainer}><Text>There are no events yet.</Text></View> }
        <View style={styles.donorsTitle}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
    padding: 20,
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
  donorItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderLeftWidth: 5,
    borderColor: AppStyles.color.primary,
    backgroundColor: '#f5f5f5',
    marginBottom: 10
  },
  donorsTitle: {
    padding: 20,
  }

});
