// src/screens/MapScreen.tsx
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { useMap } from "@/src/contexts/map_context";
import createMapHTML from "../components/create_map_html";
import { Ionicons } from "@expo/vector-icons";

export default function MapScreen() {
  const { location, loading, houses, refreshLocation } = useMap();
  const webViewRef = useRef<WebView>(null);
  const [mapKey, setMapKey] = useState(0); // Usado para forçar re-renderização do WebView quando necessário

  // Efeito para quando a localização muda
  useEffect(() => {
    if (location && webViewRef.current) {
      // Envia a nova localização para o WebView
      const message = JSON.stringify({
        type: 'locationUpdate',
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      
      webViewRef.current.injectJavaScript(`
        (function() {
          const data = ${message};
          if (typeof updateUserLocation === 'function') {
            updateUserLocation(data.latitude, data.longitude);
          }
          true;
        })();
      `);
    }
  }, [location]);

  // Função para lidar com mensagens do WebView
  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      if (data.type === 'mapClick') {
        console.log(`Clicou no mapa em: ${data.lat}, ${data.lng}`);
      }
    } catch (error) {
      console.error('Erro ao processar mensagem do WebView:', error);
    }
  };

  // Função para forçar atualização manual do mapa
  const handleRefreshMap = async () => {
    await refreshLocation();
    setMapKey(prev => prev + 1); // Força re-renderização do WebView
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.centered}>
          <Text>Obtendo localização...</Text>
        </View>
      )}

      {!loading && location && (
        <>
          <WebView
            key={mapKey}
            ref={webViewRef}
            style={styles.mapStyle}
            originWhitelist={['*']}
            source={{ html: createMapHTML({location, houses}) }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scalesPageToFit={true}
            onMessage={handleWebViewMessage}
          />
          
          <TouchableOpacity 
            style={styles.refreshButton} 
            onPress={handleRefreshMap}
          >
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </>
      )}

      {!loading && !location && (
        <View style={styles.centered}>
          <Text>Permissão de localização não autorizada...</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={refreshLocation}
          >
            <Text style={styles.retryText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    position: 'relative'
  },
  mapStyle: { 
    flex: 1, 
    width: "100%" 
  },
  centered: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  refreshButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2196F3',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  }
});