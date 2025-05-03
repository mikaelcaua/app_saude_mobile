import HouseInterface from "@/src/interfaces/house_interface";
import React from "react";
import { Marker } from "react-native-maps";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



interface HouseMarkerProps {
    house: HouseInterface;
}

export default function HouseMarker({ house }: HouseMarkerProps) {
    return (
        <Marker
            coordinate={{
                latitude: house.latitude,
                longitude: house.longitude,
            }}
            title={house.houseOwner}
            description={`ID: ${house.id}`}
        >
            <MaterialIcons name="home" size={35} />
        </Marker>
    );
}
