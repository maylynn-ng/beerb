import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as Location from 'expo-location';
import Map from '../Components/Map';
import { isPointInPolygon } from 'geolib';
import Navbar from '../Components/Navbar';
import boroughs from '../assets/london_sport.json';
import { storeBorough, fetchPlacesNearby, storeLocation } from '../redux/actions';

const simpleArrayOfBoroughs = boroughs.features.map(borough => {
  return {
    boroughName: borough.properties.name,
    boroughId: borough.id,
    boroughCoords: borough.geometry.coordinates[0].map(coords => {
      return {
        latitude: coords[1],
        longitude: coords[0],
      };
    }),
  };
});

const HomeScreen = ({
  currentBorough,
  navigation,
  simpleBoroughs,
  setBorough,
  setPlacesNearby,
  setLocation,
}: any) => {
  //const [location, setLocation] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.info('Permission to access location was denied');
      }

      let newLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 1,
      });
      const { latitude, longitude } = newLocation.coords;
      setLocation({ latitude, longitude });

      simpleArrayOfBoroughs.some(
        borough =>
          isPointInPolygon({ latitude, longitude }, borough.boroughCoords) && setBorough(borough)
      );

      setPlacesNearby(newLocation.coords.latitude, newLocation.coords.longitude);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.homeScreen}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.burgerMenuTouch}
          onPress={() => {
            console.log('🦝 ', simpleBoroughs);
            navigation.navigate('Modal');
          }}
        >
          <Image source={require('../assets/menu.png')} style={styles.burgerMenu} />
        </TouchableOpacity>
        <View style={styles.currentView}>
          <Text>You're in {currentBorough}</Text>
        </View>
      </View>
      <Map boroughs={simpleArrayOfBoroughs} />
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

function mapStateToProps(state: any) {
  return {
    currentBorough: state.currentBorough,
    searchTerm: state.searchTerm,
    beerSearchResults: state.beerSearchResults,
    simpleBoroughs: state.boroughs,
  };
}

function mapDispatch(dispatch: any) {
  return {
    setLocation: (location: object) => dispatch(storeLocation(location)),
    setBorough: (name: string) => dispatch(storeBorough(name)),
    setPlacesNearby: (lat: number, lng: number) => dispatch(fetchPlacesNearby(lat, lng)),
  };
}

export default connect(mapStateToProps, mapDispatch)(HomeScreen);

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  burgerMenu: {
    width: 30,
    height: 30,
  },
  burgerMenuTouch: {
    flex: 1,
    width: 30,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  lastBeer: {
    flex: 1,
    height: '50%',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 8,
    height: 'auto',
    paddingHorizontal: 10,
    backgroundColor: 'gold',
  },
  currentView: {
    width: 'auto',
    height: 25,
    opacity: 0.7,
  },
});
