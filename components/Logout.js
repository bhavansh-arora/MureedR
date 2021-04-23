import React,{useState,useRef,useEffect} from 'react'
import {View,Text,StatusBar,StyleSheet,TouchableOpacity,ScrollView,SafeAreaView,Linking} from 'react-native'
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

function Logout({navigation}) {
   const ad =   <Banner
          unitId={adUnitId}
          size={'SMART_BANNER'}
          request={request.build()}
          onAdLoaded={() => {
          }}
        />;
  const [visible, setVisible] = useState(false);
  const [phone,setPhone] = useState()
  const [subscription,setSubscription] = useState()
useEffect(()=>{
      const storage = async()=>{
    let item = await AsyncStorage.getItem("phone");
        let subs = await AsyncStorage.getItem("subscription");

    setPhone(item)
    setSubscription(subs)

  }
  storage()
})
    








function sendCode() {
    try {
        AsyncStorage.setItem('logged',"false" )
        AsyncStorage.setItem('phone',"" )
        navigation.navigate("Homescreen")
  } catch (error) {
    console.log(error)
  }  } 





    return (
     <SafeAreaView style={{flex:1,backgroundColor:colors.green}}>
    <ProgressDialog visible={visible}/>
     <View style={{backgroundColor:colors.green,flex:1}}>
     </View>
     <View style={{backgroundColor:"#fff",height:"80%",borderTopLeftRadius:50,alignItems:"center"}}>

     <Text style={{fontSize:27,marginTop:20,fontWeight:"600"}}>Logout</Text>
          <Text style={{fontSize:15,marginTop:20,fontWeight:"100",width:"90%",textAlign:"center",fontStyle:"italic"}}>You are already logged in with the Mobile Number:</Text>
<Text style={{fontSize:15,marginTop:5,fontWeight:"100",width:"90%",textAlign:"center",fontStyle:"italic"}}>{phone}</Text>
               <Text style={{fontSize:15,marginTop:5,fontWeight:"100",width:"90%",textAlign:"center",fontStyle:"italic"}}>And your subscription is </Text>
               <Text style={{fontSize:15,marginTop:5,fontWeight:"100",width:"90%",textAlign:"center",fontStyle:"italic"}}>{subscription}</Text>
{
    (subscription=="not valid")?
                   <><Text style={{fontSize:15,marginTop:20,fontWeight:"100",width:"90%",textAlign:"center",fontStyle:"italic"}}>You can buy the subscription by visiting </Text>
                                      <Text style={{fontSize:15,marginTop:0,fontWeight:"100",width:"90%",textAlign:"center",fontStyle:"italic",color:"#00f"}} onPress={ ()=> Linking.openURL('https://simolmusic.ru/') }>https://simolmusic.ru/ </Text></>

:null
}
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
     
   
     

     </View>
     <TouchableOpacity style={{width:"90%"}} onPress={()=>{
    
      

  sendCode()
          }}>
     <LinearGradient  colors={[colors.green,'#fff']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.linearGradient}>
  <Text style={styles.buttonText}>
    Logout
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

export default Logout
