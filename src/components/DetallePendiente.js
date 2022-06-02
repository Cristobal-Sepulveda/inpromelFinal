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
              alignSelf: "center",
              width: "100%",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 20, marginBottom: 8 }}
            >
              Detalles Del Pendiente
            </Text>
            <View
              style={{
                flexDirection: "row",
                height: "10%",
                marginVertical: 10,
                justifyContent: "center",
              }}
            >
              <Text style={styles.label}>Titulo</Text>
              <Text style={styles.labelContent}>{detallePendiente.titulo}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: "10%",
                marginVertical: 10,
                justifyContent: "center",
              }}
            >
              <Text style={styles.label}>Fecha</Text>
              <Text style={styles.labelContent}>{detallePendiente.fecha}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: "10%",
                marginVertical: 10,
                justifyContent: "center",
              }}
            >
              <Text style={styles.label}>Topico</Text>
              <Text style={styles.labelContent}>{detallePendiente.topico}</Text>
            </View>
            <Text style={styles.label}>Tarea</Text>
            <TextInput
              style={styles.textInput}
              placeholder={detallePendiente.tarea}
              keyboardType="default"
              onChangeText={setTareaAGuardar}
            />
          </View>
          {/* Footer */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              position: "absolute",
              bottom: "5%",
              left: "3%",
            }}
          >
            {/* Volver */}
            <TouchableOpacity
              style={{
                backgroundColor: "#4285f4",
                height: 40,
                width: "20%",
                marginStart: "5%",
                borderRadius: 5,
              }}
              onPress={() => {
                setShowDetallePendienteModal(!showDetallePendienteModal);
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                Volver
              </Text>
            </TouchableOpacity>
            {/* Editar */}
            <TouchableOpacity
              style={{
                backgroundColor: "#4285f4",
                height: 40,
                width: "20%",
                borderRadius: 5,
              }}
              onPress={() => {
                alertaEditar();
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                Editar
              </Text>
            </TouchableOpacity>
            {/* Borrar */}
            <TouchableOpacity
              style={{
                backgroundColor: "#4285f4",
                height: 40,
                width: "20%",
                marginEnd: "5%",
                borderRadius: 5,
              }}
              onPress={() => {
                alertaBorrar();
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                Borrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    padding: 10,
    height: "80%",
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
    color: "white",
    fontSize: 25,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#071b75",
  },
  labelContent: {
    backgroundColor: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginStart: 8,
    marginVertical: 10,
  },
});

export default DetallePendienteModal;
