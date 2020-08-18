import React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Map from '../Components/Map';
import Navbar from '../Components/Navbar';
import boroughs from '../assets/london_sport.json';
import { storeBorough, fetchBeers } from '../redux/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

  console.log('🎉', searchTerm, beerSearchResults);
  return (
    <View style={styles.homeScreen}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Modal');
        }}
      >
        <Text>Menu!</Text>
      </TouchableOpacity>

      <Text>You're in {currentBorough}</Text>
      {console.log('hellooo!!')}
      {/* <View style={styles.map}></View> */}
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
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastBeer: {
    flex: 1,
    height: '50%',
  },
  map: {
    width: '100%',
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
    setSearch: (searchTerm: string) => dispatch(fetchBeers(searchTerm)),
  };
}

export default connect(mapStateToProps, mapDispatch)(HomeScreen);
