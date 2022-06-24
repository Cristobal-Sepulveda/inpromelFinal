import React, { useState, useEffect, useContext } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Keyboard,
  Image,
  StyleSheet,
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
          Alert.alert("Error", "El mail que ingresó no es válido.");
          return;
        }
        if (e.message === "Firebase: Error (auth/user-not-found).") {
          Alert.alert("Error", "El usuario y/o contraseña no son válidos.");
          return;
        }
        Alert.alert("Error: ", e.message);
        console.log("Error: ", e.message);
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
        <TouchableOpacity
          style={{ ...styles.logo, top: "31%" }}
          onPress={() => {
            Alert.alert(
              "Credenciales",
              "\nMail: 1@1.1\nContraseña: 123456\nCuenta validada con Firebase"
            );
          }}
        >
          <Image
            source={require("../../assets/icons/info.png")}
            style={{
              height: 112 * 0.25,
              width: 112 * 0.25,
              alignSelf: "center",
              marginEnd: "5%",
            }}
          />
        </TouchableOpacity>

        <View style={styles.formulario}>
          <View style={{ ...styles.inputs, marginBottom: 14 }}>
            <Image
              style={styles.searchIcon}
              source={require("../../assets/icons/perfil_black.png")}
            />
            <TextInput
              style={{ flex: 1, height: 54 }}
              placeholder="Mail"
              placeholderTextColor="black"
              value={mail}
              onChangeText={(text) => setMail(text)}
            />
          </View>

          <View style={styles.inputs}>
            <Image
              style={styles.searchIcon}
              source={require("../../assets/icons/candado.png")}
            />
            <TextInput
              style={{ flex: 1, height: 54 }}
              placeholder="***********"
              placeholderTextColor="black"
              value={contraseña}
              onChangeText={(text) => setContraseña(text)}
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={() => login()}>
            <Text style={styles.buttonsText}>Iniciar sesión</Text>
          </TouchableOpacity>
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
  formulario: {
    padding: 10,
    position: "absolute",
    top: "39%",
    width: "80%",
    alignSelf: "center",
    position: "absolute",
  },
  searchIcon: {
    padding: 10,
    marginHorizontal: 10,
    marginTop: 14,
  },
  inputs: {
    backgroundColor: "#f0f0f0",
    marginTop: 10,
    color: "#ffffff",
    borderRadius: 5,
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#4285f4",
    height: 48,
    width: "100%",
    borderRadius: 5,
    marginTop: 16,
  },
  buttonsText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    marginTop: 12,
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
