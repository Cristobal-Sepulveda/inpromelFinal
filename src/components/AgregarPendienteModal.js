import React, { useState } from "react";
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
import BotonesEnviarPedidoYVolver from "./BotonesEnviarPedidoYVolver";
import CustomRadioBox from "./CustomRadioBox";
import { insert_pendiente } from "../model/pendientes";

const AgregarPendienteModal = ({
  setFlatListItems,
  showAgregarPendienteModal,
  setShowAgregarPendienteModal,
}) => {
  const [titulo, setTitulo] = useState("");
  const [date, setDate] = useState(new Date());
  const [topicoChecked, setTopicoChecked] = useState("");
  const [tareaARealizar, setTareaARealizar] = useState("");
  const [inputBoxText, setInputBoxText] = useState("");

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  /** Esta funcion es enviada al componente BotonesEnviarPedidoYVolver
   *  y lo que hace es checkear que todos los campos hayan sido
   *  llenados antes de cerrar el Modal */
  const guardarPendiente = () => {
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

    /* Dado que se cumplen las condiciones, la funcion es ejecutada */
    insert_pendiente(titulo, date, topicoChecked, tareaARealizar);

    // setFlatListItems((prevData) => [
    //   ...prevData,
    //   {
    //     titulo: titulo,
    //     topicoChecked: topicoChecked,
    //     date: date,
    //     tareaARealizar: tareaARealizar,
    //   },
    // ]);
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
          <Text style={{ textAlign: "center", marginBottom: 8 }}>
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
                }}
              >
                Ingrese Título{" "}
              </Text>
              <Text
                style={{
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
              topicoName={"Tópico 1"}
              topicoChecked={topicoChecked}
              setTopicoChecked={setTopicoChecked}
            />
            <CustomRadioBox
              topicoName={"Tópico 2"}
              topicoChecked={topicoChecked}
              setTopicoChecked={setTopicoChecked}
            />
            <CustomRadioBox
              topicoName={"Tópico 3"}
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
          <BotonesEnviarPedidoYVolver
            guardarPendiente={guardarPendiente}
            showAgregarPendienteModal={showAgregarPendienteModal}
            setShowAgregarPendienteModal={setShowAgregarPendienteModal}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default AgregarPendienteModal;
