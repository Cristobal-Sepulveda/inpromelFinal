import React, { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { create_session_table } from '../model';
const SplashScreen = () => {

  const crearTablas = async () => {
    await create_session_table();
  }
  useEffect(()=>{
    crearTablas();
  },[])
 
  return (
    <>
      <Image
        style={styles.imagen}
        source={require('../../assets/splashScreen.png')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
