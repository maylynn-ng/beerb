import React, { useEffect, useState } from 'react';
import { getBeerdex, getDrunkBeers, changeLoading, setDrunkIds } from '../redux/actions';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { State } from '../redux/reducers';
import { Beer } from '../Models/Beer.model';
import { AppDispatch, Action } from '../Models/Redux.model';

import BeerBadge from '../Components/BeerBadge';
import { ScrollView } from 'react-native-gesture-handler';
import Topbar from '../Components/Topbar';

function Beerdex({
  user,
  populateBeerdex,
  populateDrunkBeers,
  beerdex,
  setLoading,
  populateDrunkIds,
  navigation,
  favouriteBeers,
}: any) {
  const [filterBeers, setFilterBeers] = useState(false);

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

  const handleFilter = (selector: string) => {
    selector ? setFilterBeers(true) : setFilterBeers(false);
  };

  function orderDrunkBeers() {
    const uniqueBeers = Array.from(new Set(user.Locations.map((entry: any) => entry.beerId)));
    populateDrunkIds(uniqueBeers);
    populateDrunkBeers(uniqueBeers);
  }

  return (
    <>
      <Topbar navigation={navigation} user={user} />
      <SafeAreaView>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.filterSelector} onPress={() => handleFilter('')}>
            <Text style={{ fontSize: 20 }}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterSelector} onPress={() => handleFilter('favs')}>
            <Text style={{ fontSize: 20 }}>Favourites</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.logoContainer}>
            {user.uniqueDrunkIds && user.uniqueDrunkIds.length
              ? filterBeers
                ? user.drunkBeers
                    .filter((beer: Beer) => favouriteBeers.has(beer.beerId))
                    .map(
                      (entry: any, index: number) =>
                        entry && (
                          <BeerBadge style={styles.badge} hasDrunk={1} key={index} beer={entry} />
                        )
                    )
                : user.drunkBeers.map(
                    (entry: any, index: number) =>
                      entry && (
                        <BeerBadge style={styles.badge} hasDrunk={1} key={index} beer={entry} />
                      )
                  )
              : null}
            {beerdex && beerdex.length
              ? filterBeers
                ? beerdex
                    .filter((beer: Beer) => favouriteBeers.has(beer.beerId))
                    .map((beer: Beer, index: number) => {
                      console.log(user.drunkBeers);
                      if (user.uniqueDrunkIds.indexOf(beer.beerId) === -1) {
                        return (
                          <BeerBadge style={styles.badge} hasDrunk={0.3} key={index} beer={beer} />
                        );
                      }
                    })
                : beerdex.map((beer: Beer, index: number) => {
                    if (user.uniqueDrunkIds.indexOf(beer.beerId) === -1) {
                      return (
                        <BeerBadge style={styles.badge} hasDrunk={0.3} key={index} beer={beer} />
                      );
                    }
                  })
              : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

function mapStateToProps(state: State) {
  return {
    user: state.user,
    beerdex: state.beerdex,
    favouriteBeers: state.user.favouriteBeers,
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
  filterSelector: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    paddingVertical: 15,
    borderRightColor: '#e2e2e2',
    borderRightWidth: 1,
  },
});
