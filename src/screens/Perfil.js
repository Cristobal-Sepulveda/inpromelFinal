import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { AuthContext } from '../context/context';
import { ScrollView } from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';


const Perfil = ({showPerfilModal, setShowPerfilModal, setIsFocusedPerfil, deleteSession}) => {
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
  <View>
    <View style={styles.centeredView}>
      <Modal visible={showPerfilModal}
             transparent={false} 
             onDismiss={() => setShowPerfilModal(false)}>
        <ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={()=>{setShowPerfilModal(false);setIsFocusedPerfil(false)}}>
              <Image style={styles.cerrarModal} source={require("../../assets/icons/cerrar.png")}/>
            </TouchableOpacity>
            <Text style={styles.title}>Perfil</Text>
            <TouchableOpacity onPress={cerrarSesion}>
              <Image  style={styles.cerrarSesion}source={require('../../assets/icons/cerrar_sesion.png')}/>
            </TouchableOpacity>

          </View>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.list}>Lista de Predio</Text>
          </ScrollView>
      </Modal>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    borderRadius:5,
  },

  title: {
    fontSize: 24,
    marginTop:8,
    marginLeft:'auto',
    marginRight:'auto',
    
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
  cerrarSesion:{
    width:24, 
    height:24,
    position:'absolute',
    top:0,
    right:0,
    marginTop:15,
    marginRight:15,
  },
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
