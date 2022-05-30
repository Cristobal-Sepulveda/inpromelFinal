import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
} from "react-native";
import AgregarPendienteModal from "../components/AgregarPendienteModal";
import { connect, useSelector } from "react-redux";
import * as Types from "../store/actions/types";
import { select_pendientes } from "../model/pendientes";

const ListadoDePendientes = ({ redux, insertPendiente }) => {
  const [flatListItems, setFlatListItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [showAgregarPendienteModal, setShowAgregarPendienteModal] =
    useState(false);
  const pendientesList = useSelector((state) => {
    const auxArray = [];
    for (let i = 0; i < state.pendientes.length; i++) {
      auxArray.push(JSON.stringify(state.pendientes[i]));
    }
    return auxArray;
  });

  const cargarPendientesDesdeDB = async () => {
    const pedidos = await select_pendientes();
    console.log(pedidos.rows._array);
  };

  const renderItem = ({ item }) => {
    const aux = JSON.parse(item);
    const tarea = aux.tarea.slice(0, 10);
    return (
      <View style={styles.itemContainer}>
        {/* COLUMNA 1 */}
        {aux.topico === "Urgente" ? (
          <View style={{ width: "20%" }}>
            <View
              style={{ ...styles.pendientePriority, backgroundColor: "red" }}
            />
          </View>
        ) : aux.topico === "Planificada" ? (
          <View style={{ width: "20%" }}>
            <View
              style={{ ...styles.pendientePriority, backgroundColor: "yellow" }}
            />
          </View>
        ) : aux.topico === "No Urgente" ? (
          <View style={{ width: "20%" }}>
            <View
              style={{ ...styles.pendientePriority, backgroundColor: "green" }}
            />
          </View>
        ) : (
          <></>
        )}

        {/* Columna 2 */}
        <View style={{ width: "80%" }}>
          <View style={{ flexDirection: "row" }}>
            <Text>Titulo: </Text>
            <Text>{aux.titulo}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Fecha: </Text>
            <Text>{aux.fecha}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Tarea a realizar: </Text>
            <Text>
              {tarea}
              {"..."}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  //funcion iniciada al hacer sync en la flatList...
  const syncFlatList = async () => {
    console.log("syncFlatList");
    setIsRefreshing(false);
    const userConexionType = await obtenerTipoConexion();
    if (userConexionType.tipoConexion == "wifi") {
      return Alert.alert("lista sincronizada");
    }
    if (userConexionType.tipoConexion == "cellular") {
      if (userConexionType.connectionDetails == "4g") {
        return Alert.alert("lista sincronizada");
      } else {
        return Alert.alert(
          "Tu conexion de celular debe ser 4g",
          "para poder sincronizar el listado"
        );
      }
    }
    return Alert.alert(
      "Debes tener conexion a internet para poder",
      "sincronizar el listado"
    );
  };

  useEffect(() => {
    if (
      pendientesList.length &&
      !flatListItems.includes(pendientesList[pendientesList.length - 1])
    ) {
      if (
        flatListItems.length === 0 &&
        pendientesList.length > 0 &&
        !flatListItems.includes(pendientesList[pendientesList.length - 1])
      ) {
        for (let i = 0; i < pendientesList.length; i++) {
          setFlatListItems((prevData) => [...prevData, pendientesList[i]]);
        }
      } else {
        setFlatListItems((prevData) => [
          ...prevData,
          pendientesList[pendientesList.length - 1],
        ]);
      }
    }
  }, [pendientesList]);

  useEffect(() => {
    cargarPendientesDesdeDB();
  }, []);

  return (
    <>
      {/* CONTAINER */}
      <View
        style={{
          marginTop: "20%",
          width: "90%",
          marginStart: "auto",
          marginEnd: "auto",
        }}
      >
        {/* CABECERA */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#BF0413",
            paddingVertical: 20,
            paddingHorizontal: "5%",
            marginBottom: "10%",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              fontWeight: "400",
              color: "white",
              marginStart: "10%",
            }}
          >
            Listado de Pendientes
          </Text>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Aviso",
                "Para ingresar un pendiente, haga click en el boton +",
                [
                  {
                    text: "Cerrar",
                    onPress: () => {},
                  },
                  {
                    text: "Ver mas",
                    onPress: () => {
                      Alert.alert(
                        "Aviso",
                        "Para ver en detalle un pendiente, haz click en el",
                        [
                          {
                            text: "Cerrar",
                            onPress: () => {},
                          },
                        ]
                      );
                    },
                  },
                ]
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
          <TouchableOpacity
            onPress={() => {
              cargarPendientesDesdeDB();
            }}
          >
            <Text>Hola</Text>
          </TouchableOpacity>
        </View>

        {/* BODY CON FLATLIST */}
        <SafeAreaView style={{ height: "80%" }}>
          <FlatList
            data={flatListItems}
            renderItem={renderItem}
            keyExtractor={(item) => JSON.parse(item).key}
            numColumns={1}
            backgroundColor="#BF0413"
            refreshing={isRefreshing}
            contentContainerStyle={{ paddingBottom: 10 }}
            //onRefresh={syncFlatList}
            ListHeaderComponent={
              <View style={{ marginTop: 8, marginBottom: 8 }}>
                <Text style={{ textAlign: "center", color: "white" }}>
                  PENDIENTES
                </Text>
                <View
                  style={{
                    marginTop: 8,
                    borderBottomColor: "white",
                    borderBottomWidth: 1,
                  }}
                />
              </View>
            }
            ListEmptyComponent={
              <View
                style={{
                  padding: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Image
                  source={require("../../assets/atardecer.png")}
                  style={{
                    borderRadius: 10,
                    width: "80%",
                    height: 200,
                    marginTop: "15%",
                    resizeMode: "contain",
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 25,
                    marginTop: "8%",
                  }}
                >
                  No tienes ningun Pendiente
                </Text>
              </View>
            }
          />
        </SafeAreaView>
      </View>
      {/* FAB BUTTON */}
      <TouchableOpacity
        style={styles.fabButton2}
        onPress={() => {
          setShowAgregarPendienteModal(true);
        }}
      >
        <Image source={require("../../assets/icons/plus.png")} />
      </TouchableOpacity>

      {/* Modal AgregarPendiente*/}
      <AgregarPendienteModal
        showAgregarPendienteModal={showAgregarPendienteModal}
        setShowAgregarPendienteModal={setShowAgregarPendienteModal}
        setFlatListItems={setFlatListItems}
      />
    </>
  );
};

const styles = StyleSheet.create({
  pendientePriority: {
    width: "40%",
    height: "40%",
    alignSelf: "center",
    marginTop: "25%",
    borderRadius: 30,
  },
  margenInferior: {
    marginBottom: 36,
  },
  fabButton2: {
    flex: 1,
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 100,
    backgroundColor: "#4285f4",
    borderRadius: 50,
  },
  itemContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
});

const mapStateToProps = (state) => {
  return { redux: state };
};

const mapDispatchToProps = (dispatch) => ({
  insertPendiente: (titulo, fecha, topico, tarea) =>
    dispatch({
      type: Types.INSERT_PENDIENTE,
      payload: { titulo, fecha, topico, tarea },
    }),
});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(ListadoDePendientes);
