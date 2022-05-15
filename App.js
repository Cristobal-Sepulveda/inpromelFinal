import React, {useState, useEffect} from 'react';
import { Button,View, Text, TextInput, Keyboard, Image, StyleSheet, Dimensions, Alert} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {useFonts, Roboto_500Medium} from '@expo-google-fonts/roboto';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes} from'firebase/auth';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from './firebase-config';


const LoginScreen = () => {
  const [mail, setMail] = useState('');
  const [contraseña, setContraseña] = useState('');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // const handleCreateAccount = () => {
  //   createUserWithEmailAndPassword(auth, usuario, contraseña)
  //     .then(() => {
  //       console.log('Cuenta creada');
  //       const user = userCredential.user;
  //       console.log(user);
  //     })
  //     .catch((e) =>{
  //       if(e.message === "Firebase: Error (auth/email-already-in-use)."){
  //         Alert.alert("Error","El mail que ingreso ya se encuentra asociado a una cuenta.")
  //         return;
  //       }
  //       Alert.alert("Error", e.message)
  //     })
  // };
  
  const limpiarCeldas = () => {
    setMail('');
    setContraseña('');
    Keyboard.dismiss();
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, mail, contraseña)
      .then(() => {
        console.log("Iniciando sesión");
        const user = userCredential.user;
        console.log(user);
      })
      .catch((e) => {
        if(e.message === "Firebase: Error (auth/invalid-email)."){
          Alert.alert("Error","El mail que ingresó no es valido.");
          return;
        }
        if(e.message === "Firebase: Error (auth/user-not-found)."){
          Alert.alert("Error","El usuario y/o contraseña no son validos.");
          return;
        }
        Alert.alert("Error: ", e.message)
      })
  };

  return (
    <View style={styles.container}>
      <Image style={styles.fondoDeLogin} source={require('./assets/gradient.png')}/>
      <Image style={styles.logo} source={require('./assets/LogoInpromel.png')}/>

      <View style={styles.formulario}>
        <Text style={styles.titulo}>Bienvenido a InpromelApp</Text>
        <TextInput style={{...styles.inputs, marginTop:30}}
                   placeholder="Mail"
                   placeholderTextColor='#ffffff'
                   value={mail}
                   onChangeText={(text) => setMail(text)}/>

        <TextInput 
                   style={styles.inputs}
                   placeholder="Contraseña"
                   placeholderTextColor='#ffffff'
                   value={contraseña}
                   onChangeText={(text) => setContraseña(text)}
                   secureTextEntry={true}
                   />
        <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"6%", width:"90%", marginStart:"auto", marginEnd:"auto"}}>
          <Button onPress = {limpiarCeldas} title="Limpiar campos"/>
          <Button onPress = {handleSignIn} title="Iniciar sesión"/>


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
    top: '13%',
    alignSelf: 'center',
  },
  titulo:{
    fontWeight:'bold',
    fontFamily: 'Roboto_500Medium',
    textAlign:'center',
    fontSize:30,
    color:'white',
  },
  formulario:{
    padding:10,
    position: 'absolute',
    top:'29%',
    width:'80%',
    alignSelf:'center',
    position:'absolute',
  },
  inputs:{
    borderColor: "#ffffff",
    borderWidth: 1,
    padding:10,
    marginTop:10,
    color:'#ffffff', 
    borderRadius:5  
  }
});
