import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import FavouriteBeer from './FavouriteBeer';
import { connect } from 'react-redux';
import store from '../redux/store';

const BeerModal = ({ beerId }: any) => {
  const state = store.getState();
  const { drunkBeers } = state.user;
  const beerToShow = drunkBeers.filter(b => b.beerId === beerId);
  const beerObj: any = beerToShow[0];
  console.log('🍎', beerObj, beerId);
  return (
    <View style={styles.container}>
      <View style={styles.labelAndName}>
        {beerObj.beerLabel !== '' && (
          <Image style={styles.label} source={{ uri: beerObj.beerLabel }} />
        )}
        <Text style={styles.beerName}>{beerObj.beerName.toUpperCase()}</Text>
        <FavouriteBeer beerId={beerObj.beerId} />
      </View>
      {console.log('🍎', beerObj)}
      <Text style={{ textAlign: 'center' }}>{beerObj.beerStyle}</Text>
      <Text style={{ textAlign: 'center' }}>
        ABV: {beerObj.beerAbv}% - IBU: {beerObj.beerIbu === 0 ? 'N/A' : beerObj.beerIbu}
      </Text>
      <Text style={styles.breweryInfo}>
        {beerObj.breweryName}, {beerObj.breweryCountry}
      </Text>
      <ScrollView style={{ marginVertical: 17 }}>
        <Text style={styles.beerDescription}>{beerObj.beerDescription}</Text>
      </ScrollView>
    </View>
  );
};
export default connect(null, null)(BeerModal);
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '70%',
    borderRadius: 15,
    padding: 5,
  },
  labelAndName: {
    flexDirection: 'row',
    padding: 10,
  },
  label: {
    height: 95,
    width: 95,
    marginRight: 5,
  },
  beerName: {
    fontSize: 24,
    textAlign: 'center',
    alignSelf: 'center',
    width: '60%',
    fontWeight: 'bold',
  },
  breweryInfo: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  beerDescription: {
    fontSize: 16,
    padding: 15,
    paddingTop: 0,
    textAlign: 'center',
  },
});
