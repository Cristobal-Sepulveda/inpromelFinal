import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getLocationPermissions, getCurrentLocation } from "../utils/location";
import { delay } from "../utils/funciones";
import { connect } from "react-redux";
import * as Types from "../store/actions/types";
import CircularDownloadProgress from "../components/CircularDownloadProgress";
import { select_pendientes } from "../model";
import * as Progress from "react-native-progress";

const Welcome = ({ navigation, redux, insertLocation, insertPendiente }) => {
  const [coords, setCoords] = useState([]);
  const [todoCargado, setTodoCargado] = useState(false);

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
  };
  const obteniendoCoordenadas = async () => {
    try {
      const permission = await getLocationPermissions();
      if (permission) {
        try {
          const { latitude, longitude } = await getCurrentLocation();
          setCoords({ latitude: latitude, longitude: longitude });
          delay(6000);
          setTodoCargado(true);
        } catch {
          setCoords({ latitude: 19.4978, longitude: -99.1269 });
          delay(3000);
          Alert.alert(
            "Hubo un error en cargar tu localización, se cargará otra localización por defecto."
          );
          setTodoCargado(true);
        }
      } else {
        setCoords({ latitude: 19.4978, longitude: -99.1269 });
        delay(3000);
        setTodoCargado(true);
      }
    } catch (e) {
      console.log(e.message);
      Alert.alert(
        "Su celular presento problemas para solicitarle permisos, reinicie la app y vuelva a intentarlo."
      );
    }
  };
  const obteniendoPendientes = async () => {
    const aux = await select_pendientes();
    const pendientesEnDb = aux.rows._array;
    for (let i = 0; i < pendientesEnDb.length; i++) {
      insertPendiente(
        pendientesEnDb[i].titulo,
        pendientesEnDb[i].fecha,
        pendientesEnDb[i].topico,
        pendientesEnDb[i].tarea
      );
    }
  };

  useEffect(() => {
    obteniendoCoordenadas();
    obteniendoPendientes();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.fondoDeLogin}
        source={require("../../assets/gradient.png")}
      />
      <Image
        style={styles.logo}
        source={require("../../assets/LogoInpromel.png")}
      />
      {todoCargado ? (
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            navegandoAHome();
          }}
        >
          <Text style={styles.buttonsText}>Entrar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            navegandoAHome();
          }}
          disabled={true}
        >
          {/* <Text style={styles.buttonsText}>Cargando</Text> */}
          <ActivityIndicator
            size="large"
            color="#ffffff"
            style={{ paddingVertical: "3.9%" }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  buttons: {
    position: "absolute",
    backgroundColor: "#4285f4",
    height: 60,
    borderRadius: 5,
    width: "74.5%",
    top: "70.2%",
  },
  buttonsText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    height: "100%",
    textAlignVertical: "center",
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
    resizeMode: "contain",
    top: "13%",
  },
  circularProgress: {
    position: "absolute",
    top: "55%",
  },
});
const mapStateToProps = (state) => {
  return { redux: state };
};

const mapDispatchToProps = (dispatch) => ({
  insertLocation: (location) =>
    dispatch({
      type: Types.INSERT_LOCATION,
      payload: {
        location,
      },
    }),
  insertPendiente: (titulo, fecha, topico, tarea) =>
    dispatch({
      type: Types.INSERT_PENDIENTE,
      payload: { titulo, fecha, topico, tarea },
    }),
});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Welcome);
