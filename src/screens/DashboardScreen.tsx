import React, {useState, useEffect} from 'react'
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native'
import Firebase from "../config/firebase"
import {useAuth} from '../contexts/Auth'

import Carousel from '../components/Carousel/Carousel'
import Seconds from '../components/Seconds'

import { FontAwesome } from '@expo/vector-icons' 

import { AppStyles } from '../AppStyles'

export default function DashboardScreen({ navigation }:any) {
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [mySeconds, setMySeconds] = useState(0)
  const auth = useAuth()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      var uid = auth.authData?.token
      const mySecRef = Firebase.database().ref('seconds/'+uid)
      mySecRef.once('value', (snapshot: { val: () => any }) => {
        const data = snapshot.val()
        setMySeconds(data.total || 0)
      })
      var ref = Firebase.database().ref('totalSeconds')
      ref.once('value', (snapshot: { val: () => any }) => {
        const data = snapshot.val()
        setTotalSeconds(data || 0)
      })
    })
    return unsubscribe
  }, [])

  return (
    <ScrollView style={styles.scrollView}>
        <Seconds totalSeconds={totalSeconds} mySeconds={mySeconds} />
        <View style={styles.carouselContainer}>
            <Carousel navigation={navigation} />
        </View>
        <View style={styles.donateContainer}>
            <Text style={{color:AppStyles.color.primary, fontSize:AppStyles.fontSize.large, fontWeight: 'bold'}}>SIX SECONDS</Text>
            <Text style={{color:AppStyles.color.text, fontSize:AppStyles.fontSize.medium, fontWeight: 'bold'}}>TO FIX THE WORLD!</Text>
            <TouchableOpacity style={styles.donateButton} onPress={()=>{navigation.navigate('Donate')}}>
                <FontAwesome name="play" size={32} color='white' />
                <Text style={{color:'white', fontWeight: 'bold'}}>Donate your</Text>
                <Text style={{color:'white', fontWeight: 'bold'}}>6 sec</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f1f1f1'
  },
  carouselContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 5,
      paddingTop: 20,
      paddingHorizontal: 50,
  },
  donateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  donateButton: {
    marginVertical: 20,
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.color.primary,
    elevation: 8,
  }
})
