import React, { useRef, useEffect } from "react";
import { View, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Text, useTheme } from "react-native-paper";
import { Music2, MapPin } from "lucide-react-native";

import MapHeader from "../../../components/b/header";
import MapPill from "../../../components/b/pill";
import { useMapsContext } from "../../../contexts/mapsContext";

export default function MapScreen() {
  const theme = useTheme();
  const { activeRoute, activeStation, activeStationIndex, selectStation } =
    useMapsContext();

  const mapRef = useRef<MapView>(null);

  const initialRegion = {
    latitude: 3.16,
    longitude: 101.69,
    latitudeDelta: 0.15,
    longitudeDelta: 0.15,
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
        700
      );
    }
  }, [activeStation]);

  return (
    <View style={{ flex: 1 }}>
      {/* Map */}
      <MapView ref={mapRef} style={{ flex: 1 }} initialRegion={initialRegion}>
        {/* Full route */}
        <Polyline
          coordinates={activeRoute.polyline}
          strokeColor={theme.colors.outlineVariant}
          strokeWidth={3}
        />

        {/* Progressed route */}
        {activePolyline.length > 1 && (
          <Polyline
            coordinates={activePolyline}
            strokeColor={theme.colors.primary}
            strokeWidth={5}
          />
        )}

        {/* Stations */}
        {activeRoute.stations.map((station, index) => {
          const isActive = index === activeStationIndex;

          return (
            <Marker
              key={station.id}
              coordinate={{
                latitude: station.latitude,
                longitude: station.longitude,
              }}
              zIndex={isActive ? 1000 : 1}
              onPress={() => selectStation(index)}
            >
              <View style={{ alignItems: "center" }}>
                {/* Marker */}
                <View
                  style={{
                    width: isActive ? 42 : 34,
                    height: isActive ? 42 : 34,
                    borderRadius: 21,
                    backgroundColor: theme.colors.surface,
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: isActive ? 6 : 3,
                    borderWidth: 2,
                    borderColor: isActive
                      ? theme.colors.primary
                      : theme.colors.outlineVariant,
                  }}
                >
                  <Image
                    source={station.stopCover ?? station.albumCover}
                    style={{
                      width: isActive ? 32 : 24,
                      height: isActive ? 32 : 24,
                      borderRadius: 16,
                    }}
                  />
                </View>

                {/* Active station card */}
                {isActive && (
                  <View
                    style={{
                      marginTop: 8,
                      padding: 12,
                      borderRadius: 16,
                      backgroundColor: theme.colors.surface,
                      elevation: 8,
                      shadowColor: theme.colors.shadow,
                      shadowOpacity: 0.2,
                      shadowRadius: 10,
                      shadowOffset: { width: 0, height: 4 },
                      minWidth: 260,
                    }}
                  >
                    <View style={{ flexDirection: "row", gap: 12 }}>
                      <Image
                        source={station.albumCover}
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 22,
                        }}
                      />

                      <View style={{ flex: 1, gap: 4 }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            fontWeight: "600",
                            color: theme.colors.onSurface,
                          }}
                        >
                          {station.name}
                        </Text>

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <MapPin
                            size={12}
                            color={theme.colors.onSurfaceVariant}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              color: theme.colors.onSurfaceVariant,
                            }}
                          >
                            {station.vibe}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Music2 size={12} color={theme.colors.primary} />
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 12,
                              color: theme.colors.onSurfaceVariant,
                            }}
                          >
                            {station.song.title} · {station.song.artist}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </Marker>
          );
        })}
      </MapView>

      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
        pointerEvents="box-none"
      >
        <MapHeader />
      </View>

      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 130,
        }}
        pointerEvents="box-none"
      >
        <MapPill />
      </View>
    </View>
  );
}
