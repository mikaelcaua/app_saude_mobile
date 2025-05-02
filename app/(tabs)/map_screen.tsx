import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import MapView from "react-native-maps";
import { useMapViewModel } from "../../src/viewmodels/map_viewmodel";

export default function MapScreen() {
  const { location, loading } = useMapViewModel();

  return (
    <SafeAreaView style={styles.container}>
      {!loading && location ? (
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
          }}
        />
      ) : (
        <View style={styles.centered}>
          <Text>Obtendo localização...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapStyle: { flex: 1, width: "100%" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
