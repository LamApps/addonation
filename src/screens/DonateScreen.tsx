import React, { useRef, useState, useEffect} from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Video, AVPlaybackStatus, VideoFullscreenUpdateEvent } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Firebase from "../config/firebase";
import firebase from 'firebase'
import {useAuth} from '../contexts/Auth';
import Seconds from '../components/Seconds';

import { FontAwesome } from '@expo/vector-icons'; 

import { AppStyles } from '../AppStyles';

const dummy_videos = [
  'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  'http://res.cloudinary.com/dxkxvfo2o/video/upload/v1608169738/video1_cvrjfm.mp4',
]
// const VIDEO_WIDTH = Dimensions.get('window').width
export default function DonateScreen({ navigation }:any) {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [mySeconds, setMySeconds] = useState(0);
  const [currentUri, setCurrentUri] = useState(dummy_videos[Math.floor(Math.random() * 2)])
  const auth = useAuth();
  useEffect(() => {
    var uid = auth.authData.token;
    const mySecRef = Firebase.database().ref('seconds/'+uid);
    mySecRef.once('value', (snapshot: { val: () => any; }) => {
      const data = snapshot.val();
      setMySeconds(data.total || 0);
    })
  }, [])

  useEffect(() => {
    const ref = Firebase.database().ref('totalSeconds');
    ref.once('value', (snapshot: { val: () => any; }) => {
      const data = snapshot.val();
      setTotalSeconds(data || 0);
    })
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

  const playVideo = () => {
    if(status.isPlaying){
      video.current.pauseAsync()
    }else{
      video.current.presentFullscreenPlayer()
      if(status.durationMillis == status.positionMillis) video.current.playFromPositionAsync(0)
      else video.current.playAsync()
    }
  }
  const shuffleVideo = () => {
    setCurrentUri(dummy_videos[Math.floor(Math.random() * 2)])
    video.current.presentFullscreenPlayer()
    video.current.playFromPositionAsync(0)
  }
  const _onPlaybackStatusUpdate = playbackStatus => {
    setStatus(()=>playbackStatus)
    if (playbackStatus.didJustFinish){
      video.current.dismissFullscreenPlayer()
      const totalRef = Firebase.database().ref('totalSeconds')
      const duration =  Math.floor(playbackStatus.durationMillis / 1000)
      totalRef.transaction((totalSec) => {
        totalSec += duration
        setTotalSeconds(totalSec)
        return totalSec;
      });
      var uid = auth.authData.token;
      const mySecRef = Firebase.database().ref('seconds/'+uid);
      mySecRef.update({total: mySeconds + duration})
      mySecRef.child('logs').push({timestamp: firebase.database.ServerValue.TIMESTAMP, duration: duration, videoURL: currentUri})
      .then(async res => {
        const snapshot = await res.once('value')
        const timestamp = snapshot.val().timestamp
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const monthSnapshot = await mySecRef.child('monthly').once('value')
        if(monthSnapshot.numChildren()>0){
          let matchCount = 0;
          monthSnapshot.forEach(child => {
            const val = child.val()
            if(val.year === year && val.month === month) {
              child.ref.update({duration: val.duration+duration})
              matchCount++
            }
          })
          if(matchCount == 0) monthSnapshot.ref.push({year: year, month: month, duration: duration})
        }else{
          monthSnapshot.ref.push({year: year, month: month, duration: duration})
        }
      })
      setMySeconds(mySeconds + duration)
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
            source={{
              uri: currentUri,
            }}
            useNativeControls
            resizeMode="contain"
            onPlaybackStatusUpdate={status => _onPlaybackStatusUpdate(status)}
            onFullscreenUpdate={onFullscreenUpdate}
          />
          <View style={styles.playBtnContainer}>
            <TouchableOpacity style={styles.playButton} onPress={() => { playVideo() } }>
              {status.isPlaying ? <FontAwesome name="pause" size={20} color='white' /> : <FontAwesome name="play" size={20} color='white' /> }
            </TouchableOpacity>

            <TouchableOpacity style={styles.playButton} onPress={() => { shuffleVideo() } }>
              <FontAwesome name="random" size={20} color='white' />
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
    justifyContent: 'space-around',
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
