import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AddBeer from './AddBeerModal';
import * as Location from 'expo-location';
import { connect } from 'react-redux';
import { fetchPlacesNearby } from '../redux/actions';

const Navbar = ({ setPlacesNearby, navigation }) => {
  const [isShownAddBeer, setIsShownAddBeer] = useState(false);
  const toggleAddBeer = () => {
    setIsShownAddBeer(!isShownAddBeer);
  };

  const [location, setLocation] = useState({});

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navbarBtn}
        onPress={() => {
          navigation.navigate('Profile');
        }}
      >
        <Image source={require('../assets/user.png')} style={styles.navbarPic} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          toggleAddBeer();

          (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
              console.log('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setPlacesNearby(location.coords.latitude, location.coords.longitude);
          })();
        }}
      >
        <Text style={styles.plusSign}>+</Text>
      </TouchableOpacity>
      <AddBeer location={location} isShownAddBeer={isShownAddBeer} toggleAddBeer={toggleAddBeer} />
      <TouchableOpacity
        style={styles.navbarBtn}
        onPress={() => {
          console.info('link to random beer/location');
        }}
      >
        <Image source={require('../assets/discover.png')} style={styles.navbarPic} />
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    searchTerm: state.searchTerm,
    beerSearchResults: state.beerSearchResults,
  };
}

function mapDispatch(dispatch: any) {
  return {
    setPlacesNearby: (lat: number, lng: number) => dispatch(fetchPlacesNearby(lat, lng)),
  };
}

export default connect(mapStateToProps, mapDispatch)(Navbar);

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '10%',
    backgroundColor: 'gold',
    zIndex: 1,
  },
  addBtn: {
    position: 'relative',
    top: (windowHeight * 0.1) / 2 - 50,
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  navbarPic: {
    width: 50,
    height: 50,
  },
  plusSign: {
    top: -13,
    fontSize: 90,
    height: '100%',
    color: 'gold',
  },
  navbarBtn: {
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
