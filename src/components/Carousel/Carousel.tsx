import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CarouselComp, { Pagination } from 'react-native-snap-carousel';
const SLIDER_WIDTH = Dimensions.get('window').width + 80
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
import { AppStyles } from '../../AppStyles';
import { FontAwesome } from '@expo/vector-icons'; 
import moment from 'moment';
import axios from 'axios';

import Constants from 'expo-constants';

const baseUrl = Constants.manifest.extra.apiBaseUrl

const Carousel = (props) => {
    const isCarousel = useRef(null);
    const [ activeSlide, setActiveSlide ] = useState(0);
    const {navigation} = props
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios({
          method: 'get',
          url: `${baseUrl}/api/get_public_news`,
        }).then((response) => {
          const data = response.data
          const show_data = data.slice(0,3)
          setNews(show_data)
        }).catch(error=>{
          Alert.alert('Error', error.message, [
              { text: 'OK' },
            ]);
        })
      }, [])
    const renderItem =  useCallback(({ item }:any) => {
        const date = new Date(item.created_at)
            return (
            <View style={styles.itemContainer} key={item.id.toString()}>
                <View style={styles.innerContent}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('News', { screen: 'NewsDetail', params: {item: item}})}}>
                        <Image
                            source={{uri: baseUrl+'/storage/news/'+item.featured_img}}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                    <Text style={styles.header}>{item.title}</Text>
                    <Text style={styles.body}>{moment([date.getFullYear(), date.getMonth(), date.getDate()]).fromNow()}</Text>
                </View>
            </View>
        )}, [news]
    )
    return(
        <View>
            <CarouselComp
                layout="default"
                layoutCardOffset={9}
                ref={isCarousel}
                data={news}
                renderItem={renderItem}
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
                dotsLength={news.length}
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
