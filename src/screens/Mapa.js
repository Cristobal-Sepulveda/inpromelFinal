import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, {ProviderPropType, MAP_TYPES, PROVIDER_GOOGLE} from 'react-native-maps';
import { Provider } from 'react-redux';
import { getLocationPermissions, getCurrentLocation } from '../utils/location';
const Mapa = ({mapRef, coords}) => {
    return (
      <MapView ref={mapRef}
               style={styles.map}
               provider={PROVIDER_GOOGLE}
               showsUserLocation={true}
               showsMyLocationButton={false}
               mapType={MAP_TYPES.HYBRID}
               region={coords}
               initialRegion={coords}
               >
                 
      </MapView>
    )
};

Mapa.propTypes={
  provider: ProviderPropType,
}
const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      zIndex:-1,
    },
  });

export default Mapa;