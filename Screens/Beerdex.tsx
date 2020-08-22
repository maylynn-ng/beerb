import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { getBeerdex, getDrunkBeers } from '../redux/actions';
// import Loading from '../Components/Loading';
import { connect } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

import { State } from '../redux/reducers';
import { Beer } from '../Models/Beer.model';

import BeerBadge from '../Components/BeerBadge';
import { ScrollView } from 'react-native-gesture-handler';

function Beerdex({ user, populateBeerdex, populateDrunkBeers, beerdex }: any) {
  useEffect(() => {
    populateBeerdex();

    populateDrunkBeers(orderDrunkBeers());
  }, []);

  console.log('😍 Beerdex.tsx, line 13 hi!!!!!: ', user.drunkBeers);

  function orderDrunkBeers() {
    let beerIds: number[] = [];
    user.Locations.map((entry: any) => {
      beerIds.push(entry.beerId);
    });
    return beerIds;
  }

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <View style={styles.screen}>
        <Text style={styles.heading}>BEERDEX</Text>
        <ScrollView>
          <View style={styles.logoContainer}>
            {user.drunkBeers && user.drunkBeers.length
              ? user.drunkBeers.map((entry: any, index: number) => (
                  <BeerBadge style={styles.drunkBadge} key={index} beer={entry} />
                ))
              : null}
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
    user: state.user,
    beerdex: state.beerdex,
  };
}

function mapDispatch(dispatch: any) {
  return {
    populateBeerdex: () => dispatch(getBeerdex()),
    populateDrunkBeers: (beerIds: []) => dispatch(getDrunkBeers(beerIds)),
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
  drunkBadge: {
    height: 200,
    width: 200,
  },
  badge: {
    height: 200,
    width: 200,
    overlayColor: 'gray',
  },
});
