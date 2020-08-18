import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Map from '../Components/Map';
import Navbar from '../Components/Navbar';
import boroughs from '../assets/london_sport.json';
import { storeBorough, fetchBeers } from '../redux/actions/actions';

const HomeScreen = ({
  currentBorough,
  setBorough,
  beerSearchResults,
  // searchTerm,
  fetchBeers,
}: any) => {
  const handlePress = (name: string): void => {
    setBorough(name);
  };

  const [searchTerm, setSearchTerm] = useState('');

  console.log('🌵🌵🌵🌵🌵SEARCH RESULTS', beerSearchResults);

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
          onChangeText={input => {
            setSearchTerm(input);
            fetchBeers(input);
          }}
          returnKeyLabel="done"
          value={searchTerm}
        />
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
    // searchTerm: state.searchTerm,
    beerSearchResults: state.beerSearchResults,
  };
}

function mapDispatch(dispatch: any) {
  return {
    setBorough: (name: string) => dispatch(storeBorough(name)),
    fetchBeers: (searchTerm: string) => dispatch(fetchBeers(searchTerm)),
  };
}

export default connect(mapStateToProps, mapDispatch)(HomeScreen);
