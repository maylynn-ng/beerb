import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
// import Loading from '../Components/Loading';
import { connect } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

import { State } from '../redux/reducers';
import { Beer } from '../Models/Beer.model';
import { fetchTrending, fetchDrunkBeers } from '../redux/actions';

import BeerBadge from '../Components/BeerBadge';
import { ScrollView } from 'react-native-gesture-handler';

function Beerdex({ setTrendingBeers, trendingBeersList, user, setDrunkBeers }: any) {
  const [beerList, setBeerList] = useState([]);

  useEffect(() => {
    if (user.Locations && user.Locations.length) {
      user.Locations.map((entry: any) => {
        setDrunkBeers(entry.beerId);
      });
    }

    setBeerList([...beerList, ...trendingBeersList, ...user.drunkBeers]);

    if (!trendingBeersList.length) {
      setTrendingBeers();
    }
  }, []);

  console.log('😍 Beerdex.tsx, line 13 hi!!!!!: ', beerList);

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <View style={styles.screen}>
        <Text style={styles.heading}>BEERDEX</Text>
        <ScrollView>
          <View style={styles.logoContainer}>
            {beerList && beerList.length ? (
              beerList.map((beer: Beer, index: number) => (
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
  };
}

function mapDispatch(dispatch: any) {
  return {
    setTrendingBeers: () => dispatch(fetchTrending()),
    setDrunkBeers: (id: number) => dispatch(fetchDrunkBeers(id)),
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
