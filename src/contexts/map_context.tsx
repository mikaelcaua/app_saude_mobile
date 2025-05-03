import React, { createContext, useEffect, useState, useContext } from "react";
import { LocationObject } from "expo-location";
import { LocationService } from "../services/location_service";
import MapContextInterface from "../types/map_context_interface";


export const MapContext = createContext<MapContextInterface | null>(null);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const locationService = new LocationService();

  async function fetchLocation() {
    setLoading(true);
    const loc = await locationService.getCurrentLocation();
    setLocation(loc);
    setLoading(false);
  }

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <MapContext.Provider value={{ location, loading }}>
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
