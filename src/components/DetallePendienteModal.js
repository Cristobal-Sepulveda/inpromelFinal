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
import DateTimePicker from "@react-native-community/datetimepicker";

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
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateClickeado, setDateClickeado] = useState(false);
  const onChange = (event, selectedDate) => {
    console.log(selectedDate);
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
          {/* Volver atras */}
          <TouchableOpacity
            onPress={() => {
              setDateClickeado(false);
              setShowDetallePendienteModal(!showDetallePendienteModal);
            }}
          >
            <Image
              style={{}}
              source={require("../../assets/icons/flechaDetalle.png")}
            />
          </TouchableOpacity>
          {/* Titulo */}
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              fontWeight: "400",
              color: "white",
              marginEnd: "2%",
            }}
          >
            Detalles
          </Text>
          <TouchableOpacity
            style={{ marginEnd: "5%" }}
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
        {/* Body del Modal */}
        <View style={styles.modalBody}>
          {/* Titulo */}
          <TextInput
            style={{
              fontSize: 25,
              marginTop: "6%",
              color: "#4285f4",
              alignSelf: "center",
            }}
            defaultValue={detallePendiente.titulo}
            placeholderTextColor="black"
            onChangeText={setTituloAGuardar}
            multiline={true}
            maxLength={100}
          />
          {/* Carta Con el contenido */}
          <View style={styles.modalCard}>
            {/* Descripcion */}
            <View style={styles.rowCard}>
              <Image
                style={{
                  marginTop: "4%",
                }}
                source={require("../../assets/icons/edit.png")}
              />
              <TextInput
                style={{
                  fontSize: 15,
                  paddingLeft: 10,
                  marginTop: 10,
                  marginStart: "2%",
                  width: "100%",
                }}
                defaultValue={detallePendiente.tarea}
                placeholderTextColor="black"
                onChangeText={setTareaAGuardar}
                multiline={true}
                maxLength={100}
              />
            </View>
            {/* Topico */}
            <View style={{ ...styles.rowCard }}>
              <Image source={require("../../assets/icons/topic.png")} />
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
            {/* Fecha */}
            <View style={styles.rowCard}>
              <Image source={require("../../assets/icons/calendar.png")} />
              <TouchableOpacity
                style={{ marginStart: "2.5%" }}
                onPress={() => {
                  showDatepicker();
                  setDateClickeado(true);
                }}
              >
                {dateClickeado ? (
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
                    {JSON.stringify(date).slice(1, 11)}
                  </Text>
                ) : (
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
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Footer del Modal */}
        <View style={styles.modalFooter}>
          <TouchableOpacity
            style={{ ...styles.button, marginStart: "2%" }}
            onPress={() => {
              setShowDetallePendienteModal(!showDetallePendienteModal);
            }}
          >
            <Text style={styles.buttonTextStyle}>Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.button, marginEnd: "2%" }}
            onPress={() => {
              setDateClickeado(false);
              setShowDetallePendienteModal(!showDetallePendienteModal);
            }}
          >
            <Text style={styles.buttonTextStyle}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* DateTimePicker */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f6",
  },
  modalHeader: {
    backgroundColor: "#4285f4",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginStart: "auto",
    marginEnd: "auto",
    marginTop: "14.5%",
    marginBottom: "8.2%",
    paddingVertical: 20,
    paddingHorizontal: "5%",
  },

  modalBody: {
    backgroundColor: "lightgrey",
    borderRadius: 10,
    height: "60.5%",
    width: "90%",
    marginStart: "auto",
    marginEnd: "auto",
    marginTop: "3%",
  },
  modalCard: {
    width: "90%",
    height: "70%",
    backgroundColor: "white",
    position: "absolute",
    top: "22%",
    alignSelf: "center",
    borderRadius: 10,
    padding: 10,
  },
  rowCard: {
    width: "80%",
    flexDirection: "row",
    marginVertical: "2%",
    marginStart: "1%",
  },
  modalFooter: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    position: "absolute",
    bottom: "4%",
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
  borrarPendiente: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 15,
    marginRight: 15,
  },
  label: {
    marginStart: "3%",
    fontSize: 15,
    color: "grey",
  },
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
});

export default DetallePendienteModal;
