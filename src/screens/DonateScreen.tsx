import React, { useRef, useState, useEffect} from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Video, AVPlaybackStatus, VideoFullscreenUpdateEvent } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Firebase from "../config/firebase";
import {useAuth} from '../contexts/Auth';

import Seconds from '../components/Seconds';

import { FontAwesome } from '@expo/vector-icons'; 

import { AppStyles } from '../AppStyles';

const VIDEO_WIDTH = Dimensions.get('window').width
export default function DonateScreen({ navigation }:any) {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [mySeconds, setMySeconds] = useState(0);

  const auth = useAuth();
  useEffect(() => {
    var uid = auth.authData.token;
    const mySecRef = Firebase.database().ref('seconds/'+uid);
    mySecRef.on('value', (snapshot: { val: () => any; }) => {
      const data = snapshot.val();
      setMySeconds(data || 0);
    })
    return function cleanup() {
      mySecRef.off();
    };
  }, [])

  useEffect(() => {
    const ref = Firebase.database().ref('totalSeconds');
    ref.on('value', (snapshot: { val: () => any; }) => {
      const data = snapshot.val();
      setTotalSeconds(data || 0);
    })
    return function cleanup() {
      ref.off();
    };
  }, [])

  const video = useRef(null);
  const [status, setStatus] = useState({});
  
  const onFullscreenUpdate = async ({fullscreenUpdate}: VideoFullscreenUpdateEvent) => {
    switch (fullscreenUpdate) {
        case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
            await ScreenOrientation.unlockAsync() // only on Android required
            break;
        case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT) // only on Android required
            break;
    }
  }
  const _onPlaybackStatusUpdate = playbackStatus => {
    setStatus(()=>playbackStatus)
    if (playbackStatus.didJustFinish){
      const totalRef = Firebase.database().ref('totalSeconds')
      const duration =  Math.floor(playbackStatus.durationMillis / 1000)
      totalRef.transaction((totalSec) => {
        totalSec += duration
        return totalSec;
      });
      var uid = auth.authData.token;
      const mySecRef = Firebase.database().ref('seconds/'+uid);
      mySecRef.set(mySeconds + duration)

    }
  };
  return (
    <ScrollView style={styles.scrollView}>
        <Seconds totalSeconds={totalSeconds} mySeconds={mySeconds} />
        <View style={styles.textContainer}>
          <Text style={{textAlign: 'center'}}>
            <Text style={{color: AppStyles.color.primary}}>ADDonation.org</Text> is a not for profit organization supporting environmental nonprofit organizations around the world. We raise funds by <Text style={{color: AppStyles.color.primary}}>6 second</Text> donations from our viewers. Just watching 6 seconds commercial adverts will help out reducing commercial wastes around the world. We strongly believe in our goodwill and <Text style={{color: AppStyles.color.primary}}>100%</Text> of all our profit will be donated to create a virtuous circle to fix the world!!!
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Video
            ref={video}
            style={styles.video}
            useNativeControls
            source={{
              uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            }}
            resizeMode="contain"
            onPlaybackStatusUpdate={status => _onPlaybackStatusUpdate(status)}
            onFullscreenUpdate={onFullscreenUpdate}
          />
          <View style={styles.playBtnContainer}>
            <TouchableOpacity style={styles.playButton} onPress={() =>
                status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
              }>
              {status.isPlaying ? <FontAwesome name="pause" size={20} color='white' /> : <FontAwesome name="play" size={20} color='white' /> }
            </TouchableOpacity>
          </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff'
  },
  textContainer: {
    padding: 15,
  },
  video: {
    alignSelf: 'center',
    width: '90%',
    aspectRatio: 16 / 9,
    backgroundColor: 'black',
  },
  playBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    marginVertical: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.color.primary,
  }
});
