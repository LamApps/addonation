import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import Constants from 'expo-constants';

import { AppStyles } from '../AppStyles';

const baseUrl = Constants.manifest.extra.apiBaseUrl

export default function NewsDetailScreen({route, navigation}) {
  const { item } = route.params;
  const date = new Date(item.created_at)
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{item.title}</Text>
      <View style={styles.imageContainer}>
        <Image
            source={{uri: baseUrl+'/storage/news/'+item.featured_img}}
            style={styles.image}
        />
      </View>
      <Text style={styles.time}>{moment([date.getFullYear(), date.getMonth(), date.getDate()]).fromNow()}</Text>
      <Text style={styles.body}>{item.content}</Text>
      <TouchableOpacity style={styles.backButton} onPress={()=>{navigation.goBack()}}><Text style={{color: 'white'}}>GO BACK</Text></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    imageContainer: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        marginHorizontal: 10,
        elevation: 7,
    },
    time: {
      color: AppStyles.color.text,
      fontWeight: 'bold',
      padding: 20,
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
        alignSelf: 'center',
    },
    header: {
        color: AppStyles.color.text,
        fontSize: AppStyles.fontSize.large,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 15,
    },
    body: {
        color: AppStyles.color.textMute,
        fontSize: AppStyles.fontSize.normal,
        paddingHorizontal: 20,
        paddingTop: 5,
    },
    readMoreButton: {
        padding: 10, 
        overflow: 'hidden', 
        borderRadius: 30,
        width: 100,
        alignSelf: 'flex-end',
        backgroundColor: AppStyles.color.primary,
        marginTop: 5,
        marginRight: 20,
    },
    backButton: {
      padding: 10, 
      width: 100,
      overflow: 'hidden', 
      borderRadius: 30, 
      backgroundColor: AppStyles.color.primary, 
      marginVertical: 20,
      marginRight: 20,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end'
    },
});