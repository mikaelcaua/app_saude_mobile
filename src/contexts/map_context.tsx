// src/contexts/map_context.tsx
import { LocationObject, LocationSubscription } from "expo-location";
import React, { createContext, useContext, useEffect, useState } from "react";
import HouseInterface from "../interfaces/house_interface";
import MapContextInterface from "../interfaces/map_context_interface";
import { HouseService } from "../services/heath_agent_service";
import { LocationService } from "../services/location_service";
import { useAuth } from "./auth_context";

export const MapContext = createContext<MapContextInterface | null>(null);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [houses, setHouses] = useState<HouseInterface[]>([]);
  const [locationSubscription, setLocationSubscription] = useState<LocationSubscription | null>(null);
  const locationService = new LocationService();
  const houseService = new HouseService();
  const { user } = useAuth();

  async function fetchLocation() {
    try {
      setLoading(true);
      const loc = await locationService.getCurrentLocation();
      setLocation(loc);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter localização:", error);
      setLoading(false);
    }
  }

  async function startLocationTracking() {
    try {
      setLoading(true);
      
      // Iniciar com a localização atual
      const initialLocation = await locationService.getCurrentLocation();
      if (initialLocation) {
        setLocation(initialLocation);
      }
      
      // Iniciar monitoramento contínuo
      const subscription = await locationService.watchLocation((newLocation) => {
        setLocation(newLocation);
      });
      
      setLocationSubscription(subscription);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao iniciar rastreamento de localização:", error);
      setLoading(false);
    }
  }

  async function fetchHouses() {
    if (!user) return;
    try {
      const data = await houseService.getAllHousesFromOneHeathAgent(user.id, user.token);
      setHouses(data);
    } catch (error) {
      console.error("Erro ao buscar casas:", error);
    }
  }

  useEffect(() => {
    // Iniciar rastreamento de localização em vez de apenas buscar uma vez
    startLocationTracking();
    
    // Limpar a assinatura quando o componente for desmontado
    return () => {
      if (locationSubscription) {
        locationService.stopWatchingLocation();
      }
    };
  }, []);

  useEffect(() => {
    fetchHouses();
  }, [user]);

  return (
    <MapContext.Provider value={{ 
      location, 
      loading, 
      houses,
      refreshLocation: startLocationTracking
    }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap deve ser usado dentro de um MapProvider");
  }
  return context;
}