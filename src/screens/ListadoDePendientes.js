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
import { Snackbar } from "react-native-paper";
import AgregarPendienteModal from "../components/AgregarPendienteModal";
import { connect, useSelector } from "react-redux";
import * as Types from "../store/actions/types";
import {
  select_pendientes,
  drop_pendientes,
  select_pendientes_categoria,
} from "../model/pendientes";

const ListadoDePendientes = ({
  redux,
  selectPendientes,
  insertPendiente,
  deletePendiente,
  deletePendientes,
  setShowHome,
  showHome,
}) => {
  const [flatListItems, setFlatListItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [showAgregarPendienteModal, setShowAgregarPendienteModal] =
    useState(false);
  const pendientesList = useSelector((state) => {
    const auxArray = [];
    for (let i = 0; i < state.pendientes.length; i++) {
      auxArray.push(JSON.stringify(state.pendientes[i]));
    }
    console.log("HOLAAAA");
    return auxArray;
  });

  const volverAHome = () => {
    deletePendientes();
    setShowHome(!showHome);
  };

  const verTodos = async () => {
    setFlatListItems([]);
    const pendientesEnDb = await select_pendientes();
    const aux = pendientesEnDb.rows._array;
    console.log(aux);
    for (let i = 0; i < aux.length; i++) {
      insertPendiente(aux[i].titulo, aux[i].fecha, aux[i].topico, aux[i].tarea);
    }
  };

  const eliminarPendientes = async () => {
    setFlatListItems([]);
    deletePendientes();
    await drop_pendientes();
  };

  const porCategorias = async (categoria) => {
    const pendientesElegidos = await select_pendientes_categoria("Urgente");
    const aux = pendientesElegidos.rows._array;
    console.log(aux);
    setFlatListItems([]);
    deletePendientes();
    for (let i = 0; i < aux.length; i++) {
      console.log("@@");
      insertPendiente(aux[i].titulo, aux[i].fecha, aux[i].topico, aux[i].tarea);
    }
  };

  const cargarPendientesDesdeDB = async () => {
    const aux = await select_pendientes();
    const pendientes = aux.rows._array;
    for (let i = 0; i < pendientes.length; i++) {
      setFlatListItems((prevData) => [
        ...prevData,
        JSON.stringify(pendientes[i]),
      ]);
    }
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
            <Text>Id_pendiente: </Text>
            <Text>{aux.id_pendiente}</Text>
          </View>
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
      console.log("entre");
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

  useEffect(() => {}, [flatListItems]);

  useEffect(() => {
    setFlatListItems([]);
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
        </View>

        {/* Pendientes y botones */}
        <View style={{ backgroundColor: "#BF0413" }}>
          <Text style={{ marginTop: 8, textAlign: "center", color: "white" }}>
            PENDIENTES
          </Text>
          <View
            style={{
              marginTop: 10,
              borderBottomColor: "white",
              borderBottomWidth: 1,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#4285f4",
                width: "20%",
                marginStart: "10%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: 8,
                }}
                onPress={() => {
                  verTodos();
                }}
              >
                Ver Todos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "#4285f4", width: "20%" }}
              onPress={() => {
                eliminarPendientes();
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                Eliminar Todo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#4285f4",
                width: "20%",
                marginEnd: "10%",
              }}
              onPress={() => {
                porCategorias();
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Por categorias
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 20,
              borderBottomColor: "white",
              borderBottomWidth: 1,
            }}
          />
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
            contentContainerStyle={{ paddingBottom: 180 }}
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
                    marginEnd: "4%",
                  }}
                >
                  No tienes pendientes
                </Text>
              </View>
            }
          />
        </SafeAreaView>
      </View>

      {/* FAB BUTTONS */}
      <TouchableOpacity
        style={styles.fabButton2}
        onPress={() => {
          setShowAgregarPendienteModal(true);
        }}
      >
        <Image source={require("../../assets/icons/plus.png")} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => {
          volverAHome();
        }}
      >
        <Image source={require("../../assets/icons/flechaIzquierda.png")} />
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
  fabButton: {
    flex: 1,
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#4285f4",
    borderRadius: 50,
  },
  pendientePriority: {
    width: "40%",
    height: 25,
    alignSelf: "center",
    top: "31%",
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
  selectPendientes: () =>
    dispatch({
      type: Types.SELECT_PENDIENTES,
      payload: {},
    }),
  insertPendiente: (titulo, fecha, topico, tarea) =>
    dispatch({
      type: Types.INSERT_PENDIENTE,
      payload: { titulo, fecha, topico, tarea },
    }),
  deletePendientes: () =>
    dispatch({
      type: Types.DELETE_PENDIENTES,
      payload: {},
    }),
  deletePendiente: () =>
    dispatch({
      type: Types.DELETE_PENDIENTE,
      payload: { id_pendiente },
    }),
});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(ListadoDePendientes);
