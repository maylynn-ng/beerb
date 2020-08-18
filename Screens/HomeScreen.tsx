import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Map from '../Components/Map';
import Navbar from '../Components/Navbar';
import boroughs from '../assets/london_sport.json';
import { storeBorough } from '../redux/actions/actions';

const HomeScreen = ({ currentBorough, setBorough }: any) => {
  const handlePress = (name: string): void => {
    setBorough(name);
  };
  return (
    <View style={styles.homeScreen}>
      {/* Buerger Menu */}
      <Text>You're in {currentBorough}</Text>
      <Map handlePress={handlePress} boroughs={boroughs} style={styles.map} />
      <View style={styles.lastBeer} />
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
  };
}

function mapDispatch(dispatch: any) {
  return {
    setBorough: (name: string) => dispatch(storeBorough(name)),
  };
}

export default connect(mapStateToProps, mapDispatch)(HomeScreen);
