import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import CustomRadioBox from "./CustomRadioBox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { connect, useSelector } from "react-redux";
import * as Types from "../store/actions/types";
import CambiarValorModal from "../components/CambiarValorModal";

const DetallePendiente = ({
  redux,
  tareaAGuardar,
  tituloAGuardar,
  detallePendiente,
  setDetallePendiente,
  setTituloAGuardar,
  setTareaAGuardar,
  setTopicoAGuardar,
  topicoAGuardar,
  insertNuevaFecha,
}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateClickeado, setDateClickeado] = useState(false);
  const [valorFechaEnLayout, setValorFechaEnLayout] = useState("");
  const [showCambiarValorModal, setShowCambiarValorModal] = useState(false);
  const [esElTitulo, setEsElTitulo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTituloAGuardar(detallePendiente.titulo);
    setTareaAGuardar(detallePendiente.tarea);
    setTopicoAGuardar(detallePendiente.topico);
    setDate(new Date(detallePendiente.fecha));
    insertNuevaFecha(detallePendiente.fecha);
    setValorFechaEnLayout(redux.nueva_fecha);
    setIsLoading(false);
  }, []);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (event.type === "set") {
      setDateClickeado(true);
      insertNuevaFecha(selectedDate.toLocaleDateString());
      setValorFechaEnLayout(redux.nueva_fecha);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode("currentMode");
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const verNuevaFecha = () => {
    console.log("nueva_fecha: ", redux.nueva_fecha);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{ marginTop: "80%", alignContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          {/* HEADER */}
          {/* NO HAY HEADER */}
          {/* BODY*/}
          <View style={styles.body}>
            {/* Titulo */}
            <TouchableOpacity
              onPress={() => {
                setEsElTitulo(true);
                setShowCambiarValorModal(true);
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  marginTop: "6%",
                  color: "#4285f4",
                  alignSelf: "center",
                }}
              >
                {tituloAGuardar}
              </Text>
            </TouchableOpacity>
            {/* Topico */}
            <View style={{ ...styles.row, width: "22%", marginTop: "10%" }}>
              <Image
                style={{ marginEnd: 1 }}
                source={require("../../assets/icons/topic.png")}
              />
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
            <View style={styles.row}>
              <Image source={require("../../assets/icons/calendar.png")} />
              <TouchableOpacity
                style={{ marginStart: "3.5%" }}
                onPress={() => {
                  showDatepicker();
                }}
              >
                <Text
                  style={{
                    color: "black",
                    borderWidth: 1.5,
                    borderColor: "black",
                    borderRadius: 20,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}
                >
                  {valorFechaEnLayout}
                </Text>
              </TouchableOpacity>
            </View>
            {/* Descripcion */}
            <View
              style={{
                width: "71%",
                flexDirection: "row",
                marginVertical: "2%",
                marginStart: "1%",
              }}
            >
              <Image
                style={{ marginVertical: "3.5%" }}
                source={require("../../assets/icons/edit.png")}
              />
              <TouchableOpacity
                style={{
                  paddingVertical: 9,
                  paddingHorizontal: 12,
                  marginStart: "3.75%",
                  width: "95%",
                  maxHeight: "525%",
                  borderWidth: 1.5,
                  borderColor: "black",
                }}
                onPress={() => {
                  setEsElTitulo(false);
                  setShowCambiarValorModal(true);
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "black",
                  }}
                >
                  {tareaAGuardar}
                </Text>
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
          <CambiarValorModal
            esElTitulo={esElTitulo}
            setEsElTitulo={setEsElTitulo}
            showCambiarValorModal={showCambiarValorModal}
            setShowCambiarValorModal={setShowCambiarValorModal}
            detallePendiente={detallePendiente}
            setDetallePendiente={setDetallePendiente}
            tareaAGuardar={tareaAGuardar}
            setTareaAGuardar={setTareaAGuardar}
            setTituloAGuardar={setTituloAGuardar}
            tituloAGuardar={tituloAGuardar}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "77.5%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  body: {
    height: "50%",
    width: "90%",
    marginStart: "auto",
    marginEnd: "auto",
  },
  row: {
    width: "71%",
    flexDirection: "row",
    marginVertical: "2%",
    marginStart: "1%",
    alignItems: "center",
  },

  footer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#4285f4",
    width: "30%",
    height: 40,
  },
  buttonTextStyle: {
    color: "white",
    textAlign: "center",
  },
});

const mapStateToProps = (state) => {
  return { redux: state };
};

const mapDispatchToProps = (dispatch) => ({
  insertNuevaFecha: (nuevaFecha) =>
    dispatch({
      type: Types.INSERT_NUEVA_FECHA,
      payload: { nuevaFecha },
    }),
  selectNuevaFecha: () =>
    dispatch({
      type: Types.SELECT_NUEVA_FECHA,
      payload: {},
    }),
});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(DetallePendiente);
