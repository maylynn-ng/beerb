import React, { useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import Loading from '../Components/Loading';
import { connect } from 'react-redux';

import { State } from '../redux/reducers';
import { Beer } from '../Models/Beer.model';
import { fetchTrending } from '../redux/actions';

import BeerBadge from '../Components/BeerBadge';

function Beerdex({ setTrendingBeers, trendingBeersList }: any) {
  useEffect(() => {
    if (!trendingBeersList.length) {
      setTrendingBeers();
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Text style={styles.heading}>BEERDEX</Text>
        <View style={styles.logoContainer}>
          {trendingBeersList && trendingBeersList.length ? (
            trendingBeersList.map((beer: Beer, index: number) => (
              <BeerBadge style={styles.badge} key={index} beer={beer} />
            ))
          ) : (
            <Loading />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

function mapStateToProps(state: State) {
  return {
    trendingBeersList: state.trendingBeers,
  };
}

function mapDispatch(dispatch: any) {
  return {
    setTrendingBeers: () => dispatch(fetchTrending()),
  };
}

export default connect(mapStateToProps, mapDispatch)(Beerdex);

const styles = StyleSheet.create({
  screen: {
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
    marginHorizontal: 5,
  },
  badge: {
    height: 90,
    width: 90,
  },
});
