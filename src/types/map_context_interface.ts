import { LocationObject } from "expo-location";
import HouseInterface from "./house_interface";

interface MapContextInterface {
  location: LocationObject | null;
  loading: boolean;
  houses: HouseInterface[];
}

export default MapContextInterface;