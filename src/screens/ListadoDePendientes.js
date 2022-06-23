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
  Dimensions,
} from "react-native";
import { RadioButton, Snackbar } from "react-native-paper";
import AgregarPendienteModal from "../components/AgregarPendienteModal";
import { connect, useSelector } from "react-redux";
import * as Types from "../store/actions/types";
import {
  select_pendientes,
  drop_pendientes,
  editar_pendiente,
  select_pendientes_categoria,
} from "../model/pendientes";
import BottomSheet from "reanimated-bottom-sheet";
import DetallePendiente from "../components/DetallePendiente";
import { delete_pendiente } from "../model/pendientes";

const ListadoDePendientes = ({
  redux,
  selectNuevaFecha,
  deletePendientes,
  setShowHome,
  showHome,
}) => {
  const [tituloAGuardar, setTituloAGuardar] = useState("");
  const [tareaAGuardar, setTareaAGuardar] = useState("");
  const [topicoAGuardar, setTopicoAGuardar] = useState("");
  const [flatListItems, setFlatListItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [detallePendiente, setDetallePendiente] = useState([]);
  const [showAgregarPendienteModal, setShowAgregarPendienteModal] =
    useState(false);
  const [showDetallePendiente, setShowDetallePendiente] = useState(false);
  const [topicoChecked, setTopicoChecked] = useState("");
  const categorias = useRef(null);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateClickeado, setDateClickeado] = useState(false);
  let switchEliminarActivo = false;
  // const pendientesList = useSelector((state) => {
  //   const auxArray = [];
  //   for (let i = 0; i < state.pendientes.length; i++) {
  //     auxArray.push(JSON.stringify(state.pendientes[i]));
  //   }
  //   return auxArray;
  // });

  // useEffect(() => {
  //   if (
  //     pendientesList.length &&
  //     !flatListItems.includes(pendientesList[pendientesList.length - 1])
  //   ) {
  //     if (
  //       flatListItems.length === 0 &&
  //       pendientesList.length > 0 &&
  //       !flatListItems.includes(pendientesList[pendientesList.length - 1])
  //     ) {
  //       for (let i = 0; i < pendientesList.length; i++) {
  //         setFlatListItems((prevData) => [...prevData, pendientesList[i]]);
  //       }
  //     } else {
  //       setFlatListItems((prevData) => [
  //         ...prevData,
  //         pendientesList[pendientesList.length - 1],
  //       ]);
  //     }
  //   }
  // }, [pendientesList]);

  useEffect(() => {
    cargarPendientesDesdeDB();
  }, []);

  useEffect(() => {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%", detallePendiente);
    if (switchEliminarActivo) {
      delete_pendiente(detallePendiente.id_pendiente);
      switchEliminarActivo = false;
    }
  }, [detallePendiente]);

  const editarPendiente = async () => {
    const aux = detallePendiente;
    setFlatListItems([]);
    try {
      await editar_pendiente(
        tituloAGuardar,
        redux.nueva_fecha,
        topicoAGuardar,
        tareaAGuardar,
        aux.id_pendiente
      );
    } catch (e) {
      console.log(e.message);
      return;
    }

    const pendientes = await select_pendientes();
    const aux2 = pendientes.rows._array;
    console.log(flatListItems);
    for (let i = 0; i < aux2.length; i++) {
      setFlatListItems((prevData) => [...prevData, JSON.stringify(aux2[i])]);
    }
    setShowDetallePendiente(false);
  };

  const alertaEditar = () => {
    if (
      tituloAGuardar === detallePendiente.titulo &&
      tareaAGuardar === detallePendiente.tarea &&
      topicoAGuardar === detallePendiente.topico &&
      redux.nueva_fecha === detallePendiente.fecha
    ) {
      Alert.alert("Aviso", "No hay cambios para guardar.");
    } else {
      Alert.alert("Aviso", "¿Estas seguro que quieres editar este pendiente?", [
        { text: "Cancelar", onPress: () => {} },
        {
          text: "Confirmar",
          onPress: () => {
            editarPendiente();
          },
        },
      ]);
    }
  };

  const cargarPendientesDesdeDB = async () => {
    setFlatListItems([]);
    const aux = await select_pendientes();
    const pendientes = aux.rows._array;
    for (let i = 0; i < pendientes.length; i++) {
      setFlatListItems((prevData) => [
        ...prevData,
        JSON.stringify(pendientes[i]),
      ]);
    }
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const borrarPendiente = async () => {
    setFlatListItems([]);
    console.log("@@@@@@@", detallePendiente);
    try {
      delete_pendiente(detallePendiente.id_pendiente);
      const pendientes = await select_pendientes();
      const aux = pendientes.rows._array;
      console.log(aux);
      for (let i = 0; i < aux.length; i++) {
        setFlatListItems((prevData) => [...prevData, JSON.stringify(aux[i])]);
      }
    } catch (e) {
      Alert.alert(
        "Error: ",
        e,
        "\nComuniquese con el administrador de la base de datos."
      );
      console.log("Error: ", e);
    }
    setShowDetallePendiente(false);
  };

  const alertaBorrar = () => {
    Alert.alert("Aviso", "¿Estas seguro que quieres borrar este pendiente?", [
      { text: "Cancelar", onPress: () => {} },
      {
        text: "Confirmar",
        onPress: () => {
          switchEliminarActivo = true;
          borrarPendiente();
        },
      },
    ]);
  };

  /* Filtros*/
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
    console.log(categoria);
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

  /* FAB BUTTON ACTION */
  const volverAHome = () => {
    setShowHome(!showHome);
  };

  //funcion iniciada al hacer sync en la flatList...
  const syncFlatList = async () => {
    setIsRefreshing(true);
    cargarPendientesDesdeDB();
    setIsRefreshing(false);
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

        {/* RADIOBUTTONS */}

        <View style={{ marginStart: "5%", marginTop: "5%" }}>
          {/* RADIO_BUTTON URGENTE */}
          <View style={{ flexDirection: "row" }}>
            <RadioButton
              value={"Urgente"}
              status={topicoChecked === "Urgente" ? "checked" : "unchecked"}
              onPress={() => {
                setTopicoChecked("Urgente");
                porCategorias("Urgente");
              }}
              color="#4285f4"
            />
            <Text style={styles.textLabel}>{"Urgente"}</Text>
          </View>
          {/* RADIO_BUTTON PLANIFICADA */}
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              marginVertical: "2%",
            }}
          >
            <RadioButton
              value={"Planificada"}
              status={topicoChecked === "Planificada" ? "checked" : "unchecked"}
              onPress={() => {
                setTopicoChecked("Planificada");
                porCategorias("Planificada");
              }}
              color="#4285f4"
            />
            <Text style={styles.textLabel}>{"Planificada"}</Text>
          </View>
          {/* RADIO_BUTTON NO URGENTE */}
          <View style={{ flexDirection: "row", alignContent: "center" }}>
            <RadioButton
              value={"No Urgente"}
              status={topicoChecked === "No Urgente" ? "checked" : "unchecked"}
              onPress={() => {
                setTopicoChecked("No Urgente");
                porCategorias("No Urgente");
              }}
              color="#4285f4"
            />
            <Text style={styles.textLabel}>{"No Urgente"}</Text>
          </View>
        </View>
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
          setShowDetallePendiente(true);
        }}
      >
        {/* COLUMNA 1 */}
        {/* {aux.topico === "Urgente" ? (
          <View style={{ width: "20%" }}>
            <View
              style={{ ...styles.pendientePriority, backgroundColor: "red" }}
            />
          </View>
        ) : aux.topico === "Planificada" ? (
          <View style={{ width: "20%" }}>
            <View
              style={{ ...styles.pendientePriority, backgroundColor: "orange" }}
            />
          </View>
        ) : aux.topico === "No Urgente" ? (
          <View style={{ width: "20%" }}>
            <View
              style={{ ...styles.pendientePriority, backgroundColor: "yellow" }}
            />
          </View>
        ) : (
          <></>
        )} */}

        {/* Columna 2 */}
        <View style={{ marginStart: "10%", width: "30%" }}>
          <View style={{ flexDirection: "row" }}>
            <Text>Titulo: </Text>
            <Text>{aux.titulo}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Fecha: </Text>
            <Text>{new Date(aux.fecha).toLocaleDateString()}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Tipo: </Text>
            <Text>{aux.topico}</Text>
          </View>
        </View>

        {/* Columna 3 */}
        <View style={{ marginTop: "5%", marginEnd: "10%" }}>
          <TouchableOpacity
            onPress={() => {
              setDetallePendiente(aux);
              alertaBorrar();
            }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../assets/icons/borrar.png")}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* CONTAINER */}
      <View
        style={{
          width: "90%",
          marginStart: "auto",
          marginEnd: "auto",
          minHeight: Math.round(Dimensions.get("window").height) - 63,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#4285f4",
            paddingVertical: 20,
            paddingHorizontal: "5%",
            marginBottom: "5%",
            marginTop: "13%",
            justifyContent: "space-between",
            height: "10%",
          }}
        >
          {showDetallePendiente ? (
            <>
              <TouchableOpacity
                style={{ marginTop: "1%", alignSelf: "center" }}
                onPress={() => {
                  setDateClickeado(false);
                  setShowDetallePendiente(!showDetallePendiente);
                }}
              >
                <Image
                  source={require("../../assets/icons/flechaDetalle.png")}
                />
              </TouchableOpacity>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 16,
                  fontWeight: "400",
                  color: "white",
                }}
              >
                Detalle del Pendiente
              </Text>
              <TouchableOpacity
                style={{ marginEnd: "5%", alignSelf: "center" }}
                onPress={() => {
                  alertaBorrar();
                }}
              >
                <Image
                  style={{ width: 26, height: 26 }}
                  source={require("../../assets/icons/delete.png")}
                />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View />
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "400",
                  color: "white",
                  marginStart: "10%",
                  fontSize: 16,
                }}
              >
                Listado de Pendientes
              </Text>
              <TouchableOpacity
                style={{ alignSelf: "center" }}
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
            </>
          )}
        </View>

        {/* Body */}
        {showDetallePendiente ? (
          <DetallePendiente
            showDetallePendiente={showDetallePendiente}
            setShowDetallePendiente={setShowDetallePendiente}
            detallePendiente={detallePendiente}
            setDetallePendiente={setDetallePendiente}
            flatListItems={flatListItems}
            setFlatListItems={setFlatListItems}
            alertaEditar={alertaEditar}
            setTituloAGuardar={setTituloAGuardar}
            setTareaAGuardar={setTareaAGuardar}
            setTopicoAGuardar={setTopicoAGuardar}
            topicoAGuardar={topicoAGuardar}
          />
        ) : (
          <View
            style={{
              borderRadius: 10,
              minHeight: "77.5%",
              backgroundColor: "lightgrey",
            }}
          >
            {/* top buttomBar */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: "5%",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#4285f4",
                  width: "21%",
                  marginStart: "8%",
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: 8,
                    fontSize: 13,
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
                    fontSize: 13,
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
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: 8,
                    fontSize: 13,
                  }}
                >
                  Filtrar
                </Text>
              </TouchableOpacity>
            </View>
            {/* SEPARADOR */}
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 1,
              }}
            />
            {/*FLATLIST */}
            <SafeAreaView style={{ flex: 1 }}>
              <FlatList
                style={{
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
                data={flatListItems}
                renderItem={renderItem}
                keyExtractor={(item) => JSON.parse(item).key}
                numColumns={1}
                backgroundColor="lightgrey"
                refreshing={isRefreshing}
                onRefresh={syncFlatList}
                contentContainerStyle={{ paddingBottom: "2%" }}
              />
            </SafeAreaView>
          </View>
        )}
      </View>

      {/* FAB BUTTONS */}
      {/* BOTON + */}
      {showDetallePendiente ? (
        <>
          <TouchableOpacity
            style={styles.fabButton2}
            onPress={() => {
              alertaEditar();
            }}
          >
            <Image source={require("../../assets/icons/save.png")} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fabButton}
            onPress={() => {
              setShowDetallePendiente(false);
            }}
          >
            <Image
              style={{ height: 18, width: 18 }}
              source={require("../../assets/icons/flechaIzquierdaWhite.png")}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.fabButton2}
            onPress={() => {
              setShowAgregarPendienteModal(!showAgregarPendienteModal);
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
            <Image
              style={{ height: 18, width: 18 }}
              source={require("../../assets/icons/flechaIzquierdaWhite.png")}
            />
          </TouchableOpacity>
        </>
      )}

      <AgregarPendienteModal
        showAgregarPendienteModal={showAgregarPendienteModal}
        setShowAgregarPendienteModal={setShowAgregarPendienteModal}
        setFlatListItems={setFlatListItems}
        syncFlatList={syncFlatList}
      />

      {/* BottomSheet Por Categorias */}
      <BottomSheet
        ref={categorias}
        callbackThreshold={0.1}
        initialSnap={0}
        snapPoints={[-50, "32%"]}
        borderRadius={10}
        renderContent={renderContentCategorias}
        enabledContentTapInteraction={false}
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
  itemContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: 15,
    justifyContent: "space-between",
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

  selectNuevaFecha: () =>
    dispatch({
      type: Types.SELECT_NUEVA_FECHA,
      payload: {},
    }),
});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(ListadoDePendientes);
