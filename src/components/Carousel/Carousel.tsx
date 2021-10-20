import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import CarouselComp, { Pagination } from 'react-native-snap-carousel';
import CarouselItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselItem';

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
                renderItem={CarouselItem}
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

export default Carousel
