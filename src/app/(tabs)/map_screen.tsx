import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { useMap } from "@/src/contexts/map_context";
import HouseMarker from "../components/house_marker";

export default function MapScreen() {
  const { location, loading, houses } = useMap();

  return (
    <>
      {loading && (
        <View style={styles.centered}>
          <Text>Obtendo localização...</Text>
        </View>
      )}

      {!loading && location && (
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
          }}
        >
          {houses.map((house) => (
            <HouseMarker key={house.id} house={house} />
          ))}
        </MapView>
      )}

      {!loading && !location && (
        <View style={styles.centered}>
          <Text>Permissão de localização não autorizada...</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapStyle: { flex: 1, width: "100%" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
