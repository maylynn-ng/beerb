import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Map from '../Components/Map';
import Navbar from '../Components/Navbar';
import boroughs from '../assets/london_sport.json';
import { storeBorough, fetchBeers } from '../redux/actions';

const HomeScreen = ({
  currentBorough,
  setBorough,
  searchTerm,
  beerSearchResults,
  setSearch,
}: any) => {
  const handlePress = (name: string): void => {
    setBorough(name);
  };
  console.log('🎉', searchTerm, beerSearchResults);
  return (
    <View style={styles.homeScreen}>
      {/* Buerger Menu */}
      <Text>You're in {currentBorough}</Text>
      <Map handlePress={handlePress} boroughs={boroughs} style={styles.map} />
      <View style={styles.lastBeer}>
        <TextInput
          placeholder="Search Beer"
          enablesReturnKeyAutomatically={true}
          autoCapitalize="words"
          onChangeText={searchTerm => {
            setSearch(searchTerm);
          }}
          returnKeyLabel="done"
          value={searchTerm}
        />
        {beerSearchResults.map(beer => (
          <Text>{beer.beerName}</Text>
        ))}
      </View>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height: '50%',
    width: '100%',
  },
  lastBeer: {
    height: '50%',
  },
});

function mapStateToProps(state: any) {
  return {
    currentBorough: state.currentBorough,
    searchTerm: state.searchTerm,
    beerSearchResults: state.beerSearchResults,
  };
}

function mapDispatch(dispatch: any) {
  return {
    setBorough: (name: string) => dispatch(storeBorough(name)),
    setSearch: (searchTerm: string) => dispatch(fetchBeers(searchTerm)),
  };
}

export default connect(mapStateToProps, mapDispatch)(HomeScreen);
