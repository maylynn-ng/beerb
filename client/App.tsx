import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { StyleSheet, Platform, StatusBar as StatBar, SafeAreaView } from 'react-native';

import boroughs from './assets/london_sport.json';
import MapScreen from './Screens/MapScreen';


export default function App() {
  const handlePress = (name: String): void => {
    console.info(name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapScreen handlePress={handlePress} boroughs={boroughs} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatBar.currentHeight : 0,
  },
});
