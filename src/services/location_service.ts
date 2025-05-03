import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
  } from "expo-location";
  
  export class LocationService {
    async getCurrentLocation(): Promise<LocationObject | null> {
      const { granted } = await requestForegroundPermissionsAsync();
  
      if (!granted) {
        return null;
      }
  
      const currentPosition = await getCurrentPositionAsync();
      return currentPosition;
    }
  }
  