import React, {useState, useEffect, useContext, useRef} from 'react';
import {View, Button, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Alert} from 'react-native';
import BottomBar from '../components/BottomBar';
import { connect } from 'react-redux';
import Perfil from './Perfil';
import Mapa from './Mapa';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Home = ({redux, wipeRedux}) => {
    const [showPerfilModal, setShowPerfilModal] = useState(false);
    const [isFocusedHome, setIsFocusedHome] = useState(true);
    const [showHome, setShowHome]= useState(true);
    const [coords, setCoords]= useState({
      latitude: redux.location[0].latitude,
      longitude: redux.location[0].longitude,
      latitudeDelta: 0.0001,
      longitudeDelta: 0.00421,
    });
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const registerForPushNotificationsAsync = async() => {
      let token;
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    
      return token;
    }
    const fabButtonPressed = () => {
      setShowHome(!showHome);
    };
    
    const imageSource = () => {
      if(showHome){
        return require('../../assets/icons/plus.png');
      } else {
        return require('../../assets/icons/flechaIzquierda.png');
      }
    }

    const sendNotification = (token) => {
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: token,
          title: 'InpromelApp',
          body: 'Task task task task',
          data: { data: 'goes here' },
          _displayInForeground: true,
        }),
      });
    }
    
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

    return(
        <>
            {/* Contenido de la Screen */}
            <View style={styles.body}>
                {showHome?(
                  <Mapa coords={coords}/>            
                ):(
                  <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"80%", width:"90%", marginStart:"auto", marginEnd:"auto"}}>
                    <Text>HomeScreen</Text>
                    <Button title="send notification" onPress={()=> sendNotification(expoPushToken)}/>
                  </View>
                )}
                  <TouchableOpacity style={styles.fabButton} onPress={()=> {fabButtonPressed() }}>
                    <Image source={imageSource()}/>
                  </TouchableOpacity>      
                
            </View>
            {/* BottomBar */}

            <BottomBar showPerfilModal={showPerfilModal} 
                       setShowPerfilModal={setShowPerfilModal} 
                       setShowHome={setShowHome}
                       isFocusedHome={isFocusedHome}
                       setIsFocusedHome={setIsFocusedHome}/>
            {/* Modal PERFIL*/}
            <Perfil showPerfilModal={showPerfilModal} 
                    setShowPerfilModal={setShowPerfilModal}
                    setIsFocusedHome={setIsFocusedHome}/>
        </>
    );
}

const styles = StyleSheet.create({
  body:{
    flexDirection:'column',
    backgroundColor:"#fff",
    minHeight: '92%'
  },
  centeredView: {
    flex: 1,
    marginHorizontal: '10%',
  },
  fabButton:{
    flex:1,
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor:"#4285f4",
    borderRadius:50,
  },
      modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10,
        padding:10,
      },
      
      modalHeader:{
         flexDirection: 'row', 
         justifyContent: 'space-between',
         height:52,
      },  
      cerrarModal:{
        width:24, 
        height:24,
        position:'absolute',
        top:0,
        left:0,
        marginTop:15,
        marginLeft:15,
      },
      imagenHeader:{
        width:150, 
        height: 40,
        marginTop:5
      },
      cerrarSesion:{
        width:24, 
        height:24,
        position:'absolute',
        top:0,
        right:0,
        marginTop:15,
        marginRight:15,
      },
      modalBody:{
        height:'60%',
        marginTop:20,
    }
});

const mapStateToProps = state => {
    return{redux : state};
}

const mapDispatchToProps = dispatch => ({
    wipeRedux: () =>
    dispatch({
      type: Types.WIPE_REDUX,
      payload: {},
    }),
});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Home);