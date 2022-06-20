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
} from "react-native";
import CustomRadioBox from "./CustomRadioBox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { connect, useSelector } from "react-redux";
import * as Types from "../store/actions/types";

const DetallePendiente = ({
  redux,
  detallePendiente,
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

  useEffect(() => {
    setTituloAGuardar(detallePendiente.titulo);
    setTareaAGuardar(detallePendiente.tarea);
    setTopicoAGuardar(detallePendiente.topico);
    setDate(new Date(detallePendiente.fecha));
    insertNuevaFecha(detallePendiente.fecha);
    setValorFechaEnLayout(redux.nueva_fecha);
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
      {/* HEADER */}
      {/* NO HAY HEADER */}
      {/* BODY*/}
      <View style={styles.body}>
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
        {/* Descripcion */}
        <View style={styles.row}>
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
        <View style={{ ...styles.row }}>
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
        <View style={styles.row}>
          <Image source={require("../../assets/icons/calendar.png")} />
          <TouchableOpacity
            style={{ marginStart: "2.5%" }}
            onPress={() => {
              showDatepicker();
            }}
          >
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
              {valorFechaEnLayout}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Botones para ver nueva_fecha de redux */}
        {/* <View>
          <Button
            title="ver nueva_fecha"
            onPress={() => {
              verNuevaFecha();
            }}
          />
        </View> */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "79%",
    backgroundColor: "lightgrey",
    borderRadius: 10,
  },
  body: {
    height: "50%",
    width: "90%",
    marginStart: "auto",
    marginEnd: "auto",
  },
  row: {
    width: "80%",
    flexDirection: "row",
    marginVertical: "2%",
    marginStart: "1%",
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
