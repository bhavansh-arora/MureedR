import React,{useState} from 'react'
import {View,StatusBar,SafeAreaView,Text,StyleSheet,Switch} from 'react-native'
import colors from '../assets/colors/colors';
import firebase from 'react-native-firebase';
const adUnitId = 'ca-app-pub-3940256099942544/6300978111';
 const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
function Settings() {
     const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
       <SafeAreaView style={styles.container}>
   <Text style={styles.header}>Notifications</Text>
   <View style={{flex:1}}> 
 <View style={{flexDirection:"row",alignItems:"flex-end",justifyContent:"flex-end"}}>
   <Text style={styles.items}>SPECIAL DAY</Text>
<Switch
        trackColor={{ false: "#767577", true:colors.green }}
        thumbColor={isEnabled ? colors.greenDark2 : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
   </View>
    <View style={{flexDirection:"row",alignItems:"flex-end",justifyContent:"flex-end"}}>
   <Text style={styles.items}>THURSDAY</Text>
<Switch
        trackColor={{ false: "#767577", true:colors.green }}
        thumbColor={isEnabled ? colors.greenDark2 : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
   </View>
   
    <View style={{flexDirection:"row",alignItems:"flex-end",justifyContent:"flex-end"}}>
   <Text style={styles.items}>SUNDAY</Text>
 <Switch
        trackColor={{ false: "#767577", true:colors.green }}
        thumbColor={isEnabled ? colors.greenDark2 : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
   </View>
   </View>
   <Banner
          unitId={adUnitId}
          size={'SMART_BANNER'}
          request={request.build()}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
        />

       </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
                    flex:1,
        backgroundColor:"#fff",
        alignItems:"center",
        },
        header:{
            color:colors.green,
            fontSize:25,
            marginTop:10,
            fontWeight:"bold"
        },
        items:{
            color:colors.green,
            fontSize:25,
            marginTop:10,
        }
})
export default Settings
