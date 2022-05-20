import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const Tareas = () => {
    

    useEffect(() => {

    },[])

    /** Layout */
    return(
        <View>
            <View style={styles.lineSheets} />
            <Text>HELLO WORLD</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    lineSheets: {
        borderTopColor: '#E5E5E5',
        borderTopWidth: 6,
        borderRadius: 5,
        width: 94,
        alignSelf: 'center',
      },
});
export default Tareas;