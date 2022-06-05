import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from "react-native";
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
  const [tituloAGuardar, setTituloAGuardar] = useState("");
  const [fechaAGuardar, setFechaAGuardar] = useState("");
  const [topicoAGuardar, setTopicoAGuardar] = useState("");
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
      return;
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
    <Modal visible={showDetallePendienteModal} animationType={"fade"}>
      {/* Contenido del Modal */}
      <View style={styles.modalView}>
        {/* Header del Modal */}
        <View style={styles.modalHeader}>
          <View />
        </View>
        {/* Body del Modal */}
        <View style={styles.modalBody}>
          {/* CABECERA */}
          <View
            style={{
              backgroundColor: "#4285f4",
              paddingVertical: 20,
              paddingHorizontal: "5%",
              marginBottom: "10%",
              marginTop: "-1%",
              marginHorizontal: "2.5%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowDetallePendienteModal(!showDetallePendienteModal);
              }}
            >
              <Image
                style={{}}
                source={require("../../assets/icons/flechaDetalle.png")}
              />
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 20,
                fontWeight: "400",
                color: "white",
              }}
            >
              Detalle del Pendiente
            </Text>
            <TouchableOpacity
              onPress={() => {
                alertaBorrar();
              }}
            >
              <Image
                style={{}}
                source={require("../../assets/icons/delete.png")}
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
          />
          {/* Contenido */}
          {/* Titulo del Pendiente */}
          <TextInput
            style={{
              width: "100%",
              fontSize: 20,
              marginVertical: "2%",
              marginStart: "3%",
            }}
            defaultValue={detallePendiente.titulo}
            placeholderTextColor="black"
            onChangeText={setTituloAGuardar}
            multiline={true}
            maxLength={100}
          />
          {/* Fecha */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              marginVertical: "2%",
              marginStart: "2.5%",
            }}
          >
            <Image source={require("../../assets/icons/calendar.png")} />
            <Text
              style={{
                color: "grey",
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 20,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
            >
              {detallePendiente.fecha}
            </Text>
          </View>
          {/* Topico */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              marginVertical: "2%",
              marginStart: "2.5%",
            }}
          >
            <Image source={require("../../assets/icons/topic.png")} />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <CustomRadioBox
                topicoName={"Urgente"}
                topicoChecked={topicoAGuardar}
                setTopicoChecked={setTopicoAGuardar}
              />
              <CustomRadioBox
                topicoName={"Planificada"}
                topicoChecked={topicoAGuardar}
                setTopicoChecked={setTopicoAGuardar}
              />
              <CustomRadioBox
                topicoName={"No Urgente"}
                topicoChecked={topicoAGuardar}
                setTopicoChecked={setTopicoAGuardar}
              />
            </View>
          </View>
          {/* Tarea */}
          <View
            style={{
              width: "100%",
              marginTop: 8,
            }}
          >
            <Text style={{ ...styles.label, width: "30%" }}>
              Edite la Tarea:
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "grey",
                padding: 10,
                marginStart: "2%",
                height: 200,
              }}
              defaultValue={detallePendiente.tarea}
              placeholderTextColor="black"
              onChangeText={setTareaAGuardar}
              multiline={true}
              maxLength={100}
            />
          </View>
        </View>

        {/* Footer del Modal */}
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginTop: "3%",
            marginBottom: "2%",
            zIndex: 10,
            position: "absolute",
            bottom: "5%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{ ...styles.button, marginStart: "5%" }}
            onPress={() => {
              setShowDetallePendienteModal(!showDetallePendienteModal);
            }}
          >
            <Text style={styles.buttonTextStyle}>Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.button, marginEnd: "5%" }}
            onPress={() => {
              setShowDetallePendienteModal(!showDetallePendienteModal);
            }}
          >
            <Text style={styles.buttonTextStyle}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    padding: 10,
    alignSelf: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f6",
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
    fontSize: 15,
    color: "grey",
  },

  textInput: {
    padding: 8,
    height: "55%",
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
  borrarPendiente: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 15,
    marginRight: 15,
  },
});

export default DetallePendienteModal;
