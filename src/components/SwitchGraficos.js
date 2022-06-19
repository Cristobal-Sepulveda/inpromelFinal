import CheckBoxWithRef from "@react-native-community/checkbox/dist/CheckBox.android";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SwitchSelector from "react-native-switch-selector";
//configuracion switch de biosense

const SwitchGraficos = ({ setGraficoEnBarra, graficoEnBarra }) => {
  const [graficoEnPantalla, setGraficoEnPantalla] = useState(true);

  const checkeandoClick = (value) => {
    console.log(value);
    if (value !== graficoEnPantalla) {
      setGraficoEnPantalla(value);
      setGraficoEnBarra(!graficoEnBarra);
    }
  };

  return (
    <View style={styles.switch}>
      <SwitchSelector
        initial={0}
        // onPress={() => setGraficoEnBarra(!graficoEnBarra)}
        onPress={(value) => {
          checkeandoClick(value);
        }}
        height={32}
        fontSize={12}
        textColor={"white"}
        selectedColor={"white"}
        buttonColor={"#4285f4"}
        backgroundColor={"#353b48"}
        //hasPadding
        options={[
          {
            label: "Gráfico de Barras",
            value: true,
          },
          { label: "Gráfico de Lineal", value: false },
        ]}
        testID="gender-switch-selector"
        accessibilityLabel="gender-switch-selector"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switch: {
    alignSelf: "center",
    width: 273,
    height: 30,
  },
});

export default SwitchGraficos;
