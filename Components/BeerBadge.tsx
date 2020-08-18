import React from 'react';
import { mockData } from './MockBeerData';
import { View, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Beer } from '../Models/Beer.model';

const BeerBadge = (beer: Beer) => {
  const oneBeer = mockData[0];
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          console.log('SHOW MODAL', oneBeer.beerName);
        }}
      >
        <Image style={styles.image} source={{ uri: oneBeer.beerLabel }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  image: {
    height: 100,
    width: 100,
  },
});

export default BeerBadge;
