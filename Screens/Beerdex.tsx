import React, { useEffect, useState } from 'react';
import SearchBar from 'react-native-dynamic-search-bar';
import { getBeerdex, changeLoading, setDrunkIds } from '../redux/actions';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { State } from '../redux/reducers';
import { Beer } from '../Models/Beer.model';
import { AppDispatch, Action } from '../Models/Redux.model';

import BeerBadge from '../Components/BeerBadge';
import { ScrollView } from 'react-native-gesture-handler';
import Topbar from '../Components/Topbar';

const initialState: Beer[] = [];

function Beerdex({
  user,
  drunkBeers,
  beerdex,
  populateDrunkIds,
  navigation,
  favouriteBeers,
  uniqueDrunkIds,
  setIsLoading,
}: any) {
  const [filterBeers, setFilterBeers] = useState(false);
  const [searchInBeerdex, setSearchInBeerdex] = useState('');
  const [beerdexBeers, setBeerdexBeers] = useState(initialState);

  useEffect(() => {
    setIsLoading(true);
    const newArray: Beer[] = [...drunkBeers];
    const newIdsArray: number[] = [];
    newArray.forEach((beer: Beer) => newIdsArray.push(beer.beerId));
    beerdex.forEach((beer: Beer) => {
      if (!newArray.some((drunkBeer: Beer) => drunkBeer.beerId === beer.beerId)) {
        newArray.push(beer);
      }
    });
    setBeerdexBeers(newArray);
    populateDrunkIds(newIdsArray);
    setIsLoading(false);
  }, [null, drunkBeers]);

  const handleFilter = (selector: string) => {
    selector ? setFilterBeers(true) : setFilterBeers(false);
  };

  return (
    <>
      <Topbar navigation={navigation} user={user} />
      <SafeAreaView style={styles.screen}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[styles.filterSelector, filterBeers ? null : { backgroundColor: '#ffe566aa' }]}
            onPress={() => handleFilter('')}
            activeOpacity={1}
          >
            <Text style={{ fontSize: 20 }}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterSelector, filterBeers ? { backgroundColor: '#ffe566aa' } : null]}
            onPress={() => handleFilter('favs')}
            activeOpacity={1}
          >
            <Text style={{ fontSize: 20 }}>Favourites</Text>
          </TouchableOpacity>
        </View>
        <SearchBar
          placeholder="Search for a beer..."
          onChangeText={value => setSearchInBeerdex(value)}
          onPressToFocus={true}
          value={searchInBeerdex}
          onPressCancel={() => setSearchInBeerdex('')}
          height={35}
          shadowStyle={{
            borderColor: '#ffe566aa',
            borderWidth: 2,
            marginTop: 5,
            elevation: 1,
          }}
          fontColor="#202020aa"
          iconColor="#202020aa"
          cancelIconColor="#c6c6c6"
          fontSize={14}
        />
        <ScrollView>
          <View style={styles.logoContainer}>
            {filterBeers
              ? beerdexBeers
                  .filter((beer: Beer) => {
                    const searchString =
                      '' +
                      beer.beerName +
                      ' ' +
                      beer.breweryCountry +
                      ' ' +
                      beer.breweryName +
                      ' ' +
                      beer.beerStyle;
                    return (
                      favouriteBeers.has(beer.beerId) &&
                      searchString.toLowerCase().includes(searchInBeerdex.toLowerCase())
                    );
                  })
                  .map((entry: any, index: number) => {
                    let hasDrunk: number = 1;
                    if (!uniqueDrunkIds.includes(entry.beerId)) hasDrunk = 0.3;
                    return (
                      <BeerBadge
                        style={styles.badge}
                        hasDrunk={hasDrunk}
                        key={index}
                        beer={entry}
                      />
                    );
                  })
              : beerdexBeers
                  .filter((beer: Beer) => {
                    const searchString =
                      '' +
                      beer.beerName +
                      ' ' +
                      beer.breweryCountry +
                      ' ' +
                      beer.breweryName +
                      ' ' +
                      beer.beerStyle;
                    return searchString.toLowerCase().includes(searchInBeerdex.toLowerCase());
                  })
                  .map((entry: any, index: number) => {
                    let hasDrunk: number = 1;
                    if (!uniqueDrunkIds.includes(entry.beerId)) hasDrunk = 0.3;
                    return (
                      <BeerBadge
                        style={styles.badge}
                        hasDrunk={hasDrunk}
                        key={index}
                        beer={entry}
                      />
                    );
                  })}
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
    drunkBeers: state.user.drunkBeers,
    uniqueDrunkIds: state.user.uniqueDrunkIds,
  };
}

function mapDispatch(dispatch: AppDispatch) {
  return {
    populateDrunkIds: (drunkIds: number[]): Action => dispatch(setDrunkIds(drunkIds)),
    setIsLoading: (status: boolean) => dispatch(changeLoading(status)),
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
    marginBottom: 60,
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
