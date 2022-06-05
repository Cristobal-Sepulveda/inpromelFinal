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
        color="grey"
      />
      <Text style={styles.textLabel}>{topicoName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textLabel: { paddingTop: 8 },
});

export default CustomRadioBox;
