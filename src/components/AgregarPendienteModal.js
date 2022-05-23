import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import CustomDatePicker from './CustomDatePicker';
import CustomTextImput from './CustomTextImput';
import CustomCheckBox from './CustomCheckBox';
import BotonesEnviarPedidoYVolver from './BotonesEnviarPedidoYVolver';


const AgregarPendienteModal = ({showAgregarPendienteModal, setShowAgregarPendienteModal}) => {
    const [titulo, setTitulo] = useState("");
    const [tareaARealizar, setTareaARealizar] = useState("");
    const [topicoUnoChecked, setTopicoUnoChecked] = useState(false);
    const [topicoDosChecked, setTopicoDosChecked] = useState(false);
    const [topicoTresChecked, setTopicoTresChecked] = useState(false);
    const [inputBoxText, setInputBoxText] = useState("");
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const guardarPendiente = () => {

    }

    return(
        <View>
        <Modal
          coverScreen={true}
          hasBackdrop={true}
          isVisible={showAgregarPendienteModal}
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          backdropTransitionOutTiming={0} >
            <View style={styles.modalView}>
              
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={()=>{setShowAgregarPendienteModal(false)}}>
                  <Image style={styles.cerrarModal} source={require("../../assets/icons/cerrar.png")}/>
                </TouchableOpacity>
                <Image style={styles.imagenHeader} source={require("../../assets/LogoInpromel.png")}/>
                <View/>
              </View>

              <Text style={{textAlign:'center', marginBottom:8}}>Agregar Pendiente</Text>
              <View style={{flexDirection:'row'}}>
                <View style={{width:'50%'}}>
                  <Text style={{height: 40,backgroundColor:'blue', color:'white', textAlignVertical:'center', textAlign:'center'}}>Ingrese Título: </Text>
                  <Text style={{height: 40,backgroundColor:'blue', color:'white', textAlignVertical:'center', textAlign:'center', marginTop:24}}>Ingrese Fecha Límite: </Text>
                  <Text style={{height: 40,backgroundColor:'blue', color:'white', textAlignVertical:'center', textAlign:'center', marginTop:24}}>Asunto: </Text>
                  <Text style={{height: 40,backgroundColor:'blue', color:'white', textAlignVertical:'center', textAlign:'center', marginTop:60}}>Tarea a realizar: </Text>
                </View>
                <View style={{width:'50%'}}>
                  <TextInput style={styles.textInput} placeholder="Título" keyboardType="default" onChangeText={setTitulo} />   
                  <CustomDatePicker date={date} mode={mode} show={show} setShow={setShow} setMode={setMode}/> 
                  <View style={{justifyContent:'space-between',marginTop:24,marginStart:10}}>
                    <CustomCheckBox label="Tópico 1" topicoChecked={topicoUnoChecked} setTopicoChecked={setTopicoUnoChecked}/>
                    <CustomCheckBox label="Tópico 2" topicoChecked={topicoDosChecked} setTopicoChecked={setTopicoDosChecked}/>
                    <CustomCheckBox label="Tópico 3" topicoChecked={topicoTresChecked} setTopicoChecked={setTopicoTresChecked}/>
                </View>
                <TextInput style={{...styles.textInput, marginTop:16, height:200}} multiline={true} placeholder="Tarea a realizar" keyboardType="default" onChangeText={setTareaARealizar} />   

                </View>
              </View>
              

              <BotonesEnviarPedidoYVolver guardarPendiente={guardarPendiente} 
                                          showAgregarPendienteModal={showAgregarPendienteModal} 
                                          setShowAgregarPendienteModal={setShowAgregarPendienteModal}/>
            </View>

        </Modal>
      </View>
    );
}

const styles = StyleSheet.create({
  textInput:{
    height: 40,
    marginStart:8,
    borderWidth: 1,
    borderRadius: 10,
    padding: 8
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
    padding:10,
  },
  modalHeader:{
     flexDirection: 'row', 
     justifyContent: 'space-between',
     height:52,
  },
  cerrarModal:{
    width:24, 
    height:24,
    position:'absolute',
    top:0,
    left:0,
    marginTop:15,
    marginLeft:15,
  },
  imagenHeader:{
    width:150, 
    height: 40,
    marginTop:5
  },
  modalBody:{
    margin: 20,
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2,},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
}
});

export default AgregarPendienteModal;

