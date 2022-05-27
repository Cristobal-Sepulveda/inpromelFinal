import React from 'react';
import {View, Button, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';



const CustomDatePicker = ({date, mode, show, setDate, setShow, setMode}) => {
    
    const onChange = (event, selectedDate) => {
        console.log(selectedDate)
        setShow(false)
        const currentDate = selectedDate
        setDate(currentDate)
    }
    
    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }
    
    const showDatepicker = () => {
        showMode('date')
    }

    return(
        <View>
            <View style={{marginTop: 24, width:'90%', marginStart:'auto', marginEnd:'auto'}}>
                <TouchableOpacity onPress={showDatepicker}>
                    <Text style={{height:40, backgroundColor:'#4285f4', fontSize:11,textAlign:'center', textAlignVertical:'center', color:'white', borderRadius:18}}>Haga click para elegir fecha</Text>
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}/>
            )}
        </View>
    )
}

export default CustomDatePicker

