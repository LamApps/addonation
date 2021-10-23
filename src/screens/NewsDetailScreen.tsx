import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import Button from 'react-native-button';

import { AppStyles } from '../AppStyles';

export default function NewsDetailScreen({route, navigation}) {
  const { item } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{item.author}</Text>
      <View style={styles.imageContainer}>
        <Image
            source={{uri: item.imgUrl}}
            style={styles.image}
        />
      </View>
      <Text style={styles.time}>{item.quote}</Text>
      <Text style={styles.body}>{item.description}</Text>
      <Button containerStyle={styles.backButton} style={{color:'white', fontSize: AppStyles.fontSize.normal, fontWeight:'bold'}} onPress={()=>{navigation.goBack()}}>GO BACK</Button>
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
      marginTop: 20,
      marginRight: 20,
      alignSelf: 'flex-end'
    },
});