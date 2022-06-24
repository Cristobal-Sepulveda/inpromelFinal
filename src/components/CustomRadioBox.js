import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

const CustomRadioBox = ({ topicoChecked, setTopicoChecked, topicoName }) => {
  return (
    <View style={{ flexDirection: "row", alignContent: "center" }}>
      <RadioButton
        value={topicoName}
        status={topicoChecked === topicoName ? "checked" : "unchecked"}
        onPress={() => {
          setTopicoChecked(topicoName);
        }}
        // color="#4285f4"
        color="#0f0f0f"
      />
      <Text style={styles.textLabel}>{topicoName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textLabel: { paddingTop: 8, fontSize: 12 },
});

export default CustomRadioBox;
