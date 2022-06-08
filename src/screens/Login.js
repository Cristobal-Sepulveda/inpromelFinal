import React, { useState, useEffect, useContext } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Keyboard,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../context/context";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthErrorCodes,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";
import { connect } from "react-redux";
import { insert_session } from "../model";

const Login = ({ redux, insertSession, wipeRedux }) => {
  const [mail, setMail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const { signIn } = useContext(AuthContext);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  //funcion que solo limpia los TextInput en screen
  const limpiarCeldas = () => {
    setMail("");
    setContraseña("");
    Keyboard.dismiss();
  };

  //esta funcion la creo solo xq en login no puedo poner el insert_session con await
  const iniciandoSesion = async (token, name) => {
    await insert_session({ id_session: token, nombre: name });
  };

  //Funcion que inicia el logeo.
  const login = async () => {
    signInWithEmailAndPassword(auth, mail, contraseña)
      .then(() => {
        console.log("Iniciando sesión");
        iniciandoSesion(1, mail);
        signIn();
      })
      .catch((e) => {
        if (e.message === "Firebase: Error (auth/invalid-email).") {
          Alert.alert("Error", "El mail que ingresó no es valido.");
          return;
        }
        if (e.message === "Firebase: Error (auth/user-not-found).") {
          Alert.alert("Error", "El usuario y/o contraseña no son validos.");
          return;
        }
        Alert.alert("Error: ", e.message);
      });
  };

  return (
    <View>
      <View style={styles.container}>
        <Image
          style={styles.fondoDeLogin}
          source={require("../../assets/gradient.png")}
        />
        <Image
          style={styles.logo}
          source={require("../../assets/LogoInpromel.png")}
        />

        <View style={styles.formulario}>
          <Text style={styles.titulo}>Bienvenido a InpromelApp</Text>
          <TextInput
            style={{ ...styles.inputs, marginTop: 30 }}
            placeholder="Mail"
            placeholderTextColor="#ffffff"
            value={mail}
            onChangeText={(text) => setMail(text)}
          />

          <TextInput
            style={styles.inputs}
            placeholder="Contraseña"
            placeholderTextColor="#ffffff"
            value={contraseña}
            onChangeText={(text) => setContraseña(text)}
            secureTextEntry={true}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "6%",
              width: "100%",
              marginStart: "auto",
              marginEnd: "auto",
            }}
          >
            <TouchableOpacity style={styles.buttons} onPress={() => login()}>
              <Text style={styles.buttonsText}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  buttons: {
    backgroundColor: "#4285f4",
    height: 48,
    width: "100%",
    borderRadius: 5,
  },
  buttonsText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    marginTop: 12,
  },
  fondoDeLogin: {
    flex: 0,
    width: "100%",
    height: "100%",
  },
  logo: {
    width: "80%",
    height: 95,
    position: "absolute",
    alignSelf: "center",
    resizeMode: "contain",
    top: "13%",
  },
  titulo: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
    color: "white",
  },
  formulario: {
    padding: 10,
    position: "absolute",
    top: "29%",
    width: "80%",
    alignSelf: "center",
    position: "absolute",
  },
  inputs: {
    borderColor: "#f0f0f0",
    borderWidth: 2,
    padding: 10,
    marginTop: 10,
    color: "#ffffff",
    borderRadius: 5,
  },
});

const mapStateToProps = (state) => {
  return { redux: state };
};

const mapDispatchToProps = (dispatch) => ({
  insertSession: (token) =>
    dispatch({
      type: Types.INSERT_SESSION,
      payload: {
        token,
      },
    }),
  wipeRedux: () =>
    dispatch({
      type: Types.WIPE_REDUX,
      payload: {},
    }),
});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Login);
