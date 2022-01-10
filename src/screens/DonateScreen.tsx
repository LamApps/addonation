import React, { useRef, useState, useEffect} from 'react';
import { StyleSheet, ScrollView, Text, View, Alert, TouchableOpacity } from 'react-native';
import { Video, AVPlaybackStatus, VideoFullscreenUpdateEvent } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import axios from 'axios';
import Firebase from "../config/firebase";
import firebase from 'firebase'
import {useAuth} from '../contexts/Auth';
import Seconds from '../components/Seconds';

import { FontAwesome } from '@expo/vector-icons';

import { AppStyles } from '../AppStyles';

import {baseUrl} from '../config/firebase';

// const VIDEO_WIDTH = Dimensions.get('window').width
export default function DonateScreen({ navigation }:any) {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [mySeconds, setMySeconds] = useState(0);
  const [currentUri, setCurrentUri] = useState('')
  const [videos, setVideos] = useState([]);
  const auth = useAuth();

  //get all videos from api
  useEffect(() => {
    axios({
      method: 'get',
      url: `${baseUrl}/api/get_public_videos`,
    }).then((response) => {
      const data = response.data
      setVideos(data)
      const randomIndex = Math.floor(Math.random() * data.length)
      if(randomIndex>0) setCurrentUri(baseUrl+'/storage/video/'+data[randomIndex].url)
      else setCurrentUri('')
    }).catch(error=>{
      Alert.alert('Error', error.message, [
          { text: 'OK' },
        ]);
    })
  }, [])

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
    setCurrentUri(baseUrl+'/storage/video/'+videos[Math.floor(Math.random() * videos.length)].url)
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
              child.ref.update({value: val.value+duration})
              matchCount++
            }
          })
          if(matchCount == 0) monthSnapshot.ref.push({year: year, month: month, value: duration})
        }else{
          monthSnapshot.ref.push({year: year, month: month, value: duration})
        }
      })
      setMySeconds(mySeconds + duration)
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
        <Seconds totalSeconds={totalSeconds} mySeconds={mySeconds} />
        <View style={styles.textContainer}>
          <Text style={{lineHeight: 25}}>
            With <Text style={{color: AppStyles.color.primary}}>ADDonation.org</Text>, every single second you watch our ad will be counted meaningfully to reduce carbon footprints and preserve natural wildlife. Don't hesitate, just donate your <Text style={{color: AppStyles.color.primary}}>6 seconds</Text> to make a better world.
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
