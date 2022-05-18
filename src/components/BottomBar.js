import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Perfil from '../screens/Perfil'
import { connect } from 'react-redux';


const BottomBar = ({showPerfilModal, setShowPerfilModal, setShowHome, redux}) => {
  const [isFocusedHome, setIsFocusedHome] = useState(true);
  const [isFocusedMap, setIsFocusedMap] = useState(false);
  const [isFocusedTareas, setIsFocusedTareas] = useState(false);
  const bottomBarOptions = ['Home', 'Mapa', 'Tareas','Perfil'];

  const BottomBarItem = ({ image, text, onPress }) => {
    return (
      <>
        <TouchableOpacity style={{ alignItems: 'center',  borderRadius: 10,paddingVertical:4, width:50}}
                          onPress={() => onPress(text)}>
            <Image style={{ width: 22, height: 22,  }} source={image} />
        </TouchableOpacity>
      </>
    );
  };
  // backgroundColor:'#90baff'


  return (
    <>
    <View>
      <View style={styles.bottombar}>
        {bottomBarOptions.map((route, index) => {
          const imageSource = () => {
            if (route === 'Home' && isFocusedHome) {
              return require('../../assets/icons/home_black.png');
            } else if (route === 'Home' && !isFocusedHome) {
              return require('../../assets/icons/home_white.png');

            } else if (route === 'Mapa' && isFocusedMap) {
              return require('../../assets/icons/map_black.png');
            } else if (route === 'Mapa' && !isFocusedMap) {
              return require('../../assets/icons/map_white.png');

            } else if (route === 'Tareas' && isFocusedTareas) {
              return require('../../assets/icons/task_black.png');
            } else if (route === 'Tareas' && !isFocusedTareas) {
              return require('../../assets/icons/task_white.png');
              
            } else if (route === 'Perfil' && showPerfilModal) {
              return require('../../assets/icons/perfil_black.png');
            } else if (route === 'Perfil' && !showPerfilModal) {
              return require('../../assets/icons/perfil_white.png');
            }
          };

          const onPress = () => {
            if (route === 'Home'){
              setIsFocusedHome(true);
              setIsFocusedMap(false);
              setIsFocusedTareas(false);
              setShowPerfilModal(false);
              setShowHome(true);
            } else if (route === 'Mapa'){
              setIsFocusedHome(false);
              setIsFocusedMap(true);
              setIsFocusedTareas(false);
              setShowPerfilModal(false);
              setShowHome(false);
            } else if (route === 'Tareas'){
              setIsFocusedHome(false);
              setIsFocusedMap(false);
              setIsFocusedTareas(true);
              setShowPerfilModal(false);
            } else if (route === 'Perfil') {
              setIsFocusedHome(false);
              setIsFocusedMap(false);
              setIsFocusedTareas(false);
              setShowPerfilModal(true);
            }
          };
          
          return (
            <>
            <View key={index}>
              <BottomBarItem
                image={imageSource()}
                text={route}
                onPress={onPress}
              />
              <Text style={{ fontSize: 12, textAlign:'center' }}>{route}</Text>
            </View>
            </>
          );
        })}

      </View>

      
    </View>
    </>
  )
};

const styles = StyleSheet.create({
  activity: { paddingVertical: 80 },
  bottombar: {
    backgroundColor: '#f6f6f6',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width:'100%',
    zIndex: 1000,
  },
  snackBar: {
    bottom: 80,
    alignSelf: 'center',
    width: 211,
    backgroundColor: '#696969',
    borderRadius: 30,
  },
  bodyClimasense: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 12,
    height: '100%',
  },
});

const mapStateToProps = state => {
  return { redux: state };
};

const mapDispatchToProps = dispatch => ({

});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(BottomBar);
