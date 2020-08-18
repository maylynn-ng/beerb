import React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Map from '../Components/Map';
import Navbar from '../Components/Navbar';
import boroughs from '../assets/london_sport.json';
import { storeBorough, fetchSearchBeers } from '../redux/actions';

const HomeScreen = ({
  currentBorough,
  setBorough,
  searchTerm,
  beerSearchResults,
  setSearch,
  navigation,
}: any) => {
  const handlePress = (name: string): void => {
    setBorough(name);
  };

  return (
    <View style={styles.homeScreen}>
      <Button
        style={styles.burgerMenu}
        title="menu"
        onPress={() => {
          navigation.navigate('Modal');
        }}
      />
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
    // height: '100%',
    // width: '100%',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    // height: '50%',
    // width: '100%',
  },
  lastBeer: {
    height: '50%',
  },
  burgerMenu: {
    position: 'absolute',
    top: 30,
    left: 0,
    zIndex: 2,
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
    setSearch: (searchTerm: string) => dispatch(fetchSearchBeers(searchTerm)),
  };
}

export default connect(mapStateToProps, mapDispatch)(HomeScreen);
