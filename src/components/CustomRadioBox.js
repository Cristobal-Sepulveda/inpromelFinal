import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { RadioButton } from 'react-native-paper';

const CustomRadioBox = ({topicoChecked, setTopicoChecked, topicoName}) => {

    return(
        <View style={{flexDirection: 'row'}}>
            <RadioButton  value={topicoName}
                          status={topicoChecked === topicoName ? 'checked' : 'unchecked'}
                          onPress={() => {setTopicoChecked(topicoName)}}
                          color= '#4285f4'/>
            <Text style={styles.textLabel}>{topicoName}</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    textLabel:{
        marginTop:'4%',
    },  
});

export default CustomRadioBox;