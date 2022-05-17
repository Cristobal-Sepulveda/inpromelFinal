import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Alert} from 'react-native';
import Modal from 'react-native-modal';
import BottomBar from '../components/BottomBar';
import { AuthContext } from '../context/context';
import { connect } from 'react-redux';




const Home = ({redux, wipeRedux}) => {
    const [showPerfilModal, setShowPerfilModal] = useState(false);
    const { signOut } = useContext(AuthContext);

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
    return(
        <>
            {/* Contenido de la Screen */}
            <View style={styles.body}>
                <Text style={{alignSelf:'center', position:'absolute', top:'50%'}}>HomeScreen</Text>
            </View>
            {/* BottomBar */}
            <BottomBar showPerfilModal={showPerfilModal} setShowPerfilModal={setShowPerfilModal}/>
            {/* Modal */}
            <View style={styles.centeredView}>
                <Modal
                    hasBackdrop={true}
                    isVisible={showPerfilModal}
                    animationIn={"fadeIn"}
                    animationOut={"fadeOut"}>
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
            
        </>
    );
}

const styles = StyleSheet.create({
    body:{
        flexDirection:'column',
        backgroundColor:"#4285f4",
        minHeight: Math.round(Dimensions.get('window').height)-20
    },
    centeredView: {
        flex: 1,
        marginTop: '15%',
        margin: '10%',
      },
    
      modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 60,
        elevation: 5,
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

const mapStateToProps = state => {
    return{redux : state};
}

const mapDispatchToProps = dispatch => ({
    wipeRedux: () =>
    dispatch({
      type: Types.WIPE_REDUX,
      payload: {},
    }),
});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Login);