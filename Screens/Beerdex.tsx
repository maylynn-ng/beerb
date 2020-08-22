import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { getBeerdex } from '../redux/actions';
// import Loading from '../Components/Loading';
import { connect } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

import { State } from '../redux/reducers';
import { Beer } from '../Models/Beer.model';

import BeerBadge from '../Components/BeerBadge';
import { ScrollView } from 'react-native-gesture-handler';

function Beerdex({ user, populateBeerdex, beerdex }: any) {
  useEffect(() => {
    populateBeerdex();
  }, []);

  console.log('😍 Beerdex.tsx, line 13 hi!!!!!: ', beerdex[0]);

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <View style={styles.screen}>
        <Text style={styles.heading}>BEERDEX</Text>
        <ScrollView>
          <View style={styles.logoContainer}>
            {beerdex && beerdex.length ? (
              beerdex.map((beer: Beer, index: number) => (
                <BeerBadge style={styles.badge} key={index} beer={beer} />
              ))
            ) : (
              // <Loading />
              <Text>Loading</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function mapStateToProps(state: State) {
  return {
    trendingBeersList: state.trendingBeers,
    user: state.user,
    beerdex: state.beerdex,
  };
}

function mapDispatch(dispatch: any) {
  return {
    populateBeerdex: () => dispatch(getBeerdex()),
  };
}

export default connect(mapStateToProps, mapDispatch)(Beerdex);

const styles = StyleSheet.create({
  screen: {
    marginTop: 15,
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
  logoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  badge: {
    height: 200,
    width: 200,
  },
});
