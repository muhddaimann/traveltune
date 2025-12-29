import React, { useRef, useEffect } from "react";
import { View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useTheme } from "react-native-paper";
import MapHeader from "../../../components/b/header";
import { useMapsContext } from "../../../contexts/mapsContext";

export default function MapScreen() {
  const theme = useTheme();
  const { activeRoute, activeStation, activeStationIndex, selectStation } =
    useMapsContext();
  const mapRef = useRef<MapView>(null);

  const initialRegion = {
    latitude: 3.16, // Centered latitude for the KL route
    longitude: 101.69, // Centered longitude for the KL route
    latitudeDelta: 0.15, // Zoom level
    longitudeDelta: 0.15, // Zoom level
  };

  const activePolyline = activeRoute.polyline.slice(0, activeStationIndex + 1);

  useEffect(() => {
    if (mapRef.current && activeStation) {
      mapRef.current.animateToRegion(
        {
          latitude: activeStation.latitude,
          longitude: activeStation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        1000
      );
    }
  }, [activeStation]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={initialRegion}
      >
        {/* Inactive Polyline */}
        <Polyline
          coordinates={activeRoute.polyline}
          strokeColor={theme.colors.outline}
          strokeWidth={3}
        />
        {/* Active Polyline */}
        {activePolyline.length > 1 && (
          <Polyline
            coordinates={activePolyline}
            strokeColor={theme.colors.primary}
            strokeWidth={6}
          />
        )}

        {activeRoute.stations.map((station, index) => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            title={station.name}
            description={station.vibe}
            pinColor={
              station.id === activeStation.id
                ? theme.colors.primary
                : theme.colors.secondary
            }
            onPress={() => selectStation(index)}
          />
        ))}
      </MapView>

      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <MapHeader />
      </View>
    </View>
  );
}
