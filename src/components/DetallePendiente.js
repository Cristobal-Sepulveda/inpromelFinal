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
import { editar_pendiente, select_pendientes } from "../model/pendientes";
import CustomRadioBox from "./CustomRadioBox";
import DateTimePicker from "@react-native-community/datetimepicker";

const DetallePendiente = ({
  setShowDetallePendiente,
  detallePendiente,
  flatListItems,
  setFlatListItems,
}) => {
  const [tituloAGuardar, setTituloAGuardar] = useState("");
  const [topicoAGuardar, setTopicoAGuardar] = useState("");
  const [tareaAGuardar, setTareaAGuardar] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateClickeado, setDateClickeado] = useState(false);

  useEffect(() => {
    setTopicoAGuardar(detallePendiente.topico);
    setTareaAGuardar(detallePendiente.tarea);
    setTituloAGuardar(detallePendiente.titulo);
    setDate(new Date(detallePendiente.fecha));
  }, []);

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
    try {
      await editar_pendiente(
        tituloAGuardar,
        date.toString().slice(0, 15),
        topicoAGuardar,
        tareaAGuardar,
        aux.id_pendiente
      );
    } catch (e) {
      console.log(e.message);
      return;
    }

    const pendientes = await select_pendientes();
    const aux2 = pendientes.rows._array;
    console.log(flatListItems);
    for (let i = 0; i < aux2.length; i++) {
      setFlatListItems((prevData) => [...prevData, JSON.stringify(aux2[i])]);
    }
    setShowDetallePendiente(false);
  };

  const guardarCambios = () => {
    alertaEditar(date.toLocaleDateString());
  };
  const alertaEditar = () => {
    console.log(tituloAGuardar, detallePendiente.titulo);
    console.log(tareaAGuardar, detallePendiente.tarea);
    console.log(topicoAGuardar, detallePendiente.topico);
    console.log(date.toLocaleDateString(), detallePendiente.fecha);
    if (
      tituloAGuardar === detallePendiente.titulo &&
      tareaAGuardar === detallePendiente.tarea &&
      topicoAGuardar === detallePendiente.topico &&
      date.toLocaleDateString() === detallePendiente.fecha
    ) {
      Alert.alert("Aviso", "No hay cambios para guardar.");
    } else {
      Alert.alert("Aviso", "¿Estas seguro que quieres editar este pendiente?", [
        { text: "Cancelar", onPress: () => {} },
        {
          text: "Confirmar",
          onPress: () => {
            editarPendiente();
          },
        },
      ]);
    }
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
                {date.toLocaleDateString()}
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

      {/* FAB BUTTON */}
      <TouchableOpacity
        style={styles.fabButton2}
        onPress={() => {
          guardarCambios();
        }}
      >
        <Image source={require("../../assets/icons/save.png")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "81.27%",
    backgroundColor: "lightgrey",
    borderRadius: 10,
    marginTop: "2.7%",
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
  fabButton2: {
    flex: 1,
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 10.5,
    bottom: 88.5,
    backgroundColor: "#4285f4",
    borderRadius: 50,
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

export default DetallePendiente;
