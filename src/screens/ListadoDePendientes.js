import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Image, Text} from 'react-native';
import AgregarPendienteModal
 from '../components/AgregarPendienteModal';
const ListadoDePendientes = ({}) => {
    const [flatListItems, setFlatListItems] = useState([]);
    const[isRefreshing, setIsRefreshing] = useState(true);
    const [showAgregarPendienteModal, setShowAgregarPendienteModal] = useState(false);
    const renderItem = ({ item }) =>{
        return (<View style={styles.item}>
                  <Text>{item}</Text>
                </View>)
    }

    //funcion iniciada al hacer sync en la flatList...
    const syncFlatList = async () => {
        console.log("syncFlatList")
        setIsRefreshing(false)
        const userConexionType = await obtenerTipoConexion()
        if(userConexionType.tipoConexion == "wifi"){
            return Alert.alert("lista sincronizada");
        }
        if(userConexionType.tipoConexion == "cellular"){
            if(userConexionType.connectionDetails == "4g"){
                return Alert.alert("lista sincronizada");
            } else {
                return Alert.alert("Tu conexion de celular debe ser 4g",
                                   "para poder sincronizar el listado");
            }      
        }
        return Alert.alert("Debes tener conexion a internet para poder",
                           "sincronizar el listado");
    }


    return(
        <>
            <View style={{ marginTop:'20%', width:"90%", marginStart:"auto", marginEnd:"auto"}}>
                <Text style={{textAlign:'center', fontSize:28, fontWeight:'400', marginBottom:24}}>Listado de Pendientes</Text>
                <FlatList data={flatListItems}
                          renderItem={renderItem}
                          keyExtractor={(item) => JSON.parse(item).key}
                          numColumns={1}
                          backgroundColor="#4285f4"
                          refreshing = {isRefreshing}
                          //onRefresh={syncFlatList}
                          ListHeaderComponent={(
                            <View style={{marginTop: 8, marginBottom:8}}>
                                <Text style={{textAlign:'center', color:'white'}}>PENDIENTES</Text>
                                <View style={{marginTop:8, borderBottomColor:'white', borderBottomWidth:1}}/>
                            </View>)
                          }
                          ListEmptyComponent={( 
                            <View style={{height:200}}>
                                <Text style={{marginTop: 80, textAlign:'center', color:'white'}}>No hay items para desplegar !</Text>
                            </View>)
                          }
                />
        </View>
        <TouchableOpacity style={styles.fabButton2} onPress={()=>{setShowAgregarPendienteModal(true)}}>
            <Image source={require("../../assets/icons/plus.png")}/>
        </TouchableOpacity>
        {/* Modal AgregarPendiente*/}
        <AgregarPendienteModal showAgregarPendienteModal={showAgregarPendienteModal}
                              setShowAgregarPendienteModal={setShowAgregarPendienteModal}
                              setFlatListItems={setFlatListItems}/>
        </>

            
    );
};

const styles = StyleSheet.create({
    fabButton2:{
        flex:1,
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 100,
        backgroundColor:"#4285f4",
        borderRadius:50,
      },
});

export default ListadoDePendientes