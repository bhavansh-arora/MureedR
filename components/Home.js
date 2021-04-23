import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Button,
  StatusBar
} from 'react-native';
import colors from '../assets/colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import discoverData from '../assets/data/discoverData';
import Fon2 from '../assets/images/Fon2.png';
import TopArabic from '../assets/images/TopArabic.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'react-native-firebase';
const adUnitId = 'ca-app-pub-3940256099942544/6300978111';
 const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    import AsyncStorage from '@react-native-community/async-storage';

//import Exo2 from '../assets/fonts/Exo2';

MaterialCommunityIcons.loadFont();
Entypo.loadFont();
//Exo2.loadFont(),

Home = ({navigation}) => {
   const ad =   <Banner
          unitId={adUnitId}
          size={'SMART_BANNER'}
          request={request.build()}
          onAdLoaded={() => {
          }}
        />
  const [subscription,setSubscription] = useState()
  useEffect(()=>{
     const storage = async()=>{
        let subs = await AsyncStorage.getItem("subscription");

    setSubscription(subs)

  }
  storage()
  },[])
  const renderDiscoverItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(item.screen)}>
        <ImageBackground
          source={item.image}
          style={styles.discoverItem}
          imageStyle={styles.discoverItemImage}>
          <Text style={styles.discoverItemTitle}>{item.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.containerFon} backgroundColor={colors.blue}>
   
      <ImageBackground source={Fon2} style={styles.ImBackground}>
        <View style={styles.menuWrapper}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Entypo
            name="menu"
            size={32}
            color={colors.creem}
            style={styles.menuIcon}
          />
          </TouchableOpacity>
          <Image source={TopArabic} style={styles.TopArabic} />
          <Entypo
            name="bell"
            size={32}
            color={colors.creem}
            style={styles.menuIcon}
          />
        </View>

        <View style={styles.menuWrapper}>
          <Text style={styles.textDate}>25 Мухаррам</Text>
          <Text style={styles.textGradus}>+7</Text>
          <Entypo
            name="cloud"
            size={32}
            color={colors.creem}
            style={styles.menuIcon}
          />
        </View>

        <View style={styles.menuWrapper}>
          <Text style={styles.textDateGrig}>7 январь</Text>
          <Text style={styles.textGorod}>Махачкала</Text>
          
        </View>

        <View style={styles.menuNeblago}>
          <MaterialCommunityIcons
            name="alert-box"
            size={25}
            color={colors.black}
            style={styles.menuIconNeblago}
          />
          
          <MaterialCommunityIcons
            name="alert-circle"
            size={25}
            color={colors.black}
            style={styles.menuIconNeblago}
          />
          <Text style={styles.textNeblago}>Неблагоприятный день</Text>
        </View>
      </ImageBackground>

      <View style={styles.container}>
        <View style={styles.discoverWrapper}>
          <FlatList
            data={discoverData}
            renderItem={renderDiscoverItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}></FlatList>
        </View>
      </View>
       {!(subscription=="valid")?
         ad:null
       }
    </View>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.gold,
  },

  menuWrapper: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  discoverItem: {
    width: 170,
    height: 170,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 15,
    shadowColor: "#000",
     shadowOffset: {
         width: 0,
         height: 2,
     },
     shadowOpacity: 0.23,
     shadowRadius: 2.62,
     
     elevation: 4,
  },

  discoverItemImage: {
    marginTop: 10,
    borderRadius: 20,
  },
  discoverItemTitle: {
    fontSize: 27,
    color: colors.creem,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    paddingVertical: 15,
    fontFamily: 'Exo2-Regular',
  },

  discoverWrapper: {
    alignItems: 'center',
    backgroundColor: colors.creem,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  ImBackground: {
    marginTop: 5,
    flex: 0.5,
    resizeMode: 'cover',
    justifyContent: 'center',
    
  },

  TopArabic: {
    width: 200,
    height: 80,
  },

  textFon: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },

  containerFon: {
    flex: 1,
  },

  textDate: {
    fontSize: 35,
    color: colors.green,
    justifyContent: 'flex-start',
    fontFamily: 'Exo2-Medium',
  },

  textDateGrig: {
    fontSize: 25,
    color: colors.white,
    justifyContent: 'flex-start',
    fontFamily: 'Exo2-Regular',
  },

  textGorod: {
    fontSize: 25,
    color: colors.white,
    justifyContent: 'flex-end',
    fontFamily: 'Exo2-Regular',
  },

  textGradus: {
    fontSize: 27,
    color: colors.white,
    paddingRight: 15,
    fontFamily: 'Exo2-Regular',
  },

  menuNeblago: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: colors.creem,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    height: 30,
  },

  textNeblago: {
    marginHorizontal: 20,
    fontSize: 20,
    fontFamily: 'Exo2-Medium',
    color: colors.black,
    justifyContent: 'flex-start',
    fontFamily: 'Exo2-Regular',
  },

  menuIconNeblago: {
    marginHorizontal: 10,
  },
});

export default Home;
