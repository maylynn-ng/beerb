import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import FavouriteBeer from './FavouriteBeer';

const BeerModal = ({ beer }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelAndName}>
        {beer.beerLabel !== '' && <Image style={styles.label} source={{ uri: beer.beerLabel }} />}
        <Text style={styles.beerName}>{beer.beerName.toUpperCase()}</Text>
        <FavouriteBeer beerId={beer.beerId} />
      </View>

      <Text style={{ textAlign: 'center' }}>{beer.beerStyle}</Text>
      <Text style={{ textAlign: 'center' }}>
        ABV: {beer.beerAbv}% - IBU: {beer.beerIbu === 0 ? 'N/A' : beer.beerIbu}
      </Text>
      <Text style={styles.breweryInfo}>
        {beer.breweryName}, {beer.breweryCountry}
      </Text>
      <ScrollView>
        <Text style={styles.beerDescription}>{beer.beerDescription}</Text>
      </ScrollView>
    </View>
  );
};

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
    textAlign: 'center',
  },
});

export default BeerModal;
