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
  const [topicoChecked, setTopicoChecked] = useState("");
  const [tareaARealizar, setTareaARealizar] = useState("");
  const [elegirTopico, setElegirTopico] = useState(false);
  const [ingresarTarea, setIngresarTarea] = useState(false);
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
    if (titulo === "" || topicoChecked === "" || tareaARealizar === "") {
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
        style={{ margin: 0 }}
        isVisible={showAgregarPendienteModal}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        hasBackdrop={true}
        onBackdropPress={() => {
          setElegirTopico(false);
          setShowAgregarPendienteModal(!showAgregarPendienteModal);
        }}
      >
        <View style={styles.modalContainer}>
          {/* Body del BottomSheet */}
          {/* Ingrese Titulo */}
          <TextInput
            style={{ marginStart: "3%", marginTop: "2%", color: "#4285f4" }}
            placeholder="Ingrese Título del Pendiente"
            placeholderTextColor="#4285f4"
          />
          {/* Tarea */}
          {ingresarTarea ? (
            <View>
              <TextInput
                style={{ marginStart: "3%", marginTop: "2%" }}
                placeholder="Ingrese Descripción"
                placeholderTextColor="grey"
                multiline={true}
              />
            </View>
          ) : (
            <></>
          )}
          {/* RadioButtoms */}
          {elegirTopico ? (
            <View>
              <Text
                style={{
                  marginStart: "3%",
                  marginTop: "2%",
                  color: "grey",
                }}
              >
                Elija Categoría
              </Text>
              <View
                style={{
                  marginTop: "1%",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <View style={{ marginStart: "1%" }}>
                  <CustomRadioBox
                    topicoName={"Urgente"}
                    topicoChecked={topicoChecked}
                    setTopicoChecked={setTopicoChecked}
                  />
                </View>
                <CustomRadioBox
                  topicoName={"Planificada"}
                  topicoChecked={topicoChecked}
                  setTopicoChecked={setTopicoChecked}
                />
                <View style={{ marginEnd: "5%" }}>
                  <CustomRadioBox
                    topicoName={"No Urgente"}
                    topicoChecked={topicoChecked}
                    setTopicoChecked={setTopicoChecked}
                  />
                </View>
              </View>
            </View>
          ) : (
            <></>
          )}

          {/* Footbar del BottomSheet */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginStart: "3%",
              marginTop: "3%",
              marginBottom: "7%",
              justifyContent: "space-between",
            }}
          >
            {/* Tarea Button */}
            <TouchableOpacity
              onPress={() => {
                setIngresarTarea(true);
              }}
              style={{ marginStart: "1%", marginTop: "1.5%" }}
            >
              <Image source={require("../../assets/icons/edit.png")} />
            </TouchableOpacity>

            {/* Topic Button */}
            <TouchableOpacity
              style={{ marginStart: "-1.5%", marginTop: "0.6%" }}
              onPress={() => {
                setElegirTopico(true);
              }}
            >
              <Image
                style={{ height: 30, width: 30 }}
                source={require("../../assets/icons/topic.png")}
              />
            </TouchableOpacity>

            {/* Calendar Button */}
            <TouchableOpacity
              onPress={() => {
                showDatepicker();
              }}
              style={{ marginEnd: "60%", marginTop: "0.7%" }}
            >
              <Image
                style={{
                  height: 27,
                  width: 27,
                  marginTop: "5%",
                }}
                source={require("../../assets/icons/calendar.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                guardarPendiente();
              }}
            >
              <Text
                style={{
                  color: "grey",
                  fontSize: 18,
                  position: "absolute",
                  right: 50,
                  top: 3,
                }}
              >
                Guardar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
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
