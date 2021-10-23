import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image } from 'react-native';
import Button from "react-native-button";

import { AppStyles } from '../AppStyles';
const appData = [
    {
        id: "1",
        author: "Alice Walker",
        quote: "2021/09/21 15:21:00",
        description: "Lorem ipsum dolor sit amet is the most popular dummy text in the world! You already know that? Yeah, Good! But never confident you can not do all things in the world with it!",
        imgUrl: "https://source.unsplash.com/200x300/?nature"
    },
    {
        id: "2",
        author: "James Coulter",
        quote: "2021/09/21 15:21:00",
        description: "Lorem ipsum dolor sit amet is the most popular dummy text in the world! You already know that? Yeah, Good! But never confident you can not do all things in the world with it!",
        imgUrl: "https://source.unsplash.com/200x300/?water"
    },
    {
        id: "3",
        author: "Neymar John",
        quote: "2021/09/21 15:21:00",
        description: "Lorem ipsum dolor sit amet is the most popular dummy text in the world! You already know that? Yeah, Good! But never confident you can not do all things in the world with it!",
        imgUrl: "https://source.unsplash.com/200x300/?island"
    }
];

const Item = ({item}) => (
    <View style={styles.listContainer}>
        <View style={styles.innerContent}>
            <Image
                source={{uri: item.imgUrl}}
                style={styles.image}
            />
            <Text style={styles.header}>{item.author}</Text>
            <Text style={styles.time}>{item.quote}</Text>
            <Text style={styles.body}>{item.description}</Text>
            <Button containerStyle={styles.readMoreButton} style={{color:'white', fontSize: AppStyles.fontSize.normal, fontWeight:'bold'}}>Read More</Button>
        </View>
    </View>
);

export default function NewsScreen({navigation}) {
  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={appData} renderItem={renderItem} keyExtractor={item => item.id} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    listContainer: {
        padding: 10,
    },
    innerContent: {
        backgroundColor: 'white',
        borderRadius: 15,
        paddingBottom: 20,
        elevation: 7,
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    header: {
        color: AppStyles.color.text,
        fontSize: AppStyles.fontSize.medium,
        fontWeight: 'bold',
        paddingTop: 15,
        paddingLeft: 20,
    },
    time: {
        color: AppStyles.color.textMute,
        fontSize: AppStyles.fontSize.normal,
        paddingHorizontal: 20,
        paddingTop: 5,
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
    
});