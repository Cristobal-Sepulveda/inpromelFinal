import React, { useEffect, useState, useRef, createRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Modal from "react-native-modal";

const CambiarValorModal = ({
  esElTitulo,
  setEsElTitulo,
  showCambiarValorModal,
  setShowCambiarValorModal,
  setTituloAGuardar,
  tituloAGuardar,
  tareaAGuardar,
  setTareaAGuardar,
}) => {
  const [datoRespaldado, setDatoRespaldado] = useState("");
  useEffect(() => {
    if (esElTitulo) {
      console.log("estitulo");
      const aux = tituloAGuardar;
      setDatoRespaldado(aux);
    } else {
      console.log("noestitulo");
      const aux = tareaAGuardar;
      setDatoRespaldado(aux);
    }
  }, [esElTitulo]);

  const restaurarValor = () => {
    if (esElTitulo) {
      setTituloAGuardar(datoRespaldado);
      setShowCambiarValorModal(false);
      console.log("true");
    } else {
      setTareaAGuardar(datoRespaldado);
      setShowCambiarValorModal(false);
      console.log("false");
    }
  };
  return (
    <View>
      <Modal
        style={{ margin: 0 }}
        isVisible={showCambiarValorModal}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        hasBackdrop={true}
        onBackdropPress={() => {
          restaurarValor();
          setEsElTitulo(!esElTitulo);
        }}
        onShow={() => {}}
      >
        <View style={styles.modalContainer}>
          {esElTitulo ? (
            <>
              {/* Titulo */}
              <TextInput
                style={{
                  marginHorizontal: "4%",
                  marginTop: "2%",
                  color: "#4285f4",
                }}
                defaultValue={tituloAGuardar}
                placeholderTextColor="#4285f4"
                onChangeText={setTituloAGuardar}
                multiline={true}
              />
            </>
          ) : (
            <>
              {/* Tarea */}
              <TextInput
                style={{
                  marginHorizontal: "4%",
                  marginTop: "2%",
                  color: "#4285f4",
                }}
                defaultValue={tareaAGuardar}
                placeholderTextColor="#4285f4"
                onChangeText={setTareaAGuardar}
                multiline={true}
              />
            </>
          )}
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{
                marginVertical: "3%",
                marginEnd: "6%",
              }}
              onPress={() => {
                setEsElTitulo(!esElTitulo);
                restaurarValor();
              }}
            >
              <Text
                style={{
                  color: "grey",
                  alignSelf: "flex-end",
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginVertical: "3%",
                marginEnd: "6%",
              }}
              onPress={() => {
                setEsElTitulo(!esElTitulo);
                setShowCambiarValorModal(false);
              }}
            >
              <Text
                style={{
                  color: "grey",
                  alignSelf: "flex-end",
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
});

export default CambiarValorModal;
