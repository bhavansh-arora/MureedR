import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../assets/colors/colors';
import firebase from 'react-native-firebase'
 import AsyncStorage from '@react-native-community/async-storage';

const adUnitId = 'ca-app-pub-3940256099942544/6300978111';
 const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
let subscription;
const ad= <Banner
          unitId={adUnitId}
          size={'SMART_BANNER'}
          request={request.build()}
          onAdLoaded={() => {
          }}
        />;
class Counter extends React.Component {
  
  state = { count: 0 };

  setCount = () => this.setState(
    prevState => ({ ...prevState, count: this.state.count + 1 })
  )

  setNull = () => this.setState(
    prevState => ({ ...prevState, count: this.state.count = 0 })
  )
   
componentWillMount() {
       const storage = async()=>{
       subscription = await AsyncStorage.getItem("subscription");


  }
  storage()
  }



  render() {
    const { count } = this.state;
    
    return (
      <View style={[styles.bg]}>

        <View style={styles.view2}>

          <View style={styles.count}> 
          <Text style={styles.less}>{count} </Text>
          </View>

         <View style={styles.sbros}> 
          <TouchableOpacity style={styles.buttonReset} onPress={this.setNull}>
            <Text style={styles.buttonTextReset}>СБРОС</Text>
          </TouchableOpacity>
          </View>
        </View>

        <View style={styles.view3}>
          <TouchableOpacity style={styles.button} onPress={this.setCount}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
        </View>
            {!(subscription=="valid")?
         ad:null
       }
      </View>
    );
  }
}


const counter = () => (
  <Counter />
);


const styles = StyleSheet.create({
  


  bg: { 
    paddingTop: 50, 
    flex: 1,
    backgroundColor: colors.creem },

    view2:{   
      flex: 3,
      backgroundColor: colors.blue,
      justifyContent: 'center',
      alignItems: 'center',
    },

    view3:{
      flex: 5,
      
    },

  less: { 
    fontSize: 70, 
    color: colors.creem, 
    fontWeight: 'bold' },

  greater: { 
    fontSize: 50, 
    color: colors.creem, 
    fontWeight: 'bold' },

  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',   
    borderRadius: 25,
    backgroundColor: colors.greenDark2,
    margin: 35,
  },

  buttonText: {
    fontSize: 25,
    color: '#fff',
  },

  buttonReset: {
    backgroundColor: colors.greenDark2,
    justifyContent: 'center',
    alignItems: 'center',   
    height: 30,
    width: 80,
    borderRadius: 5,

  },

  buttonTextReset:{
      fontSize: 16,
      color: colors.gold,
  },



  sbros:{
    alignItems: 'flex-start',
    margin: 25,
  },

  count:{
    flex:3,
    justifyContent: 'center',
    marginTop: 25,
   
  },


});


export default counter;