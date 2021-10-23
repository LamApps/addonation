import React from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';

import Seconds from '../components/Seconds';

import { FontAwesome5  } from '@expo/vector-icons'; 

import { AppStyles } from '../AppStyles';

export default function GiftScreen({ navigation }:any) {

  return (
    <ScrollView style={styles.scrollView}>
        <Seconds />
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
