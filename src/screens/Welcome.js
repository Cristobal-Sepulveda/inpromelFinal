import React, {useEffect, useState} from 'react';
import {View, Image, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import { getLocationPermissions, getCurrentLocation } from '../utils/location';
import { delay } from '../utils/funciones';
import * as Types from '../store/actions/types';

const Welcome = ({navigation, props, insertLocation}) => {
    const [coords, setCoords] = useState([]);

    const navegandoAHome = async () => {
        if (coords.latitude != null) {
            await insertLocation({
              latitude: coords.latitude,
              longitude: coords.longitude,
            });
            navigation.replace("Home");
        } else {
            await insertLocation({
              latitude: 0.0,
              longitude: 0.0,
            });
        }
    }
    const obteniendoCoordenadas = async () => {
        try {
          const permission = await getLocationPermissions();
          if (permission) {
            try {
                console.log("entre");
                const { latitude, longitude } = await getCurrentLocation();
                setCoords({ latitude: latitude, longitude: longitude });
                console.log("sali");
                delay(1000);
            } catch {
                setCoords({ latitude: 19.4978, longitude: -99.1269 });
                delay(1000);
            }
          } else {
            setCoords({ latitude: 19.4978, longitude: -99.1269 });
            delay(1000);

          }
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(()=>{
        obteniendoCoordenadas();
    },[]);

    return (
        <View style={styles.container}>
            <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"6%", width:"90%", marginStart:"auto", marginEnd:"auto"}}>
                <Button title = "Entrar"
                    style={styles.botonEntrar}
                    onPress={()=>{navegandoAHome()}}/>
            </View>                
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center'
    },
    backgroundImage:{
        flex:0,
        height:'100%',
        width:'100%',
    },
    botonEntrar:{
        padding:10,
        position: 'absolute',
        top:'29%',
        width:'80%',
        alignSelf:'center',
        position:'absolute',
        zIndex:2,
    },
})
const mapStateToProps = state => {
    return {redux: state};
}

const mapDispatchToProps = dispatch =>({
    insertLocation: location =>
        dispatch({
            type: Types.INSERT_LOCATION,
            payload: {
            location,
            },
        }),
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Welcome)