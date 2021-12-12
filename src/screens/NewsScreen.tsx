import React, { useState, useEffect} from 'react';
import { View, FlatList, StyleSheet, Text, Image, Alert } from 'react-native';
import moment from 'moment';
import axios from 'axios';
import Constants from 'expo-constants';

import { AppStyles } from '../AppStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const baseUrl = Constants.manifest.extra.apiBaseUrl

class Item extends React.PureComponent {
    render() {
        const { item, navigation } = this.props;
        const date = new Date(item.created_at)
        const viewContent = item.content.slice(0, 200)
        return <View style={styles.listContainer}>
            <View style={styles.innerContent}>
                <View style={styles.imageWrapper}>
                    <Image
                        source={{uri: baseUrl+'/storage/news/'+item.featured_img}}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.header}>{item.title}</Text>
                <Text style={styles.time}>{moment([date.getFullYear(), date.getMonth(), date.getDate()]).fromNow()}</Text>
                <Text style={styles.body}>{viewContent}</Text>
                <TouchableOpacity style={styles.readMoreButton} onPress={()=>{navigation.navigate('NewsDetail', {item: item})}}><Text style={{color: 'white'}}>Read More</Text></TouchableOpacity>
            </View>
        </View>
    }
}

export default function NewsScreen({navigation}) {
  const renderItem = ({ item }) => <Item item={item} navigation={navigation} />;
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `${baseUrl}/api/get_public_news`,
    }).then((response) => {
      const data = response.data
      setNews(data)
    }).catch(error=>{
        Alert.alert('Error', error.message, [
            { text: 'OK' },
          ]);
    });
  }, [])
  return (
      <View style={styles.container}>
        <FlatList data={news} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
      </View>
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
    imageWrapper: {
        width: '100%',
        height: 250,
    },
    image: {
        width: '100%',
        height: '100%',
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
        alignItems: 'center',
        justifyContent: 'center',  
        marginTop: 5,
        marginRight: 20,
    },
    
});