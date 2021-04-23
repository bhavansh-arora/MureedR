import React,{useState,useEffect} from 'react'
import {StyleSheet,SafeAreaView,View,Text} from 'react-native'
import {Agenda} from 'react-native-calendars';
import firebase from 'react-native-firebase'
 import AsyncStorage from '@react-native-community/async-storage';

const adUnitId = 'ca-app-pub-3940256099942544/6300978111';
 const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    
    const request = new AdRequest();
type Item = {
  month: string;
  special_day:array;
  day:int;
};

function Calendars() {
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
    const [items, setItems] = useState({})
      useEffect(() => {
         
       fetch('https://80.78.246.198:3001/users/')
             .then((response) => response.json())
            .then((responseJson) => {
               console.log(responseJson.data)
                  const reduced = responseJson.data.reduce(
        (acc: {[key: string]: Post[]}, currentItem) => {
          const {date, ...coolItem} = currentItem;

          acc[date] = [coolItem];

          return acc;
        },
        {},
      );
     // console.log(reduced)
      setItems(reduced)
            })
          

            .catch((error) => {
                console.log(error);

            });
      },[])
  const renderItem = (item: Item) => {
    return (
      <View style={styles.itemContainer}>
      <Text>{item.day}</Text>
        <Text>{item.month}</Text>
        <Text style={{textAlign:"center",marginTop:5}}>{item.special_day}</Text>
      </View>
    );
  };
    return (
      <SafeAreaView style={styles.safe}>
      <Agenda items={items} renderItem={renderItem} />
         {!(subscription=="valid")?
         ad:null
       }
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Calendars
