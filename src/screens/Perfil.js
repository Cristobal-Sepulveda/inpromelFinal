import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal'
import { AuthContext } from '../context/context';
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';


const Perfil = ({showPerfilModal, setShowPerfilModal}) => {
  const { signOut } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [online, setOnline] = useState(true);

  const userIsOnline = () => {
    NetInfo.addEventListener(state => {
      if (state.isConnected && state.details.cellularGeneration === '3g' ||
          state.details.cellularGeneration === '4g' ||
          state.details.cellularGeneration === '5g' ||
          state.type === 'wifi'
      ) {
        setOnline(true);
      } else {
        setOnline(false);
      }
    });
  };

  const cerrarSesion = () => {
    Alert.alert('Aviso', 'Está por salir de su sesión, ¿Desea continuar?', [
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: () => {
          
        },
      },
      {
        text: 'Continuar',
        onPress: async () => {
          await signOut();
        },
      },
    ]);
  };

  useEffect(() => {
    userIsOnline();
  },[])

  return (
    <View style={styles.centeredView}>
      <Modal
        hasBackdrop={true}
        isVisible={showPerfilModal}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        backdropTransitionOutTiming={0} >
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={()=>{setShowPerfilModal(false)}}>
                <Image style={styles.cerrarModal} source={require("../../assets/icons/cerrar.png")}/>
              </TouchableOpacity>
              <Image style={styles.imagenHeader} source={require("../../assets/LogoInpromel.png")}/>
              <TouchableOpacity onPress={cerrarSesion}>
                <Image  style={styles.cerrarSesion}source={require('../../assets/icons/cerrar_sesion.png')}/>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalText}>Hello World!</Text>
            </View>
          </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: '15%',
    margin: '10%',
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
  },

  
  modalHeader:{
     flexDirection: 'row', 
     justifyContent: 'space-between',
     height:52,
     padding:10,
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
  cerrarSesion:{
    width:24, 
    height:24,
    position:'absolute',
    top:0,
    right:0,
    marginTop:15,
    marginRight:15,
  },
  modalBody:{
    padding:10,
    height:'60%',
    marginTop:20,
  }

});




const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  deleteSession: token =>
    dispatch({
      type: Types.DELETE_SESSION,
      payload: {
        token,
      },
    }),
});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Perfil);
