import React, { useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { getBeerdex, getDrunkBeers } from '../redux/actions';
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

  function orderDrunkBeers() {
    return Array.from(new Set(user.Locations.map((entry: any) => entry.beerId)));
  }
  console.log(user.drunkBeers);
  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <View style={styles.screen}>
        <Text style={styles.heading}>BEERDEX</Text>
        <ScrollView>
          <View style={styles.logoContainer}>
            {user.drunkBeers && user.drunkBeers.length
              ? user.drunkBeers.map(
                  (entry: any, index: number) =>
                    entry && (
                      <BeerBadge style={styles.badge} hasDrunk={1} key={index} beer={entry} />
                    )
                )
              : null}
            {beerdex && beerdex.length ? (
              beerdex.map((beer: Beer, index: number) => {
                if (orderDrunkBeers().indexOf(beer.beerId) === -1) {
                  return <BeerBadge style={styles.badge} hasDrunk={0.3} key={index} beer={beer} />;
                }
              })
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
    marginVertical: 15,
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
