import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { create_session_table, create_pendientes_table } from "../model";
import { delay } from "../utils/funciones";

const SplashScreen = () => {
  const crearTablas = async () => {
    await create_session_table();
    await create_pendientes_table();
  };
  useEffect(() => {
    crearTablas();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/gradient.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    flex: 1,
    marginBottom: "40%",
  },
  imagen: {
    width: "80%",
    height: 95,
    alignSelf: "center",
    resizeMode: "contain",
  },
});

export default SplashScreen;
