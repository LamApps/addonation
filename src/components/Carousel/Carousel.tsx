import React, { useState, useRef } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import CarouselComp, { Pagination } from 'react-native-snap-carousel';
const SLIDER_WIDTH = Dimensions.get('window').width + 80
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
import { AppStyles } from '../../AppStyles';
import { FontAwesome } from '@expo/vector-icons'; 
import moment from 'moment';

const appData = [
    {
        id: "1",
        author: "Alice Walker",
        quote: "2021-11-21T15:21:00Z",
        description: "Lorem ipsum dolor sit amet is the most popular dummy text in the world! You already know that? Yeah, Good! But never confident you can not do all things in the world with it!",
        imgUrl: "https://source.unsplash.com/200x300/?nature"
    },
    {
        id: "2",
        author: "James Coulter",
        quote: "2021-09-21T15:21:00Z",
        description: "Lorem ipsum dolor sit amet is the most popular dummy text in the world! You already know that? Yeah, Good! But never confident you can not do all things in the world with it!",
        imgUrl: "https://source.unsplash.com/200x300/?water"
    },
    {
        id: "3",
        author: "Neymar John",
        quote: "2021-04-21T15:21:00Z",
        description: "Lorem ipsum dolor sit amet is the most popular dummy text in the world! You already know that? Yeah, Good! But never confident you can not do all things in the world with it!",
        imgUrl: "https://source.unsplash.com/200x300/?island"
    }
];

const Carousel = (props) => {
    const isCarousel = useRef(null);
    const [ activeSlide, setActiveSlide ] = useState(0);
    const {navigation} = props
    return(
        <View>
            <CarouselComp
                layout="default"
                layoutCardOffset={9}
                ref={isCarousel}
                data={appData}
                renderItem={({ item, index }:any) => {
                    const date = new Date(item.quote)
                    return (
                    <View style={styles.itemContainer} key={index}>
                        <View style={styles.innerContent}>
                            <TouchableOpacity onPress={()=>{navigation.navigate('News', { screen: 'NewsDetail', params: {item: item}})}}>
                                <Image
                                    source={{uri: item.imgUrl}}
                                    style={styles.image}
                                />
                            </TouchableOpacity>
                            <Text style={styles.header}>{item.author}</Text>
                            <Text style={styles.body}>{moment([date.getFullYear(), date.getMonth(), date.getDate()]).fromNow()}</Text>
                        </View>
                    </View>
                )}}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                containerCustomStyle={{ flexGrow: 0 }}
                loop={true}
                autoplay={true}
                autoplayDelay={3000}
                autoplayInterval={5000}
                onSnapToItem={(index) => setActiveSlide(index) }
            />
            <View style={{paddingHorizontal: 70, paddingVertical: 5, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={()=>{navigation.navigate('News')}} style={{justifyContent:'center'}}>
                    <Text style={{color: AppStyles.color.primary, fontWeight: 'bold'}}>Read More <FontAwesome name="chevron-right" size={12} color={AppStyles.color.primary}></FontAwesome></Text>
                </TouchableOpacity>
            </View>
            <Pagination
                dotsLength={appData.length}
                activeDotIndex={activeSlide}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    )
}
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
        color: AppStyles.color.primary,
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

export default Carousel
