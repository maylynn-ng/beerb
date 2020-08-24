import React from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import {
  storeBorough,
  fetchPlacesNearby,
  storeLocation,
  getLocations,
  storeBeerFreqs,
} from '../redux/actions';

function Profile({ user, beerFrequency }) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image
        style={styles.userImage}
        source={{
          uri: user.picture,
        }}
      />
      <View>
        <Text>{user.name}</Text>
        <Text>Last Borough: {user.Locations[user.Locations.length - 1].boroughName}</Text>
        <Text>Last Location: {user.Locations[user.Locations.length - 1].placeName}</Text>
        <Text>Beers had: {user.Locations.length}</Text>
        <Text>
          Most frequently enjoyed: {beerFrequency[0][0]} - {beerFrequency[0][1]} times
        </Text>
        <Text>{Object.keys(user.boroughCounter).length}/32</Text>

        {/* modal picture howmany how many beers-locations name, last beer share with share your locations friends savebutton */}
      </View>
    </SafeAreaView>
  );
}

function mapStateToProps(state: any) {
  return {
    currentBorough: state.currentBorough,
    searchTerm: state.searchTerm,
    beerSearchResults: state.beerSearchResults,
    user: state.user,
    location: state.location,
    beerFrequency: state.user.beerFreqs,
  };
}

function mapDispatch(dispatch: any) {
  return {
    setLocation: (location: object) => dispatch(storeLocation(location)),
    setBorough: (name: string) => dispatch(storeBorough(name)),
    setPlacesNearby: (lat: number, lng: number) => dispatch(fetchPlacesNearby(lat, lng)),
    setLocations: (user: any) => dispatch(getLocations(user)),
    setBeerFrequency: (freqs: [[]]) => dispatch(storeBeerFreqs(freqs)),
  };
}

export default connect(mapStateToProps, mapDispatch)(Profile);

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    height: 150,
    width: 150,
    shadowColor: 'grey',
    elevation: 4,
  },
  grayImage: {
    height: 80,
    width: 80,
    opacity: 0.3,
  },
});
