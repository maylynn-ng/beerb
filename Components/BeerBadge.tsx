import React from 'react';
import { mockData } from './MockBeerData';
import { View, Text, StyleSheet } from 'react-native';

const BeerBadge = () => {
  console.log({ mockData });

  return (
    <View>
      <Text style={styles.text}>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});

export default BeerBadge;
