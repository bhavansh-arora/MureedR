import React,{ useEffect,useState } from 'react'
import {View,StatusBar,SafeAreaView,StyleSheet,Text,TouchableOpacity} from 'react-native'
import colors from '../assets/colors/colors';
import ProgressDialog from 'react-native-progress-dialog';
import LinearGradient from 'react-native-linear-gradient';
import OTPTextInput from 'react-native-otp-textinput'
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
const adUnitId = 'ca-app-pub-3940256099942544/6300978111';
 const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
function Verification({route,navigation}) {
        const[otpInput,setOtpInput] = useState(null)
          const [visibility, setVisibility] = useState(false);

          const { result} = route.params;
          const {phone} = route.params;

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

function verifyCode(){
      setVisibility(true)

result
        .confirm(otpInput)
        .then(user => {
          firebase.
firestore()
  .collection('Users')
  .doc(phone)
  .set({
    expiry: new Date(),
    
  })
  .then(() => {
    setVisibility(false)
       try {
        AsyncStorage.setItem('logged',"true" )
        AsyncStorage.setItem('phone',phone )
        navigation.navigate("Homescreen")
  } catch (error) {
    console.log(error)
  }
        
        

  })
  .catch(error => {
        setVisibility(false)

    alert(error.message)
          console.log(error)
  })
        })
        .catch(error => {
          alert(error.message)
          console.log(error)
        })
}
    return (
     <SafeAreaView style={{flex:1,backgroundColor:colors.green}}>
         <ProgressDialog visible={visibility}/>

     <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.green}
        translucent={false}
      />
     <View style={{backgroundColor:colors.green,flex:3,alignItems:"center",justifyContent:"center"}}>
     <View style={{alignItems:"center"}}>
     <Text style={{fontSize:20,color:"#fff",fontWeight:"bold"}}>Verification Code</Text>
<Text style={{textAlign:"center",marginTop:30,color:"#fff",fontSize:20,marginHorizontal:20,fontStyle:"italic"}}>We have sent a verification code on your mobile number to verify that its you.</Text>
     </View>
     </View>
     <View style={{backgroundColor:"#fff",height:"70%",borderTopRightRadius:50,alignItems:"center"}}>

          <Text style={{marginTop:10,fontSize:17,marginTop:20,fontWeight:"700",width:"90%",fontStyle:"italic"}}>Please enter Verification code sent to your mobile</Text>


<View style={{marginHorizontal:20}}>
            <OTPTextInput handleTextChange={(val) => {setOtpInput(val)}} tintColor="#00b675"   containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput} inputCount={6}  />

</View>


     <TouchableOpacity style={{width:"90%"}} onPress={() => {verifyCode()}}>
     <LinearGradient colors={[colors.green,'#fff']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.linearGradient}>
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
  textInputContainer: {
    marginTop: 50,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
});
export default Verification
