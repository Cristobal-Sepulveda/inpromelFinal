import React, { useState, createRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import BottomBar from "../components/BottomBar";
import { connect } from "react-redux";
import Perfil from "./Perfil";
import Mapa from "./Mapa";
import ListadoDePendientes from "./ListadoDePendientes";
import { getLocationPermissions, getCurrentLocation } from "../utils/location";

const Home = ({ redux, wipeRedux }) => {
  const [showPerfilModal, setShowPerfilModal] = useState(false);
  const [isFocusedHome, setIsFocusedHome] = useState(true);
  const [showHome, setShowHome] = useState(true);
  const [coords, setCoords] = useState({
    latitude: redux.location[0].latitude,
    longitude: redux.location[0].longitude,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.00421,
  });

  const mapRef = createRef();

  const fabButtonPressed = () => {
    setShowHome(!showHome);
  };

  const backToUserLocation = async () => {
    try {
      const permission = await getLocationPermissions();
      if (permission) {
        try {
          const { latitude, longitude } = await getCurrentLocation();
          mapRef.current.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0001,
            longitudeDelta: 0.00421,
          });
        } catch {
          Alert.alert(
            "Hubo un error en cargar tu localización, se cargará otra localización por defecto."
          );
          mapRef.current.animateToRegion({
            latitude: 19.4978,
            longitude: -99.1269,
            latitudeDelta: 0.0001,
            longitudeDelta: 0.00421,
          });
        }
      } else {
        mapRef.current.animateToRegion({
          latitude: 19.4978,
          longitude: -99.1269,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.00421,
        });
      }
    } catch (e) {
      Alert.alert(
        "Su celular presento problemas para solicitarle permisos, reinicie la app y vuelva a intentarlo."
      );
    }
  };

  return (
    <>
      {/* Contenido de la Screen */}
      <View style={styles.container}>
        <View style={styles.body}>
          {showHome ? (
            <>
              <Mapa mapRef={mapRef} coords={coords} />
              <TouchableOpacity
                style={styles.fabButton2}
                onPress={() => {
                  backToUserLocation();
                }}
              >
                <Image
                  source={require("../../assets/icons/userLocation.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.fabButton}
                onPress={() => {
                  fabButtonPressed();
                }}
              >
                <Image source={require("../../assets/icons/plus.png")} />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <ListadoDePendientes
                setShowHome={setShowHome}
                showHome={showHome}
              />
            </>
          )}
        </View>

        {/* BottomBar */}
        <BottomBar
          showPerfilModal={showPerfilModal}
          setShowPerfilModal={setShowPerfilModal}
          showHome={showHome}
          setShowHome={setShowHome}
          isFocusedHome={isFocusedHome}
          setIsFocusedHome={setIsFocusedHome}
        />

        {/* Modal PERFIL*/}
        <Perfil
          showPerfilModal={showPerfilModal}
          setShowPerfilModal={setShowPerfilModal}
          setIsFocusedHome={setIsFocusedHome}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  body: {
    height: "92%",
  },

  fabButton: {
    flex: 1,
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 60,
    backgroundColor: "#4285f4",
    borderRadius: 50,
  },
  fabButton2: {
    flex: 1,
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 130,
    backgroundColor: "#4285f4",
    borderRadius: 50,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    padding: 10,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 52,
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
    height: "60%",
    marginTop: 20,
  },
});

const mapStateToProps = (state) => {
  return { redux: state };
};

const mapDispatchToProps = (dispatch) => ({
  wipeRedux: () =>
    dispatch({
      type: Types.WIPE_REDUX,
      payload: {},
    }),
});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Home);
