import React from "react";
import {View,Text, TextInput, StyleSheet} from "react-native";

//como trabajar con los hooks de una screen desde un componente
const CustomTextImput = ({word, hook, keyboardType, setHook}) =>{
    return(
        <View style ={{flexDirection:'row'}}>
            <Text style={styles.label}>{"Ingrese "+word+":"}</Text>
            <TextInput style={styles.textInput} placeholder={hook} keyboardType={keyboardType} onChangeText={setHook} />    
        </View>
    );
}

export default CustomTextImput;

const styles = StyleSheet.create({
    label: {
        marginTop:8,
    },

    textInput:{
        height: 40,
        marginStart:8,
        borderWidth: 1,
        borderRadius: 10,
        padding: 8
      }
})
