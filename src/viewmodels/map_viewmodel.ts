import { useState, useEffect } from "react";
import { LocationObject } from "expo-location";
import { LocationRepository } from "../repositories/location_repository";

export function useMapViewModel() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [loading, setLoading] = useState(true);

  const repo = new LocationRepository();

  async function fetchLocation() {
    setLoading(true);
    const loc = await repo.getCurrentLocation();
    setLocation(loc);
    setLoading(false);
  }

  useEffect(() => {
    fetchLocation();
  }, []);

  return { location, loading };
}
