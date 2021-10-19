import React from 'react';
import Button from "react-native-button";
import { StyleSheet, SafeAreaView, Text, View, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';

import { Ionicons } from '@expo/vector-icons'; 
import { AppStyles } from '../AppStyles';

export default function Header(prop: { title: string; navigation: any; viewLogout: boolean }) {
    const {title, navigation, viewLogout} = prop;
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                    if(title!=='DASHBOARD') navigation.goBack()
                }}>
                <Ionicons name="chevron-back-circle" size={28} color="white" />
            </TouchableOpacity>
            <View><Text style={styles.titleText}>{title}</Text></View>
            <TouchableOpacity
                style={{ padding: 12 }}
                onPress={() => {
                navigation.navigate('Home');
                }}>
                {viewLogout?<Ionicons name="exit-outline" size={26} color="white" />:<></>}
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: AppStyles.color.primary,
      paddingTop: StatusBar.currentHeight,
      paddingHorizontal: 12,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    titleText: {
        color: 'white',
        fontSize: AppStyles.fontSize.medium,
        fontWeight: 'bold',
        padding: 10,
    },
  });
  