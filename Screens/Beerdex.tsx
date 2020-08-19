import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import Loading from '../Components/Loading';
import { connect } from 'react-redux';

import { State } from '../redux/reducers';
import { Beer } from '../Models/Beer.model';
import { fetchTrending } from '../redux/actions';

import BeerBadge from '../Components/BeerBadge';

function Beerdex({ trendingBeersList, setTrendingBeers }: any) {
  console.log({ trendingBeersList });

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Text style={styles.heading}>BEERDEX</Text>
        <View style={styles.logoContainer}>
          {trendingBeersList && trendingBeersList.length ? (
            trendingBeersList.map((beer: Beer, index: number) => (
              <BeerBadge key={index} beer={beer} />
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
    marginHorizontal: 10,
  },
});
