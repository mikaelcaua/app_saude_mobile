import { LocationObject } from "expo-location";
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
      setLoading(false); // corrigido
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
    fetchLocation();
  }, []);

  useEffect(() => {
    fetchHouses();
  }, [user]);

  return (
    <MapContext.Provider value={{ location, loading, houses }}>
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
