import React, { useEffect, useState } from 'react';
import SearchBar from 'react-native-dynamic-search-bar';
import { changeLoading, setDrunkIds } from '../redux/actions';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { State } from '../redux/reducers';
import { Beer } from '../Models/Beer.model';
import { AppDispatch, Action } from '../Models/Redux.model';
import BeerBadge from '../Components/BeerBadge';
import { ScrollView } from 'react-native-gesture-handler';
import Topbar from '../Components/Topbar';
import { User } from '../Models/User.model';

const initialBeerdexBeers: Beer[] = [];

function Beerdex({
  user,
  drunkBeers,
  beerdex,
  populateDrunkIds,
  navigation,
  favouriteBeers,
  uniqueDrunkIds,
  setIsLoading,
}: {
  user: User;
  drunkBeers: Beer[];
  beerdex: Beer[];
  populateDrunkIds: (drunkIds: number[]) => Action;
  navigation: any;
  favouriteBeers: Set<Object>;
  uniqueDrunkIds: number[];
  setIsLoading: (status: boolean) => Action;
}): JSX.Element {
  const [filterBeers, setFilterBeers] = useState(false);
  const [searchInBeerdex, setSearchInBeerdex] = useState('');
  const [beerdexBeers, setBeerdexBeers] = useState(initialBeerdexBeers);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const newArray: Beer[] = [...drunkBeers];
    const newIdsArray: number[] = [];
    drunkBeers.forEach((beer: Beer) => newIdsArray.push(beer.beerId));
    beerdex.forEach((beer: Beer) => {
      if (!drunkBeers.some((drunkBeer: Beer) => drunkBeer.beerId === beer.beerId)) {
        newArray.push(beer);
      }
    });
    setBeerdexBeers(newArray);
    populateDrunkIds(newIdsArray);
  }, [null, drunkBeers]);

  useEffect(() => {
    if (beerdexBeers.length) setIsLoading(false);
  }, [beerdexBeers]);

  const handleFilter = (selector: string): void => {
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
          onChangeText={(value: string) => setSearchInBeerdex(value)}
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
                    return <BeerBadge hasDrunk={hasDrunk} key={index} beer={entry} />;
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
                    return <BeerBadge hasDrunk={hasDrunk} key={index} beer={entry} />;
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
    setIsLoading: (status: boolean): Action => dispatch(changeLoading(status)),
  };
}

export default connect(mapStateToProps, mapDispatch)(Beerdex);

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  logoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 60,
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
