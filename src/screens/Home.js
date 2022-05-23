import React, {useState, useEffect, useContext} from 'react';
import {View, Button, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Alert} from 'react-native';
import Modal from 'react-native-modal';
import BottomBar from '../components/BottomBar';
import { AuthContext } from '../context/context';
import { connect } from 'react-redux';
import Perfil from './Perfil';
import Mapa from './Mapa';
import { getLocationPermissions, getCurrentLocation } from '../utils/location';
import {delay} from '../utils/funciones';


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

    return(
        <>
            {/* Contenido de la Screen */}
            <View style={styles.body}>
                {showHome?(
                  <Mapa coords={coords}/>            
                ):(
                  <Text style={{alignSelf:'center', position:'absolute', top:'50%'}}>HomeScreen</Text>
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