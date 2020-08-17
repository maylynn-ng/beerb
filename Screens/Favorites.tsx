import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function Favorites() {
  return <View style={styles.mainContainer}></View>;
}

export default Favorites;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'red',
  },
});
