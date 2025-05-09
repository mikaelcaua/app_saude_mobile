// src/services/location_service.ts
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription
} from "expo-location";

export class LocationService {
  private locationSubscription: LocationSubscription | null = null;

  async getCurrentLocation(): Promise<LocationObject | null> {
    const { granted } = await requestForegroundPermissionsAsync();

    if (!granted) {
      throw new Error("Permissão de localização não concedida");
    }

    const currentPosition = await getCurrentPositionAsync({
      accuracy: LocationAccuracy.Balanced
    });
    return currentPosition;
  }

  async watchLocation(callback: (location: LocationObject) => void): Promise<LocationSubscription> {
    const { granted } = await requestForegroundPermissionsAsync();

    if (!granted) {
      throw new Error("Permissão de localização não concedida");
    }

    // Configurações para monitorar a localização
    const subscription = await watchPositionAsync(
      {
        accuracy: LocationAccuracy.Balanced,
        timeInterval: 5000,       // Atualiza a cada 5 segundos
        distanceInterval: 10,     
      },
      (location) => {
        console.log("📍 LOCATION SERVICE - Nova localização detectada:", 
          JSON.stringify({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
            accuracy: location.coords.accuracy,
            timestamp: new Date(location.timestamp).toLocaleTimeString()
          })
        );
        callback(location);
      }
    );

    console.log("📍 LOCATION SERVICE - Monitoramento de localização iniciado");
    this.locationSubscription = subscription;
    return subscription;
  }

  stopWatchingLocation() {
    if (this.locationSubscription) {
      this.locationSubscription.remove();
      this.locationSubscription = null;
    }
  }
}