import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { AuthContext } from "../context/context";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import { select_session } from "../model";
import { Touchable } from "react-native-web";

const Perfil = ({ showPerfilModal, setShowPerfilModal, setIsFocusedHome }) => {
  const { signOut } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [online, setOnline] = useState(true);
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight =
    Platform.OS === "ios"
      ? Dimensions.get("window").height
      : require("react-native-extra-dimensions-android").get(
          "REAL_WINDOW_HEIGHT"
        );

  const userIsOnline = () => {
    NetInfo.addEventListener((state) => {
      if (
        (state.isConnected && state.details.cellularGeneration === "3g") ||
        state.details.cellularGeneration === "4g" ||
        state.details.cellularGeneration === "5g" ||
        state.type === "wifi"
      ) {
        setOnline(true);
      } else {
        setOnline(false);
      }
    });
  };

  const cerrarSesion = () => {
    Alert.alert("Aviso", "Está por salir de su sesión, ¿Desea continuar?", [
      {
        text: "Cancelar",
        style: "cancel",
        onPress: () => {},
      },
      {
        text: "Continuar",
        onPress: async () => {
          await signOut();
        },
      },
    ]);
  };
  const obtenerUsuario = async () => {
    const aux = await select_session();
    setName(aux.rows._array[0].name);
  };
  useEffect(() => {
    obtenerUsuario();
    userIsOnline();
  }, []);

  return (
    <Modal
      hasBackdrop={true}
      isVisible={showPerfilModal}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      backdropTransitionOutTiming={0}
      onBackdropPress={() => {
        setShowPerfilModal(!showPerfilModal);
      }}
    >
      <View style={styles.modalView}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={() => {
              setShowPerfilModal(false);
              setIsFocusedHome(true);
            }}
          >
            <Image
              style={styles.cerrarModal}
              source={require("../../assets/icons/cerrar.png")}
            />
          </TouchableOpacity>
          <Image
            style={styles.imagenHeader}
            source={require("../../assets/LogoInpromel.png")}
          />
          <TouchableOpacity onPress={cerrarSesion}>
            <Image
              style={styles.cerrarSesion}
              source={require("../../assets/icons/cerrar_sesion.png")}
            />
          </TouchableOpacity>
        </View>
        {/* BODY */}
        <View style={styles.modalBody}>
          {/* BODY PARTE 1 */}
          <View style={{ flexDirection: "row", marginStart: "4%" }}>
            <View
              style={{
                height: 40,
                width: 40,
                backgroundColor: "#4285f4",
                borderRadius: 40,
              }}
            />
            <View style={{ marginStart: "3%" }}>
              <Text style={{ fontSize: 15 }}>
                Nombre Nombre Apellido Apellido
              </Text>
              <Text style={{ fontSize: 13 }}>{name}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "lightgrey",
              alignSelf: "center",
              marginVertical: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ padding: 10 }}>
              Administra tu Cuenta de Inpromel
            </Text>
          </TouchableOpacity>
        </View>
        {/* SEPARADOR */}
        <View
          style={{
            borderBottomColor: "grey",
            borderBottomWidth: 1,
          }}
        />
        {/* BODY PARTE 2 */}
        <View style={{ marginVertical: 25, marginStart: "9%" }}>
          <TouchableOpacity style={{ flexDirection: "row", marginBottom: 20 }}>
            <Image source={require("../../assets/icons/agregarCuenta.png")} />
            <Text style={{ marginStart: "5%" }}>Crear una Nueva Cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image
              source={require("../../assets/icons/administrarCuenta.png")}
            />
            <Text style={{ marginStart: "5%" }}>
              Administrar cuentas en este dispositivo
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: "grey",
            borderBottomWidth: 1,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            marginVertical: 15,
          }}
        >
          <TouchableOpacity style={{ marginStart: "5.5%" }}>
            <Text style={{ fontSize: 13 }}>Politica de Privacidad</Text>
          </TouchableOpacity>
          <View
            style={{
              width: 5,
              height: 5,
              backgroundColor: "grey",
              borderRadius: 30,
              alignSelf: "center",
              marginHorizontal: "5%",
            }}
          />
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Información de Contacto",
                "Desarrollador: Cristóbal Sepúlveda\nHorario de Atencion: 09:00 a 18:00\nTeléfono: +569 5072 2566\nCorreo: \nsepulveda.cristobal.ignacio@gmail.com",
                [{ text: "Aceptar", onPress: () => {} }]
              );
            }}
            style={{ marginEnd: "10%" }}
          >
            <Text style={{ fontSize: 13 }}>Informacion de Contacto</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: "50%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 52,
    padding: 10,
  },
  cerrarModal: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 0,
    left: 0,
    marginTop: 15,
    marginLeft: 15,
  },
  imagenHeader: {
    width: 150,
    height: 40,
    marginTop: 5,
  },
  cerrarSesion: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 15,
    marginRight: 15,
  },
  modalBody: {
    padding: 10,
    marginTop: 25,
  },
});

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  deleteSession: (token) =>
    dispatch({
      type: Types.DELETE_SESSION,
      payload: {
        token,
      },
    }),
});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Perfil);
