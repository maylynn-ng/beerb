import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Geojson } from 'react-native-maps';
import boroughsJSON from './assets/london_boroughs.json';

type LatLng = {
  latitude: Number;
  longitude: Number;
};

const boroughs = JSON.parse(JSON.stringify(boroughsJSON));

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hi!!!</Text>
      <MapView
        initialRegion={{
          latitude: 51.3290110106029,
          longitude: -0.330679062942453,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ width: '100%', height: 500 }}
      >
        <Geojson geojson={boroughs} strokeColor="red" fillColor="green" strokeWidth={2} />
      </MapView>
      <Text>Hello!</Text>
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
