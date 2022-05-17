import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions,TouchableWithoutFeedback} from 'react-native';
import BottomBar from '../components/BottomBar';

const Home = () => {

    return(
        <>
            <View style={styles.body}>
                <Text style={{alignSelf:'center', position:'absolute', top:'50%'}}>HomeScreen</Text>
            </View> 
        <BottomBar/>
        </>
    );
}

const styles = StyleSheet.create({
    body:{
        flexDirection:'column',
        backgroundColor:"#4285f4",
        minHeight: Math.round(Dimensions.get('window').height)-20
    }
    
})

export default Home;