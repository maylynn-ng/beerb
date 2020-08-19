import React from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Map from '../Components/Map';
import Navbar from '../Components/Navbar';
import boroughs from '../assets/london_sport.json';
import { storeBorough } from '../redux/actions';

const HomeScreen = ({ currentBorough, searchTerm, beerSearchResults, navigation }: any) => {
  // const handlePress = borough => {

  // };

  return (
    <SafeAreaView style={styles.homeScreen}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.burgerMenuTouch}
          onPress={() => {
            navigation.navigate('Modal');
          }}
        >
          <Image source={require('../assets/menu.png')} style={styles.burgerMenu} />
        </TouchableOpacity>
        <View style={styles.currentView}>
          <Text>You're in {currentBorough}</Text>
        </View>
      </View>
      <Map boroughs={boroughs} />
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

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
  };
}

export default connect(mapStateToProps, mapDispatch)(HomeScreen);
