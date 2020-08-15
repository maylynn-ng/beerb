import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Geojson, Polygon } from 'react-native-maps';
import boroughsJSON from './assets/london_sport.json';

type LatLng = {
  latitude: Number;
  longitude: Number;
};

const boroughs = JSON.parse(JSON.stringify(boroughsJSON));

const handlePress = (name: String) => {
  console.info(name);
};

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 51.509993,
          longitude: -0.104298,
          latitudeDelta: 0.7,
          longitudeDelta: 0.7,
        }}
        style={{ width: '100%', height: 500 }}
      >
        {boroughs.features.map(borough => {
          return (
            <Polygon
              key={borough.properties.id}
              coordinates={borough.geometry.coordinates[0].map(coords => {
                console.log(coords);
                return {
                  latitude: coords[1],
                  longitude: coords[0],
                };
              })}
              strokeWidth={1}
              fillColor="rgba(0, 250, 70, 0.6)"
              tappable={true}
              onPress={() => handlePress(borough.properties.name)}
            />
          );
        })}
        {/* <Geojson
          geojson={boroughs}
          strokeColor="red"
          fillColor="rgba(0, 250, 70, 0.6)"
          strokeWidth={2}
        /> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
