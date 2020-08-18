import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import BeerBadge from '../Components/BeerBadge';
import { mockData } from '../Components/MockBeerData';
// import list and map through to render each label as a <BeerBadge>

const beers = mockData;

function Beerdex() {
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Text style={styles.heading}>BEERDEX</Text>
        {mockData.map(beer => {
          <BeerBadge beer={beer} />;
        })}
      </View>
    </SafeAreaView>
  );
}

export default Beerdex;

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});
