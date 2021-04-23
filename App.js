//SHA256 fa:c6:17:45:dc:09:03:78:6f:b9:ed:e6:2a:96:2b:39:9f:73:48:f0:bb:6f:89:9b:83:32:66:75:91:03:3b:9c
//SHA1 5e:8f:16:06:2e:a3:cd:2c:4a:0d:54:78:76:ba:a6:f3:8c:ab:f6:25

import React,{useEffect,useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Home from './components/Home';
import Timer from './components/Timer';
import Imena from './components/Imena';
import Countaer from './components/Counter';
import colors from './assets/colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Verification from './components/Verification'
import Login from './components/Login'
import Logout from './components/Logout'
import Settings from './components/Settings'
import Calendar from './components/Calendars'
import { NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import firebase from 'react-native-firebase';
import axios from 'axios';

import Silsila from './components/Silsila';
import SilsilaNA from './components/SilsilaNA';
 import { Alert } from "react-native";
 import AsyncStorage from '@react-native-community/async-storage';
 const url = "https://simolmusic.ru/api/usersub?phone="
const fireDate = '22-02-2021 12:15:00';			  // set exact date time | Format: dd-MM-yyyy HH:mm:ss
 let logged="false"
const alarmNotifData = {
    title: "My Notification Title",
    message: "My Notification Message",
    channel: "my_channel_id",
    small_icon: "ic_launcher",
 
    // You can add any additional data that is important for the notification
    // It will be added to the PendingIntent along with the rest of the bundle.
    // e.g.
  	data: { foo: "bar" },
};


Entypo.loadFont();
MaterialIcons.loadFont();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Tabnavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: styles.tabBar,
        activeTintColor: colors.creem,
        inactiveTintColor: colors.greenDark2,
        showLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="home" size={32} color={color} />
          ),
        }}
      />
<Tab.Screen name="Countaer" component={Countaer} 
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="touch-app" size={32} color={color} />
          ),
        }}
      />

      <Tab.Screen name="Timer" component={Timer} 
        options={{
          tabBarIcon: ({color}) => (
            
            <Entypo name="time-slot" size={32} color={color} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};
function Draw() {
async checkPermission =>  {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
}
   const getItems = async()=>{
    logged = await AsyncStorage.getItem("logged");
    console.log(logged)
  }
  getItems()

  return (
      <Drawer.Navigator initialRouteName="Tab">
        <Drawer.Screen name="Homescreen" component={Tabnavigator} />

        <Drawer.Screen name="Calendar" component={Calendar} />
        {
             (logged=="true") ?    <Drawer.Screen name="Logout" component={Logout} />    
             :      <Drawer.Screen name="Login" component={Login} />


        }

      </Drawer.Navigator>
  );
}


function App ()  {
  const[notifi,EnableNotification] = useState(true)
function createNotificationChannel() {
  // Build a android notification channel
  const channel = new firebase.notifications.Android.Channel(
    "reminder", // channelId
    "Reminders Channel", // channel name
    firebase.notifications.Android.Importance.High // channel importance
  ).setDescription("Used for getting reminder notification"); // channel description

  // Create the android notification channel
  firebase.notifications().android.createChannel(channel);
};

function buildNotification ()  {
  const title = Platform.OS === "android" ? "Daily Reminder" : "";
  const notification = new firebase.notifications.Notification()
    .setNotificationId("1") // Any random ID
    .setTitle(title) // Title of the notification
    .setBody("This is a notification") // body of notification
    .android.setPriority(firebase.notifications.Android.Priority.High) // set priority in Android
    .android.setChannelId("reminder") // should be the same when creating channel for Android
    .android.setAutoCancel(true); // To remove notification when tapped on it

  return notification;
};
async function setReminder()  {

  if (notifi) {
    // schedule notification
    firebase.notifications().scheduleNotification(buildNotification(), {
      fireDate: "15:17:00".valueOf,
      repeatInterval: 'day',
      exact: true,
    });
  } else {
    return false;
  }
};
 useEffect(()=> {
   const get_phone = async()=>{
    let phone = await AsyncStorage.getItem("phone");
 
        if(phone!=null){
 let formatted_url=url+phone;
        console.log(formatted_url)
axios.get(formatted_url)
      .then(res => {
        const storage = async()=>{
    let items = await AsyncStorage.getItem("subscription");
    console.log(items)
  }
  storage()
  
         try {
     AsyncStorage.setItem(
      'subscription',
      res.data.subscription
    );
  } catch (error) {
    console.log(error)
  }
      })
      .catch(err => {
        console.log(err.message)
      })
      
        }
       
      
  }
  get_phone()
},[])
useEffect(() => {
    createNotificationChannel()
     const enabled =  firebase.messaging().hasPermission();
  if (!enabled) {
 try {
      firebase.messaging().requestPermission();
    } catch (error) {
      Alert.alert(
        "Unable to access the Notification permission. Please enable the Notification Permission from the settings"
      );
    }
  } 
  else{
    notificationListener = firebase
      .notifications()
      .onNotification(async notification => {
        // Display your notification
        await firebase.notifications().displayNotification(notification);
  });
}
    //setReminder()

    // Ask notification permission and add notification listener
  })
 

async getToken => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }
  async requestPermission => {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Draw" component={Draw} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} /> 
        <Stack.Screen name="Imena" component={Imena} options={{headerShown: false}} />
        <Stack.Screen name="Silsila" component={Silsila} />
        <Stack.Screen name="SilsilaNA" component={SilsilaNA} />
        <Stack.Screen name="Verification" component={Verification} options={{headerShown: false}}/>
     

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.blue,
  },
});

export default App;
