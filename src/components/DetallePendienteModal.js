import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import {
  delete_pendiente,
  editar_pendiente,
  select_pendientes,
} from "../model/pendientes";
import CustomDatePicker from "./CustomDatePicker";
import CustomRadioBox from "./CustomRadioBox";

const DetallePendienteModal = ({
  showDetallePendienteModal,
  setShowDetallePendienteModal,
  detallePendiente,
  setDetallePendiente,
  flatListItems,
  setFlatListItems,
}) => {
  const [tareaAGuardar, setTareaAGuardar] = useState("");
  const [showEditarPendienteModal, setShowEditarPendienteModal] =
    useState(false);
  const [tareaARealizar, setTareaARealizar] = useState("");

  const editarPendiente = async () => {
    const aux = detallePendiente;
    setFlatListItems([]);
    aux.tarea = tareaAGuardar;
    console.log(aux);
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    try {
      await editar_pendiente(
        aux.titulo,
        aux.fecha,
        aux.topico,
        aux.tarea,
        aux.id_pendiente
      );
    } catch (e) {
      console.log(e.message);
      return;
    }

    const pendientes = await select_pendientes();
    const aux2 = pendientes.rows._array;
    console.log(aux2);
    for (let i = 0; i < aux2.length; i++) {
      setFlatListItems((prevData) => [...prevData, JSON.stringify(aux2[i])]);
    }
    setShowEditarPendienteModal(!showEditarPendienteModal);
    setShowDetallePendienteModal(!showDetallePendienteModal);
  };

  const alertaEditar = () => {
    Alert.alert("Aviso", "¿Estas seguro que quieres editar este pendiente?", [
      { text: "Cancelar", onPress: () => {} },
      {
        text: "Confirmar",
        onPress: () => {
          editarPendiente();
        },
      },
    ]);
  };

  const switchModal = () => {
    setShowEditarPendienteModal(!showEditarPendienteModal);
  };

  const borrarPendiente = async () => {
    setFlatListItems([]);
    delete_pendiente(detallePendiente.id_pendiente);
    setShowDetallePendienteModal(!showDetallePendienteModal);
    const pendientes = await select_pendientes();
    const aux = pendientes.rows._array;
    console.log(aux);
    for (let i = 0; i < aux.length; i++) {
      setFlatListItems((prevData) => [...prevData, JSON.stringify(aux[i])]);
    }
  };

  const alertaBorrar = () => {
    Alert.alert("Aviso", "¿Estas seguro que quieres borrar este pendiente?", [
      { text: "Cancelar", onPress: () => {} },
      {
        text: "Confirmar",
        onPress: () => {
          borrarPendiente();
        },
      },
    ]);
  };

  return (
    <View>
      {showEditarPendienteModal ? (
        <Modal
          isVisible={showEditarPendienteModal}
          coverScreen={true}
          hasBackdrop={true}
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          backdropTransitionOutTiming={0}
          avoidKeyboard={false}
          onBackdropPress={() => {
            setShowEditarPendienteModal(!showEditarPendienteModal);
          }}
        >
          {/* Contenido del Modal */}
          <View style={styles.modalView}>
            {/* Header del Modal */}
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => {
                  setShowEditarPendienteModal(!showEditarPendienteModal);
                }}
              >
                <Image
                  style={styles.cerrarModal}
                  source={require("../../assets/icons/back.png")}
                />
              </TouchableOpacity>
              <Image
                style={styles.imagenHeader}
                source={require("../../assets/LogoInpromel.png")}
              />
              <View />
            </View>
            {/* Body del Modal */}
            <View style={styles.modalBody}>
              {/* Titulo Ventana */}
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  marginVertical: 10,
                }}
              >
                Edita la Tarea del Pendiente
              </Text>

              {/* Linea separadora */}
              <View
                style={{
                  marginVertical: 10,
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              />
              {/* Contenido */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <Text style={{ ...styles.label, width: "20%" }}>Tarea:</Text>
                <TextInput
                  style={styles.textInput}
                  defaultValue={detallePendiente.tarea}
                  placeholderTextColor="black"
                  onChangeText={setTareaAGuardar}
                  multiline={true}
                  maxLength={100}
                />
                <TouchableOpacity
                  style={{
                    alignSelf: "center",
                    marginStart: "auto",
                    marginEnd: "auto",
                  }}
                  onPress={() => {
                    alertaEditar();
                  }}
                >
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require("../../assets/icons/edit.png")}
                  />
                </TouchableOpacity>
              </View>

              {/* Linea separadora */}
              <View
                style={{
                  marginVertical: 10,
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              ></View>
            </View>

            {/* Footer del Modal */}
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginTop: "3%",
                marginBottom: "2%",
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  switchModal();
                }}
              >
                <Text style={styles.buttonTextStyle}>Volver</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : (
        <Modal
          coverScreen={true}
          hasBackdrop={true}
          isVisible={showDetallePendienteModal}
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          backdropTransitionOutTiming={0}
          avoidKeyboard={false}
          onBackdropPress={() => {
            setShowDetallePendienteModal(!showDetallePendienteModal);
          }}
        >
          {/* Contenido del Modal */}
          <View style={styles.modalView}>
            {/* Header del Modal */}
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => {
                  setShowDetallePendienteModal(!showDetallePendienteModal);
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
              <View />
            </View>
            {/* Body de Modal */}
            <View style={styles.modalBody}>
              {/* Titulo del Modal */}
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  marginVertical: 10,
                }}
              >
                Detalles Del Pendiente
              </Text>

              {/* Linea separadora */}
              <View
                style={{
                  marginVertical: 10,
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              />

              {/* Contenido */}
              <View style={{ flexDirection: "row" }}>
                {/* Columna 1 */}
                <View style={{ width: "50%" }}>
                  <Text style={styles.label}>
                    Titulo: {detallePendiente.titulo}
                  </Text>
                  <Text style={styles.label}>
                    Fecha: {detallePendiente.fecha}
                  </Text>
                  <Text style={styles.label}>
                    Topico: {detallePendiente.topico}
                  </Text>
                  <Text style={styles.label}>
                    Tarea: {detallePendiente.tarea}{" "}
                  </Text>
                </View>
                {/* Columna 2 */}
                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    alignSelf: "center",
                    justifyContent: "space-between",
                    marginBottom: "1%",
                  }}
                >
                  {/* Editar */}
                  <TouchableOpacity
                    style={{ marginStart: "40%" }}
                    onPress={() => {
                      switchModal();
                    }}
                  >
                    <Image
                      style={{ height: 28, width: 28 }}
                      source={require("../../assets/icons/eye.png")}
                    />
                  </TouchableOpacity>
                  {/* Borrar */}
                  <TouchableOpacity
                    style={{ marginEnd: "20%" }}
                    onPress={() => {
                      alertaBorrar();
                    }}
                  >
                    <Image
                      style={{ height: 24, width: 24 }}
                      source={require("../../assets/icons/borrar.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Linea separadora */}
              <View
                style={{
                  marginVertical: 10,
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              />
            </View>
            {/* Footer */}
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginTop: "3%",
                marginBottom: "2%",
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setShowDetallePendienteModal(!showDetallePendienteModal);
                }}
              >
                <Text style={styles.buttonTextStyle}>Volver</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#4285f4",
    width: "39%",
  },
  buttonTextStyle: {
    color: "white",
    textAlign: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    padding: 10,
    alignSelf: "center",
    minHeight: "50%",
    width: "100%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 52,
  },
  modalBody: {
    width: "100%",
  },
  modalFooter: {
    marginTop: "3%",
    marginBottom: "2%",
    alignSelf: "center",
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
  label: {
    marginStart: "3%",
    fontSize: 18,
    textAlignVertical: "center",
  },

  textInput: {
    marginEnd: "5%",
    height: 40,
    width: "50%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    height: 100,
    textAlignVertical: "top",
  },
});

export default DetallePendienteModal;
