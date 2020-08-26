import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import FavouriteBeer from './FavouriteBeer';
import { connect } from 'react-redux';
import { Beer } from '../Models/Beer.model';
import { State } from '../redux/reducers';

const BeerModal = ({ beerId, drunkBeers }: { beerId: number; drunkBeers: Beer[] }) => {
  const showcasedBeer = drunkBeers.filter(b => b.beerId === beerId)[0];
  return (
    <View style={styles.container}>
      <View style={styles.labelAndName}>
        {showcasedBeer.beerLabel !== '' && (
          <Image style={styles.label} source={{ uri: showcasedBeer.beerLabel }} />
        )}
        <Text style={styles.beerName}>{showcasedBeer.beerName.toUpperCase()}</Text>
        <FavouriteBeer beerId={showcasedBeer.beerId} />
      </View>
      <Text style={{ textAlign: 'center' }}>{showcasedBeer.beerStyle}</Text>
      <Text style={{ textAlign: 'center' }}>
        ABV: {showcasedBeer.beerAbv}% - IBU:{' '}
        {showcasedBeer.beerIbu === 0 ? 'N/A' : showcasedBeer.beerIbu}
      </Text>
      <Text style={styles.breweryInfo}>
        {showcasedBeer.breweryName}, {showcasedBeer.breweryCountry}
      </Text>
      <ScrollView style={{ marginVertical: 17 }}>
        <Text style={styles.beerDescription}>{showcasedBeer.beerDescription}</Text>
      </ScrollView>
    </View>
  );
};

const mapStatesToProps = (state: State) => {
  return {
    drunkBeers: state.user.drunkBeers,
  };
};

export default connect(mapStatesToProps, null)(BeerModal);

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
