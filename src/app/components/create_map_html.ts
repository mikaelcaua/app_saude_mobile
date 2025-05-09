// src/components/create_map_html.ts
import HouseInterface from "@/src/interfaces/house_interface";
import { LocationObject } from "expo-location";

interface CreateMapHTMLProps {
  location: LocationObject;
  houses: HouseInterface[];
}

const createMapHTML = ({ location, houses }: CreateMapHTMLProps) => {
  if (!location) return "";

  const lat = location.coords.latitude;
  const lng = location.coords.longitude;

  const houseMarkersJS = houses
    .map((house) => {
      if (house.latitude != null && house.longitude != null) {
        return `
          L.marker([${house.latitude}, ${house.longitude}], { icon: houseIcon })
            .addTo(map)
            .bindPopup("R$ ${house.houseOwner || "N/A"}");
        `;
      }
      return "";
    })
    .join("\n");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossorigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossorigin=""
        ></script>
        <style>
          body { margin: 0; padding: 0; }
          html, body, #map { height: 100%; width: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          // Inicializa o mapa
          const map = L.map('map').setView([${lat}, ${lng}], 18);
          let userMarker = null;

          // Camada de azulejos do OpenStreetMap
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);

          // Ícone do usuário
          const userIcon = L.icon({
            iconUrl:
              'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
          });

          // Ícone customizado de casa
          const houseIcon = L.icon({
            iconUrl:
              'https://maps.gstatic.com/mapfiles/ms2/micons/homegardenbusiness.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
          });

          // Função para criar ou atualizar o marcador do usuário
          function createUserMarker(lat, lng) {
            if (userMarker) {
              map.removeLayer(userMarker);
            }
            
            userMarker = L.marker([lat, lng], { icon: userIcon }).addTo(map);
            return userMarker;
          }

          // Função para atualizar a localização do usuário 
          // (será chamada pelo React Native quando a localização mudar)
          function updateUserLocation(newLat, newLng) {
            if (userMarker) {
              // Move o marcador para a nova posição
              userMarker.setLatLng([newLat, newLng]);
              
              // Centraliza o mapa na nova posição
              map.panTo([newLat, newLng]);
            } else {
              // Cria um novo marcador caso não exista
              userMarker = createUserMarker(newLat, newLng);
            }
            
            // Notifica o React Native que a localização foi atualizada
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(
                JSON.stringify({
                  type: 'locationUpdated',
                  lat: newLat,
                  lng: newLng
                })
              );
            }
          }

          // Inicializa o marcador do usuário
          createUserMarker(${lat}, ${lng});

          // Marcadores existentes das casas
          ${houseMarkersJS}

          // Ao clicar no mapa, envia apenas as coordenadas para o React Native
          map.on('click', function (e) {
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(
                JSON.stringify({
                  type: 'mapClick',
                  lat: e.latlng.lat,
                  lng: e.latlng.lng
                })
              );
            }
          });
        </script>
      </body>
    </html>
  `;
};

export default createMapHTML;