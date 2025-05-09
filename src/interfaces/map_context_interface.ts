// src/interfaces/map_context_interface.ts
import { LocationObject } from "expo-location";
import HouseInterface from "./house_interface";

export default interface MapContextInterface {
  location: LocationObject | null;
  loading: boolean;
  houses: HouseInterface[];
  refreshLocation: () => Promise<void>;  // Adicionada função para atualizar localização manualmente
}