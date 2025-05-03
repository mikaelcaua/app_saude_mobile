import { LocationObject } from "expo-location";

interface MapContextInterface {
  location: LocationObject | null;
  loading: boolean;
}

export default MapContextInterface;