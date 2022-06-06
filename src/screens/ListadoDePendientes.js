import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import { RadioButton, Snackbar } from "react-native-paper";
import AgregarPendienteModal from "../components/AgregarPendienteModal";
import { connect, useSelector } from "react-redux";
import * as Types from "../store/actions/types";
import {
  select_pendientes,
  drop_pendientes,
  select_pendientes_categoria,
} from "../model/pendientes";
import BottomSheet from "reanimated-bottom-sheet";
import DetallePendienteModal from "../components/DetallePendienteModal";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomRadioBox from "../components/CustomRadioBox";

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
  const [detallePendiente, setDetallePendiente] = useState([]);

  const [showAgregarPendienteModal, setShowAgregarPendienteModal] =
    useState(false);
  const [showDetallePendienteModal, setShowDetallePendienteModal] =
    useState(false);
  const [topicoChecked, setTopicoChecked] = useState();
  const categorias = useRef(null);
  const agregarPendiente = useRef(null);
  const pendientesList = useSelector((state) => {
    const auxArray = [];
    for (let i = 0; i < state.pendientes.length; i++) {
      auxArray.push(JSON.stringify(state.pendientes[i]));
    }
    return auxArray;
  });

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

  useEffect(() => {
    setFlatListItems([]);
    cargarPendientesDesdeDB();
  }, []);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const verTodos = async () => {
    const pendientesEnDb = await select_pendientes();
    const aux = pendientesEnDb.rows._array;
    setFlatListItems([]);
    for (let i = 0; i < aux.length; i++) {
      setFlatListItems((prevData) => [...prevData, JSON.stringify(aux[i])]);
    }
  };

  const eliminarPendientes = async () => {
    setFlatListItems([]);
    deletePendientes();
    await drop_pendientes();
  };

  const porCategorias = async (categoria) => {
    const aux = await select_pendientes();
    const pendientes = aux.rows._array;
    setFlatListItems([]);
    for (let i = 0; i < pendientes.length; i++) {
      if (pendientes[i].topico === categoria) {
        setFlatListItems((prevData) => [
          ...prevData,
          JSON.stringify(pendientes[i]),
        ]);
      }
    }
    categorias.current.snapTo(0);
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

  const volverAHome = () => {
    deletePendientes();
    setShowHome(!showHome);
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

  const renderContentCategorias = () => {
    return (
      <View style={styles.bodyBottomSheet}>
        {/* Header */}
        <View style={styles.lineSheets} />

        <Text style={{ marginTop: "5%", alignSelf: "center", fontSize: 20 }}>
          Elija Categoría
        </Text>
        {/* Body Content */}

        <View style={{ marginStart: "5%", marginTop: "10%" }}>
          <View style={{ flexDirection: "row", alignContent: "center" }}>
            <RadioButton
              value={"Urgente"}
              status={topicoChecked === "Urgente" ? "checked" : "unchecked"}
              onPress={() => {
                setTopicoChecked("Urgente");
              }}
              color="#4285f4"
            />
            <Text style={styles.textLabel}>{"Urgente"}</Text>
          </View>
          <View style={{ flexDirection: "row", alignContent: "center" }}>
            <RadioButton
              value={"Planificada"}
              status={topicoChecked === "Planificada" ? "checked" : "unchecked"}
              onPress={() => {
                setTopicoChecked("Planificada");
              }}
              color="#4285f4"
            />
            <Text style={styles.textLabel}>{"Planificada"}</Text>
          </View>
          <View style={{ flexDirection: "row", alignContent: "center" }}>
            <RadioButton
              value={"No Urgente"}
              status={topicoChecked === "No Urgente" ? "checked" : "unchecked"}
              onPress={() => {
                setTopicoChecked("No Urgente");
              }}
              color="#4285f4"
            />
            <Text style={styles.textLabel}>{"No Urgente"}</Text>
          </View>
        </View>
        {/* FootBar */}
        <TouchableOpacity
          style={{
            backgroundColor: "#4285f4",
            width: "20%",
            height: 40,
            alignSelf: "center",
            marginTop: "6%",
          }}
          onPress={() => {
            porCategorias(topicoChecked);
          }}
        >
          <Text style={{ color: "white", marginTop: 10, textAlign: "center" }}>
            Filtrar
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const aux = JSON.parse(item);
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setDetallePendiente(aux);
          setShowDetallePendienteModal(true);
        }}
      >
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
        <View style={{ width: "30%" }}>
          <View style={{ flexDirection: "row" }}>
            <Text>Titulo: </Text>
            <Text>{aux.titulo}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Fecha: </Text>
            {JSON.stringify(aux.fecha).slice(1, 12)[10] === "T" ? (
              <Text>{JSON.stringify(aux.fecha).slice(1, 11)}</Text>
            ) : (
              <Text>{JSON.stringify(aux.fecha).slice(1, 12)}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#4285f4",
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
        {/* Body */}
        {/* top buttomBar */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            backgroundColor: "lightgrey",
            paddingVertical: 15,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#4285f4",
              width: "20%",
              marginStart: "10%",
              borderRadius: 5,
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
            style={{
              backgroundColor: "#4285f4",
              width: "20%",
              borderRadius: 5,
            }}
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
              borderRadius: 5,
            }}
            onPress={() => {
              categorias.current.snapTo(1);
            }}
          >
            <Text style={{ color: "white", textAlign: "center", marginTop: 8 }}>
              Filtrar
            </Text>
          </TouchableOpacity>
        </View>

        {/*FLATLIST */}
        <SafeAreaView style={{ height: "70%" }}>
          <FlatList
            style={{ borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}
            data={flatListItems}
            renderItem={renderItem}
            keyExtractor={(item) => JSON.parse(item).key}
            numColumns={1}
            backgroundColor="lightgrey"
            refreshing={isRefreshing}
            contentContainerStyle={{ paddingBottom: 180 }}
            ListEmptyComponent={
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/atardecer.png")}
                  style={{
                    borderRadius: 10,
                    width: "80%",
                    height: 150,
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
      {/* BOTON + */}
      <TouchableOpacity
        style={styles.fabButton2}
        onPress={() => {
          setShowAgregarPendienteModal(!showAgregarPendienteModal);
        }}
      >
        <Image source={require("../../assets/icons/plus.png")} />
      </TouchableOpacity>
      {/* BOTON < */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => {
          volverAHome();
        }}
      >
        <Image
          style={{ height: 18, width: 18 }}
          source={require("../../assets/icons/flechaIzquierdaWhite.png")}
        />
      </TouchableOpacity>

      {/* Modal DetallePendiente */}
      <DetallePendienteModal
        showDetallePendienteModal={showDetallePendienteModal}
        setShowDetallePendienteModal={setShowDetallePendienteModal}
        detallePendiente={detallePendiente}
        setDetallePendiente={setDetallePendiente}
        flatListItems={flatListItems}
        setFlatListItems={setFlatListItems}
      />

      <AgregarPendienteModal
        showAgregarPendienteModal={showAgregarPendienteModal}
        setShowAgregarPendienteModal={setShowAgregarPendienteModal}
        setFlatListItems={setFlatListItems}
      />

      {/* BottomSheet Por Categorias */}
      <BottomSheet
        ref={categorias}
        callbackThreshold={0.1}
        initialSnap={0}
        snapPoints={[0, "40%"]}
        borderRadius={10}
        renderContent={renderContentCategorias}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textLabel: {
    marginTop: "1.2%",
    fontSize: 20,
    marginStart: "1%",
  },
  lineSheets: {
    borderTopColor: "#E5E5E5",
    borderTopWidth: 6,
    borderRadius: 5,
    width: "25%",
    alignSelf: "center",
  },
  bodyBottomSheet: {
    backgroundColor: "#f6f6f6",
    paddingHorizontal: 8,
    paddingVertical: 12,
    height: "100%",
    zIndex: 2000,
  },
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
    paddingVertical: 15,
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
