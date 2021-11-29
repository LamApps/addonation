import React, { useState, useRef } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import CarouselComp, { Pagination } from 'react-native-snap-carousel';
const SLIDER_WIDTH = Dimensions.get('window').width + 80
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
import { AppStyles } from '../../AppStyles';

const appData = [
    {
        author: "Alice Walker",
        quote: "2021/09/21 15:21:00",
        imgUrl: "https://source.unsplash.com/200x300/?nature"
    },
    {
        author: "James Coulter",
        quote: "2021/09/21 15:21:00",
        imgUrl: "https://source.unsplash.com/200x300/?water"
    },
    {
        author: "Neymar John",
        quote: "2021/09/21 15:21:00",
        imgUrl: "https://source.unsplash.com/200x300/?island"
    }
];

const Carousel = () => {
    const isCarousel = useRef(null);
    const [ activeSlide, setActiveSlide ] = useState(0);

    return(
        <View>
            <CarouselComp
                layout="default"
                layoutCardOffset={9}
                ref={isCarousel}
                data={appData}
                renderItem={({ item, index }:any) => (
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
                )}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                containerCustomStyle={{ flexGrow: 0 }}
                loop={true}
                autoplay={true}
                autoplayDelay={3000}
                autoplayInterval={5000}
                onSnapToItem={(index) => setActiveSlide(index) }
            />
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

export default Carousel
