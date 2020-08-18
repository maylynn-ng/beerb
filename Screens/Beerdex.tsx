import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import BeerBadge from '../Components/BeerBadge';

function Beerdex() {
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <BeerBadge />
        <Text>HELLO</Text>
      </View>
    </SafeAreaView>
  );
}

export default Beerdex;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'green',
  },
});
