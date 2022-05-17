import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions,} from 'react-native';
import Perfil from './Perfil';
import BottomBar from '../components/BottomBar';

const Home = () => {
    const [showPerfilModal, setShowPerfilModal] = useState(false);

    return(
        <>
            <View style={styles.body}>
                <Text style={{alignSelf:'center', position:'absolute', top:'50%'}}>HomeScreen</Text>
            </View>
            <BottomBar showPerfilModal={showPerfilModal} setShowPerfilModal={setShowPerfilModal}/>
            <Perfil showPerfilModal={showPerfilModal} setShowPerfilModal={setShowPerfilModal}/> 
        </>
    );
}

const styles = StyleSheet.create({
    body:{
        flexDirection:'column',
        backgroundColor:"#4285f4",
        minHeight: Math.round(Dimensions.get('window').height)-20
    },
});

export default Home;