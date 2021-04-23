import React, {Component,useState,useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, TouchableOpacity, Text, } from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';
import colors from '../assets/colors/colors';
import Icon from 'react-native-vector-icons/Feather';
import silsilaData from '../assets/data/silsilaData';
import ProgressSlider from '../assets/player/ProgressSlider';
 import AsyncStorage from '@react-native-community/async-storage';
import TrackPlayer, {
  State as TrackPlayerState,
  STATE_PAUSED,
  STATE_PLAYING,
  STATE_STOPPED,
  Track,
} from 'react-native-track-player';

import {Box} from 'react-native-design-utility';
import firebase from 'react-native-firebase';
const adUnitId = 'ca-app-pub-3940256099942544/6300978111';
 const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();

var isPaused;
isPaused === STATE_PAUSED;

var isPlaying;
isPlaying === STATE_PLAYING;



const SilsilaNA = ({route, navigation}) => {
  //export class SilsilaNA extends Component {
      const ad =   <Banner
          unitId={adUnitId}
          size={'SMART_BANNER'}
          request={request.build()}
          onAdLoaded={() => {
          }}
        />;
  const [subscription,setSubscription] = useState()
  useEffect(()=>{
     const storage = async()=>{
        let subs = await AsyncStorage.getItem("subscription");

    setSubscription(subs)

  }
  storage()
  },[])
React.useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer().then(() => {
        console.log('Player is setup');
      });
      TrackPlayer.registerPlaybackService(() =>
        require('../services/trackPlayerServices'),
      );
      await TrackPlayer.add(track);
    })();    
  }, []);


//const {id, titleTop } = route.params;

   

  const {
        id, titleTop, titleTopArab, textSilsila, textSilsilaArab, titleBottom, titleBottomArab, track
    } = route.params
return(
 
    <View style ={styles.container} >
    <View style={styles.player}>
          <TouchableOpacity onPress={() => TrackPlayer.play()}>
            <Icon name="play-circle" size={40} color='#19534d'/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => TrackPlayer.pause()}>
            <Icon name="pause-circle" size={40} color='#19534d'/>
          </TouchableOpacity>

          <View style={styles.slider}>
            <ProgressSlider />
          </View>

          <TouchableOpacity onPress={() => TrackPlayer.stop()}>
            <Icon name="stop-circle" size={40} color='#19534d'/>
          </TouchableOpacity>


        </View>

        <ScrollView>
        <Text style = {styles.title}>{titleTop}</Text>
        <Text style = {styles.titleArab}>{titleTopArab} </Text>
        <Text style={styles.text} >{textSilsila}</Text>
        <Text style={styles.textArab} >{textSilsilaArab}</Text>
        <Text style = {styles.titleBottom}>{titleBottom}</Text>
        <Text style = {styles.titleBottomArab} >{titleBottomArab}</Text>
        </ScrollView>  
   {!(subscription=="valid")?
         ad:null
       }
    </View>
);
};

 



const styles = StyleSheet.create({
    container: {
        flex: 1,
      backgroundColor: colors.creem,
      
    },

    title: {
        fontSize: 25,
        fontFamily: 'Exo2-Medium',
        textAlign: 'center',
        marginTop: 10,
        color: colors.green,

    },

       titleArab: {
        fontSize: 35,
        fontFamily: 'AdobeArabic-Bold',
        textAlign: 'center',
       
        color: colors.green,

    },

    text: {
        fontSize: 22,
        fontFamily: 'Exo2-Medium',
        textAlign: 'center',
        color: colors.blue,
        margin: 15,
        lineHeight: 15 * 2.2,
    },

        textArab: {
        fontSize: 35,
        fontFamily: 'AdobeArabic-Regular',
        textAlign: 'center',
        color: colors.blue,
        margin: 15,
        lineHeight: 15 * 3.0,
    },

    titleBottom: {
        fontSize: 25,
        fontFamily: 'Exo2-Medium',
        textAlign: 'center',
        marginTop: 10,
       
        color: colors.gold,        
    },

     titleBottomArab: {
        fontSize: 35,
        fontFamily: 'AdobeArabic-Bold',
        textAlign: 'center',
        marginBottom: 35,
        color: colors.gold,        
    },

    player: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  slider: {
    flex: 2,
  },
  
  });



export default SilsilaNA;