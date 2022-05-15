import React, {useState, useEffect} from 'react';
import { Button,View, Text, TextInput, TouchableWithoutFeedback, Image, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes} from'firebase/auth';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from './firebase-config';
import {useFonts, Roboto_500Medium} from '@expo-google-fonts/roboto';


const LoginScreen = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const { width, height } = Dimensions.get('window');

  let [fontsLoaded] = useFonts({
    Roboto_500Medium
  })
  const imprime = () => {
    console.log("usuario: ",usuario,"/n password: ",contraseña)
  }

  return (
    <View style={styles.container}>
      <Image style={styles.fondoDeLogin} source={require('./assets/gradient.png')}/>
      <Image style={styles.logo} source={require('./assets/LogoInpromel.png')}/>

      <View style={styles.formulario}>
        <Text style={styles.titulo}>Bienvenido a InpromelApp</Text>
        <TextInput style={{...styles.inputs, marginTop:30}}
                   placeholder="Usuario"
                   placeholderTextColor='#ffffff'
                   value={usuario}
                   onChangeText={setUsuario}/>

        <TextInput 
                   style={styles.inputs}
                   placeholder="Contraseña"
                   placeholderTextColor='#ffffff'
                   value={contraseña}
                   onChangeText={setContraseña}
                   secureTextEntry={true}
                   />
        <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"6%", width:"90%", marginStart:"auto", marginEnd:"auto"}}>
          <Button title="Limpiar campos"/>
          <Button title="Iniciar sesión"/>


        </View>
        
      </View>

    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    minHeight: Math.round(Dimensions.get('window').height)+63,
  },
  formulario:{
    padding:10,
    position: 'absolute',
    top:'31%',
    width:'80%',
    alignSelf:'center',
    position:'absolute',
  },
  fondoDeLogin: {
    flex:0,
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 382,
    height: 95,
    position: 'absolute',
    zIndex: 1,
    top: '15%',
    alignSelf: 'center',
  },
  titulo:{
    fontWeight:'bold',
    fontFamily: 'Roboto_500Medium',
    textAlign:'center',
    fontSize:30,
    color:'white',
  },
  inputs:{
    borderColor: "#ffffff",
    borderWidth: 1,
    padding:10,
    marginTop:10,
    color:'#ffffff',
    
  }
});
