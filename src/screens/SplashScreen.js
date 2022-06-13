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

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#DDDDE1",
    justifyContent: "center",
    flex: 1,
  },
});

export default SplashScreen;
