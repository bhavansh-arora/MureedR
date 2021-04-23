import React,{useState,useRef,useEffect} from 'react'
import {View,Text,StatusBar,StyleSheet,TouchableOpacity,ScrollView,SafeAreaView} from 'react-native'
import colors from '../assets/colors/colors';
import LinearGradient from 'react-native-linear-gradient';
import PhoneInput from "react-native-phone-number-input";
import ProgressDialog from 'react-native-progress-dialog';
 import AsyncStorage from '@react-native-community/async-storage';

import firebase from 'react-native-firebase'
const adUnitId = 'ca-app-pub-3940256099942544/6300978111';
 const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();

function Login({navigation}) {
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
 const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [visible, setVisible] = useState(false);
  const phoneInput = useRef(null);
useEffect(()=>{
  
})
    








function sendCode() {
   const checkValid = phoneInput.current?.isValidNumber(value);
              if(checkValid){
                setVisible(true)
console.log(formattedValue)
              
 // alert("hey")
 firebase.auth()
 .signInWithPhoneNumber(formattedValue)
      .then(confirmResult => {
        setVisible(false)
         navigation.navigate("Verification",{result:confirmResult,
        phone:formattedValue})
         console.log(confirmResult)
              })
      .catch(error => {
        alert(error.message)
setVisible(false)
        console.log(error)
      })
    }
    else{
      alert("Invalid Phone Number")
    }
  } 





    return (
     <SafeAreaView style={{flex:1,backgroundColor:colors.green}}>
    <ProgressDialog visible={visible}/>
     <View style={{backgroundColor:colors.green,flex:1}}>
     </View>
     <View style={{backgroundColor:"#fff",height:"80%",borderTopLeftRadius:50,alignItems:"center"}}>

     <Text style={{fontSize:27,marginTop:20,fontWeight:"600"}}>Login</Text>
          <Text style={{fontSize:15,marginTop:20,fontWeight:"100",width:"90%",textAlign:"center",fontStyle:"italic"}}>Please enter your Mobile Number so that we can verify that its you.</Text>

     <View style={{ 
       backgroundColor:"#fff",
   
    alignSelf:"center",
  marginTop:30,
    shadowColor: "#eee",
shadowOffset: {
	width: 0,
	height: 0,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 5,
}}>
     
      <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="DM"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            
            autoFocus
          />
     

     </View>
     <TouchableOpacity style={{width:"90%"}} onPress={()=>{
    
      

  sendCode()
          }}>
     <LinearGradient  colors={[colors.green,'#fff']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.linearGradient}>
  <Text style={styles.buttonText}>
    Next
  </Text>
</LinearGradient>
</TouchableOpacity>


     </View>
   {!(subscription=="valid")?
         ad:null
       }
     </SafeAreaView>

    )
}

var styles = StyleSheet.create({
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    marginTop:50,
    width:"100%"
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontWeight:"bold"
  },
});

export default Login
