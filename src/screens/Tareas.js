import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';

const Tareas = ({isBottomSheetFullOpen}) => {
    


    useEffect(() => {

    },[])

    /** Layout */
    return(
        <View>

            {isBottomSheetFullOpen?(
                <>
                <View style={{flexDirection:'row', justifyContent:'space-around',width:'100%'}}>
                    <Image style={{width:25, height: 10}}source={require('../../assets/icons/flechaAbajo.png')}/>
                    <View></View>
                    <View></View>
                    <View></View>
                    <View style={styles.lineSheets} />
                    <View></View>
                    <View></View>
                    <View></View>
                    <Image style={{width:25, height: 10}}source={require('../../assets/icons/flechaAbajo.png')}/>
                </View>

                    <Text style={{alignSelf:'center', marginTop:20}}>HELLO WORLD</Text>
                    <Text>Modulo 1</Text>
                </>
            ):(
                <>
                    <View style={{flexDirection:'row', justifyContent:'space-around',width:'100%'}}>
                        <Image style={{width:25, height: 10}}source={require('../../assets/icons/flechaArriba.png')}/>
                        <View></View>
                        <View></View>
                        <View></View>
                        <View style={styles.lineSheets} />
                        <View></View>
                        <View></View>
                        <View></View>
                        <Image style={{width:25, height: 10}}source={require('../../assets/icons/flechaArriba.png')}/>
                    </View>

                        <Text style={{alignSelf:'center', marginTop:20}}>HELLO WORLD</Text>
                        <Text>Modulo 1</Text>
                    </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    lineSheets: {
        borderTopColor: '#E5E5E5',
        borderTopWidth: 6,
        borderRadius: 5,
        width: '25%',
      },
});
export default Tareas;