import React, {useState,useEffect} from 'react';
import colors from '../assets/colors/colors';


// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
} from 'react-native';

// importing library to use Stopwatch and Timer
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import firebase from 'react-native-firebase';
 import AsyncStorage from '@react-native-community/async-storage';
const adUnitId = 'ca-app-pub-3940256099942544/6300978111';
 const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();

let per = 300000;
let secondMili5 = 300000;
let secondMili10 = 600000;
let secondMili15 = 900000;

const timer = () => {
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(per);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>


        <Text style={styles.textRabita}>Таймер для рабита</Text>

        <View style={styles.sectionStyle}>
          <Timer
            totalDuration={timerDuration}
            //  msecs
            // Time Duration
            start={isTimerStart}
            // To start
            reset={resetTimer}
            // To reset
            options={options}
            // Options for the styling
            handleFinish={() => {
              alert('Custom Completion Function');
            }}
            // Can call a function On finish of the time
            getTime={(time) => {
              console.log(time);
            }}
          />

          <View style={styles.conainerButton}>
            <TouchableHighlight
              style={styles.startReset}
              onPress={() => {
                setIsTimerStart(!isTimerStart);
                setResetTimer(false);
              }}>
              <Text style={styles.buttonTextReset}>
                {!isTimerStart ? 'СТАРТ' : 'СТОП'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.startReset}
              onPress={() => {
                setIsTimerStart(false);
                setResetTimer(true);
              }}>
              <Text style={styles.buttonTextReset}>СБРОС</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.conainerButton}>
            <TouchableHighlight
              style={styles.minuta}
              onPress={() => {
                setIsTimerStart(false);
                setResetTimer(true);
                setTimerDuration(secondMili5);
              }}>
              <Text style={styles.buttonText}>5 мин</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.minuta}
              onPress={() => {
                setIsTimerStart(false);
                setResetTimer(true);
                setTimerDuration(secondMili10);
              }}>
              <Text style={styles.buttonText}>10 мин</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.minuta}
              onPress={() => {
                setIsTimerStart(false);
                setResetTimer(true);
                setTimerDuration(secondMili15);
              }}>
              <Text style={styles.buttonText}>15 мин</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
       {!(subscription=="valid")?
         ad:null
       }
    </SafeAreaView>
  );
};

export default timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.creem,
  },

  textRabita:{
    fontSize: 25,
    color: colors.blue,
    fontFamily: 'Exo2-Medium',
  },

  conainerButton: {
    flexDirection: 'row',
    margin: 10,
  },

  startReset: {
    width: 105,
    height: 50,
    backgroundColor: colors.greenDark2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 20,
  },

  minuta: {
    width: 80,
    height: 80,
    backgroundColor: colors.greenDark,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
    margin: 20,
  },

  title: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Exo2-Medium',
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    flex: 1,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Exo2-Medium',
    marginTop: 10,
    color: colors.creem,
    marginBottom: 10,
  },

  buttonTextReset: {
    fontSize: 20,
    fontFamily: 'Exo2-Medium',
    marginTop: 10,
    color: colors.creem,
  },



});

const options = {
  container: {
    //backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 15,
    borderColor: colors.greenDark2,
    borderWidth: 3,
    width: 250,
    alignItems: 'center',
    
  },
  text: {
    fontSize: 50,
    color: colors.greenDark2 ,
    marginLeft: 7,
    fontFamily: 'Exo2-Medium',
  },
};
