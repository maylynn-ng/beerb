import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { InitalBeer } from '../Models/Beer.model';

const DB_LOCALHOST = process.env.EXPO_LOCALHOST;

const BeerModal = ({ beer }: any) => {
  const [thisBeer, setThisBeer] = useState(InitalBeer);

  useEffect(() => {
    fetch(`${DB_LOCALHOST}/searchBeer/${beer.beerId}`)
      .then(res => res.json())
      .then(res => setThisBeer(res));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.labelAndName}>
        <Image style={styles.label} source={{ uri: thisBeer.beerLabel }} />
        <Text style={styles.beerName}>{thisBeer.beerName.toUpperCase()}</Text>
      </View>
      <Text style={styles.breweryInfo}>
        {thisBeer.breweryName}, {thisBeer.breweryCountry}
      </Text>
      <View>
        <Text style={styles.beerDescription}>{thisBeer.beerDescription}</Text>
      </View>
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
