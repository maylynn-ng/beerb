import React, { useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { getBeerdex, getDrunkBeers, changeLoading, setDrunkIds } from '../redux/actions';
import { connect } from 'react-redux';
import { State } from '../redux/reducers';
import { Beer } from '../Models/Beer.model';
import { AppDispatch, Action } from '../Models/Redux.model';

import BeerBadge from '../Components/BeerBadge';
import { ScrollView } from 'react-native-gesture-handler';

function Beerdex({
  user,
  populateBeerdex,
  populateDrunkBeers,
  beerdex,
  setLoading,
  populateDrunkIds,
}: any) {
  useEffect(() => {
    setLoading(true);
    populateBeerdex();
    orderDrunkBeers();
  }, []);

  useEffect(() => {
    if (beerdex && beerdex.length) {
      setLoading(false);
    }
  }, [beerdex]);

  function orderDrunkBeers() {
    const uniqueBeers = Array.from(new Set(user.Locations.map((entry: any) => entry.beerId)));
    populateDrunkIds(uniqueBeers);
    populateDrunkBeers(uniqueBeers);
  }
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <View style={styles.topBar}>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.burgerMenuTouch}
              onPress={() => {
                navigation.push('Modal');
              }}
            >
              <Image source={require('../assets/menu.png')} style={styles.burgerMenu} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>BEERDEX</Text>
          <View style={styles.currentView}>
            <Text>You've had {user.drunkBeers.length}</Text>
            <Text>unique beer{user.drunkBeers.length !== 1 ? 's' : ''}</Text>
          </View>
        </View>
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
            {beerdex && beerdex.length
              ? beerdex.map((beer: Beer, index: number) => {
                  if (user.drunkBeers.indexOf(beer.beerId) === -1) {
                    return (
                      <BeerBadge style={styles.badge} hasDrunk={0.3} key={index} beer={beer} />
                    );
                  }
                })
              : null}
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

function mapDispatch(dispatch: AppDispatch) {
  return {
    populateBeerdex: () => dispatch(getBeerdex()),
    populateDrunkBeers: (beerIds: []) => dispatch(getDrunkBeers(beerIds)),
    setLoading: (status: boolean): Action => dispatch(changeLoading(status)),
    populateDrunkIds: (drunkIds: number[]): Action => dispatch(setDrunkIds(drunkIds)),
  };
}

export default connect(mapStateToProps, mapDispatch)(Beerdex);

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  menuContainer: {
    width: '50%',
    height: 40,
  },
  burgerMenu: {
    width: 30,
    height: 30,
  },
  burgerMenuTouch: {
    flex: 1,
    width: 30,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 10,
    zIndex: 2,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    height: 'auto',
    paddingHorizontal: 10,
    backgroundColor: 'gold',
    elevation: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  currentView: {
    width: 'auto',
    height: 25,
    justifyContent: 'center',
  },
  title: {
    opacity: 0.6,
    fontSize: 25,
    position: 'absolute',
    width: Dimensions.get('screen').width,
    textAlign: 'center',
  },
  badge: {
    height: 200,
    width: 200,
  },
});
