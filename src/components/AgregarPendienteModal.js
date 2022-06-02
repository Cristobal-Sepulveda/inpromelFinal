import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import CustomDatePicker from "./CustomDatePicker";
import CustomRadioBox from "./CustomRadioBox";
import { insert_pendiente, select_pendientes } from "../model/pendientes";
import { connect } from "react-redux";
import * as Types from "../store/actions/types";

const AgregarPendienteModal = ({
  insertPendiente,
  showAgregarPendienteModal,
  setShowAgregarPendienteModal,
}) => {
  const [titulo, setTitulo] = useState("");
  const [date, setDate] = useState(new Date());
  const [datePicked, setDatePicked] = useState(false);
  const [topicoChecked, setTopicoChecked] = useState("");
  const [tareaARealizar, setTareaARealizar] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  /** Esta funcion es enviada al componente BotonesEnviarPedidoYVolver
   *  y lo que hace es checkear que todos los campos hayan sido
   *  llenados antes de cerrar el Modal */
  const guardarEnReduxYDB = async () => {
    insert_pendiente({
      titulo: titulo,
      fecha: date.toString().slice(4, 15),
      topico: topicoChecked,
      tarea: tareaARealizar,
    });
    insertPendiente(titulo, date, topicoChecked, tareaARealizar);
  };

  const limpiandoModal = () => {
    setTitulo("");
    setDate(new Date());
    setTopicoChecked("");
    setTareaARealizar("");
  };

  const guardarPendiente = async () => {
    // Primera condicionante de salida
    if (
      titulo === "" ||
      topicoChecked === "" ||
      date === "" ||
      tareaARealizar === ""
    ) {
      Alert.alert("Debes llenar todos los datos antes de guardar el pendiente");
      return;
    }
    guardarEnReduxYDB();
    limpiandoModal();
    setShowAgregarPendienteModal(false);
  };

  return (
    <View>
      <Modal
        coverScreen={true}
        hasBackdrop={true}
        isVisible={showAgregarPendienteModal}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        backdropTransitionOutTiming={0}
      >
        <View style={styles.modalView}>
          {/* Header del Modal */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => {
                setShowAgregarPendienteModal(false);
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

          {/* Body del Modal */}
          <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 8 }}>
            Agregar Pendiente
          </Text>
          {/* Columnas */}
          <View style={{ flexDirection: "row" }}>
            {/* Columna 1 */}
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  height: 40,
                  backgroundColor: "#071b75",
                  color: "white",
                  textAlignVertical: "center",
                  textAlign: "center",
                  height: 40,
                  backgroundColor: "#071b75",
                  color: "white",
                  textAlignVertical: "center",
                  textAlign: "center",
                  marginTop: "14%",
                }}
              >
                Seleccione Fecha Límite{" "}
              </Text>
            </View>

            {/* Columna 2 */}
            <View style={{ width: "50%" }}>
              <TextInput
                style={{ ...styles.textInput, marginStart: 8 }}
                placeholder="Título"
                keyboardType="default"
                onChangeText={setTitulo}
              />
              {/* datePicker */}
              <CustomDatePicker
                date={date}
                mode={mode}
                show={show}
                setDate={setDate}
                setShow={setShow}
                setMode={setMode}
                onPress={() => {
                  setDatePicked(true);
                }}
              />
              {/* radioButtons */}
            </View>
          </View>
          <Text
            style={{
              height: 40,
              backgroundColor: "#071b75",
              color: "white",
              textAlignVertical: "center",
              textAlign: "center",
              marginTop: "6%",
            }}
          >
            Seleccione Tópico
          </Text>
          <View
            style={{
              justifyContent: "space-between",
              marginTop: "3%",
              flexDirection: "row",
            }}
          >
            <CustomRadioBox
              topicoName={"Urgente"}
              topicoChecked={topicoChecked}
              setTopicoChecked={setTopicoChecked}
            />
            <CustomRadioBox
              topicoName={"Planificada"}
              topicoChecked={topicoChecked}
              setTopicoChecked={setTopicoChecked}
            />
            <CustomRadioBox
              topicoName={"No Urgente"}
              topicoChecked={topicoChecked}
              setTopicoChecked={setTopicoChecked}
            />
          </View>
          <Text
            style={{
              height: 40,
              backgroundColor: "#071b75",
              color: "white",
              textAlignVertical: "center",
              textAlign: "center",
              marginTop: "3%",
            }}
          >
            Ingrese Tarea
          </Text>
          <TextInput
            style={{ ...styles.textInput, marginTop: 16, height: "25%" }}
            multiline={true}
            placeholder="Tarea a realizar"
            keyboardType="default"
            onChangeText={setTareaARealizar}
          />

          {/* FootBar del Modal */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 24,
            }}
          >
            <TouchableOpacity
              style={{ ...styles.button, marginStart: 30, width: 140 }}
              onPress={() => {
                guardarPendiente();
              }}
            >
              <Text style={styles.textStyle}>Guardar Pendiente</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.button, marginEnd: 30 }}
              onPress={() => {
                setShowAgregarPendienteModal(!showAgregarPendienteModal);
              }}
            >
              <Text style={styles.textStyle}>Volver</Text>
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
  textStyle: {
    color: "white",
    textAlign: "center",
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
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
  modalBody: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  insertPendiente: (titulo, fecha, topico, tarea) =>
    dispatch({
      type: Types.INSERT_PENDIENTE,
      payload: { titulo, fecha, topico, tarea },
    }),
});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(AgregarPendienteModal);
