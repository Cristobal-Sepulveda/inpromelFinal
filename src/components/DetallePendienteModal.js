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

const DetallePendienteModal = ({
  showDetallePendienteModal,
  setShowDetallePendienteModal,
  detallePendiente,
  setDetallePendiente,
  flatListItems,
  setFlatListItems,
}) => {
  const [tareaAGuardar, setTareaAGuardar] = useState("");

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
    }

    const pendientes = await select_pendientes();
    const aux2 = pendientes.rows._array;
    console.log(aux2);
    for (let i = 0; i < aux2.length; i++) {
      setFlatListItems((prevData) => [...prevData, JSON.stringify(aux2[i])]);
    }
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
      <Modal
        coverScreen={true}
        hasBackdrop={true}
        isVisible={showDetallePendienteModal}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        backdropTransitionOutTiming={0}
        avoidKeyboard={true}
        onBackdropPress={() => {
          setShowDetallePendienteModal(!showDetallePendienteModal);
        }}
      >
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
          <View
            style={{
              width: "100%",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 20, marginVertical: 10 }}
            >
              Detalles Del Pendiente
            </Text>
            <View
              style={{
                marginVertical: 10,
                borderBottomColor: "black",
                borderBottomWidth: 1,
              }}
            />
            <Text style={styles.label}>Titulo: {detallePendiente.titulo}</Text>
            <Text style={styles.label}>Fecha: {detallePendiente.fecha}</Text>
            <Text style={styles.label}>Topico: {detallePendiente.topico}</Text>
            <View
              style={{
                marginVertical: 10,
                borderBottomColor: "black",
                borderBottomWidth: 1,
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  ...styles.label,
                  textAlign: "center",
                  marginVertical: 10,
                }}
              >
                Tarea:
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder={detallePendiente.tarea}
                placeholderTextColor="black"
                keyboardType="default"
                onChangeText={setTareaAGuardar}
              />
            </View>
          </View>
          {/* Footer */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 24,
            }}
          >
            {/* Volver */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setShowDetallePendienteModal(!showDetallePendienteModal);
              }}
            >
              <Text style={styles.buttonTextStyle}>Volver</Text>
            </TouchableOpacity>
            {/* Editar */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                alertaEditar();
              }}
            >
              <Text style={styles.buttonTextStyle}>Editar</Text>
            </TouchableOpacity>
            {/* Borrar */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                alertaBorrar();
              }}
            >
              <Text style={styles.buttonTextStyle}>Borrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#4285f4",
    width: 109,
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
    height: "65%",
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
  label: {
    fontSize: 18,
  },

  textInput: {
    height: 100,
    width: "70%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginStart: 8,
    marginVertical: 10,
  },
});

export default DetallePendienteModal;
