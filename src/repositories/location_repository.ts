import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
  } from "expo-location";
  
  export class LocationRepository {
    async getCurrentLocation(): Promise<LocationObject | null> {
      const { granted } = await requestForegroundPermissionsAsync();
  
      if (!granted) {
        console.log("Permissão negada");
        return null;
      }
  
      const currentPosition = await getCurrentPositionAsync();
      return currentPosition;
    }
  }
  