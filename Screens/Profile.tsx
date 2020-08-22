import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import { storeBorough, fetchPlacesNearby, storeLocation, getLocations } from '../redux/actions';
function Profile() {
  return (
    <SafeAreaView>
      <Text>how the hell is this supposed to work</Text>
    </SafeAreaView>
  );
}

// function mapStateToProps(state: any) {
//   return {
//     currentBorough: state.currentBorough,
//     searchTerm: state.searchTerm,
//     beerSearchResults: state.beerSearchResults,
//     user: state.user,
//     location: state.location,
//   };
// }

// function mapDispatch(dispatch: any) {
//   return {
//     setLocation: (location: object) => dispatch(storeLocation(location)),
//     setBorough: (name: string) => dispatch(storeBorough(name)),
//     setPlacesNearby: (lat: number, lng: number) => dispatch(fetchPlacesNearby(lat, lng)),
//     setLocations: (user: any) => dispatch(getLocations(user)),
//   };
// }

// export default connect(mapStateToProps, mapDispatch)(HomeScreen);

export default Profile;
