import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, {ProviderPropType, MAP_TYPES} from 'react-native-maps';

const Mapa = ({coords}) => {
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                     mapType={MAP_TYPES.HYBRID}
                     region={coords}
                     initialRegion={coords}
                     showsUserLocation
                     showsMyLocationButton={false}>
            </MapView>
        </View>
    )
};

Mapa.propTypes={
  provider: ProviderPropType,
}
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

export default Mapa;