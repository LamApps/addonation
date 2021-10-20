import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

import Seconds from '../components/Seconds';

import { FontAwesome } from '@expo/vector-icons'; 

import { AppStyles } from '../AppStyles';

export default function DonateScreen({ navigation }:any) {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <Seconds />

            <View style={styles.donateContainer}>
                <Text style={{color:AppStyles.color.primary, fontSize:AppStyles.fontSize.large, fontWeight: 'bold'}}>SIX SECONDS</Text>
                <Text style={{color:AppStyles.color.text, fontSize:AppStyles.fontSize.medium, fontWeight: 'bold'}}>TO FIX THE WORLD!</Text>
                <TouchableOpacity style={styles.donateButton}>
                    <FontAwesome name="play" size={32} color='white' />
                    <Text style={{color:'white', fontWeight: 'bold'}}>Donate your</Text>
                    <Text style={{color:'white', fontWeight: 'bold'}}>6 sec</Text>
                </TouchableOpacity>
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
});
