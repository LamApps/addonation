import React from 'react';
import Button from "react-native-button";
import { StyleSheet, ScrollView, SafeAreaView, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

import { FontAwesome } from '@expo/vector-icons'; 

import { AppStyles } from '../AppStyles';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <View style={styles.topContainer}>
                <View style={styles.secondContainer}>
                    <Text style={styles.secondsWorldwide}>126234521</Text>
                    <Text style={{color:AppStyles.color.primary, fontSize:16, marginBottom: 5}}>SECONDS WORLD WIDE</Text>
                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.secondsWorldwide}>201</Text>
                    <Text style={{color:AppStyles.color.primary, fontSize:16, marginBottom: 5}}>MY SECONDS</Text>
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
    paddingTop: 20,
    paddingHorizontal: 30,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  secondContainer: {
    alignItems: 'center'
  },
  secondsWorldwide: {
    color: AppStyles.color.text,
    fontSize: AppStyles.fontSize.extraLarge,
    fontFamily: 'normal',
    fontWeight: 'bold',
  },
});
