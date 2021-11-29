import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { AppStyles } from '../../AppStyles';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselItem = ({ item, index }:any) => (
    <View style={styles.itemContainer} key={index}>
        <View style={styles.innerContent}>
            <Image
                source={{uri: item.imgUrl}}
                style={styles.image}
            />
            <Text style={styles.header}>{item.author}</Text>
            <Text style={styles.body}>{item.quote}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    itemContainer: {
        paddingBottom: 10,
    },
    innerContent: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: ITEM_WIDTH,
        paddingBottom: 20,
        elevation: 7,
    },
    image: {
        width: ITEM_WIDTH,
        height: 250,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    header: {
        color: AppStyles.color.text,
        fontSize: AppStyles.fontSize.medium,
        fontWeight: 'bold',
        paddingTop: 20,
        textAlign: 'center',
    },
    body: {
        color: AppStyles.color.textMute,
        fontSize: AppStyles.fontSize.normal,
        textAlign: 'center',
    }
})
export default CarouselItem
