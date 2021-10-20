import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppStyles } from '../AppStyles';

export default function Seconds() {
  return (
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
  );
}

const styles = StyleSheet.create({
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
