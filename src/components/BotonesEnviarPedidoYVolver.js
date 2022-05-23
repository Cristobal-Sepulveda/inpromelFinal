import React from "react";
import {View, TouchableOpacity, Text, StyleSheet} from "react-native"

/** Este componente es utilizado desde el componente Planilla, ubicado en ModalPlanilla.js */
const BotonesEnviarPedidoYVolver = ({guardarPendiente, showAgregarPendienteModal, setShowAgregarPendienteModal}) => {
    return(
      <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop:24}}>
        <TouchableOpacity
          style={{...styles.button, marginStart:40}}
          onPress={() => {guardarPendiente()} }>
          <Text style={styles.textStyle}>Enviar Pedido</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.button, marginEnd:40}}
          onPress={() => {setShowAgregarPendienteModal(!showAgregarPendienteModal)} }>
          <Text style={styles.textStyle}>Volver</Text>
        </TouchableOpacity>       
      </View>  )
}

export default BotonesEnviarPedidoYVolver

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
        width:109
      },
      textStyle: {
        color: 'white',
        textAlign:'center'
      },
})