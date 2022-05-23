import React from "react"
import {View, Text, StyleSheet} from "react-native"
import CheckBox from 'expo-checkbox';

//como trabajar con los hooks de una screen desde un componente
const CustomCheckBox = ({label, topicoChecked, setTopicoChecked}) => {
    return(
        <View style={styles.checkboxTextRow}>
            <CheckBox
                value={topicoChecked}
                onValueChange={setTopicoChecked}
                color={topicoChecked? '#4630EB' : undefined}
            />
            <Text style={styles.checkboxText}>{label}</Text>
        </View>
    )
}

export default CustomCheckBox

const styles = StyleSheet.create({
    checkboxTextRow:{
        flexDirection: 'row',
        marginBottom: 8
    },
    checkboxText:{
        marginLeft: 8
    }
})