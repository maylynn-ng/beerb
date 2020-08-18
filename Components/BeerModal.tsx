import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const BeerModal = ({ beer }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelAndName}>
        <Image style={styles.label} source={{ uri: beer.beerLabel }} />
        <Text style={styles.beerName}>{beer.beerName.toUpperCase()}</Text>
      </View>
      <Text style={styles.breweryInfo}>
        {beer.breweryName}, {beer.breweryCountry}
      </Text>
      <View>
        <Text style={styles.beerDescription}>{beer.beerDescription}</Text>
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
