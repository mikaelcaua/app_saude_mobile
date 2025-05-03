import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
  } from "expo-location";
  
  export class LocationService {
    async getCurrentLocation(): Promise<LocationObject | null> {
      const { granted } = await requestForegroundPermissionsAsync();
  
      if (!granted) {
        throw new Error("Permissão de localização não concedida");
      }
  
      const currentPosition = await getCurrentPositionAsync();
      return currentPosition;
    }
  }
  