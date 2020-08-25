import React from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import {
  storeBorough,
  fetchPlacesNearby,
  storeLocation,
  getLocations,
  storeBeerFreqs,
} from '../redux/actions';
import Topbar from '../Components/Topbar';

function Profile({ user, beerFrequency, navigation }) {
  const picture = () => {
    let src;
    user.picture ? (src = { uri: user.picture }) : (src = 'require("./assets/user.png")');
    return src;
  };

  return (
    <>
      <Topbar navigation={navigation} user={user} />
      <SafeAreaView style={styles.mainContainer}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Image style={styles.userImage} source={picture()} />
          <Text style={{ fontSize: 30 }}>{user.name}</Text>
        </View>

        <View style={styles.info}>
          <Text>
            Last Borough:
            {user.Locations.length !== 0
              ? user.Locations[user.Locations.length - 1].boroughName
              : 'no borough yet'}
          </Text>
          <Text>
            Last Location:
            {user.Locations.length !== 0
              ? user.Locations[user.Locations.length - 1].placeName
              : 'no location yet'}
          </Text>
          <Text>Total beers had: {user.Locations.length}</Text>
          <Text>
            Most frequently enjoyed: {beerFrequency[0][0]} - {beerFrequency[0][1]} times
          </Text>
          <Text>{Object.keys(user.boroughCounter).length}/33</Text>
          <Text>Beers discovered{beerFrequency.length}/33</Text>
        </View>
      </SafeAreaView>
    </>
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
    flex: 1,
    alignItems: 'center',
    padding: '5%',
  },
  userImage: {
    height: 150,
    width: 150,
  },
  info: {
    flex: 2,
    borderWidth: 3,
    width: Dimensions.get('screen').width,
    padding: 10,
  },
});
