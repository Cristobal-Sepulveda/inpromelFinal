import * as Location from "expo-location";

export const getLocationPermissions = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status === "granted") return true;
  else return false;
};

export const getCurrentLocation = async () => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: 4,
    });
    return coords;
  } catch (e) {
    console.log(e.message);
  }
};
