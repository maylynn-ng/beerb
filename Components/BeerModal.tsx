import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { InitialBeer } from '../Models/Beer.model';
import FavouriteBeer from './FavouriteBeer';

const DB_LOCALHOST = process.env.REACT_NATIVE_LOCALHOST;

const BeerModal = ({ beer }: any) => {
  const [thisBeer, setThisBeer] = useState(InitialBeer);

  useEffect(() => {
    fetch(`${DB_LOCALHOST}/searchBeer/${beer.beerId}`)
      .then(res => res.json())
      .then(res => setThisBeer(res));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.labelAndName}>
        {thisBeer.beerLabel !== '' && (
          <Image style={styles.label} source={{ uri: thisBeer.beerLabel }} />
        )}
        <Text style={styles.beerName}>{thisBeer.beerName.toUpperCase()}</Text>
        <FavouriteBeer beerId={thisBeer.beerId} />
      </View>

      <Text style={{ textAlign: 'center' }}>{thisBeer.beerStyle}</Text>
      <Text style={{ textAlign: 'center' }}>
        ABV: {thisBeer.beerAbv}% - IBU: {thisBeer.beerIbu === 0 ? 'N/A' : thisBeer.beerIbu}
      </Text>
      <Text style={styles.breweryInfo}>
        {thisBeer.breweryName}, {thisBeer.breweryCountry}
      </Text>
      <ScrollView>
        <Text style={styles.beerDescription}>{thisBeer.beerDescription}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '70%',
    borderRadius: 5,
    padding: 5,
  },
  labelAndName: {
    flexDirection: 'row',
    padding: 10,
  },
  label: {
    height: 100,
    width: 100,
  },
  beerName: {
    fontSize: 26,
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
