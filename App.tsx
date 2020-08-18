import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  StyleSheet,
  Platform,
  Text,
  TextInput,
  StatusBar as StatBar,
  SafeAreaView,
} from 'react-native';
import ReduxThunk from 'redux-thunk';

import reducer, { State } from './redux/reducers';
import boroughs from './assets/london_sport.json';
import MapScreen from './Screens/MapScreen';
import { storeBorough, fetchBeers } from './redux/actions/actions';

const store = createStore(reducer, applyMiddleware(ReduxThunk));
// store.subscribe(() => {
//   console.log(store.getState());
// });

function Root({ currentBorough, beerSearchResults, searchTerm, setBorough, fetchBeers }: any) {
  const handlePress = (name: string): void => {
    setBorough(name);
  };

  // to check we are getting results
  // strange behaviour that they only show if you select a borough
  console.log('🌵🌵🌵🌵🌵SEARCH RESULTS', beerSearchResults);

  return (
    <SafeAreaView style={styles.container}>
      <Text>You're in {currentBorough}</Text>
      <TextInput
        placeholder="Search Beer"
        enablesReturnKeyAutomatically={true}
        autoCapitalize="words"
        onChangeText={searchTerm => {
          fetchBeers(searchTerm);
        }}
        returnKeyLabel="done"
        value={searchTerm}
      />
      <MapScreen handlePress={handlePress} boroughs={boroughs} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function mapStateToProps(state: State) {
  return {
    currentBorough: state.currentBorough,
    searchTerm: state.searchTerm,
    beerSearchResults: state.beerSearchResults,
  };
}

function mapDispatch(dispatch: any) {
  return {
    setBorough: (name: string) => dispatch(storeBorough(name)),
    fetchBeers: (searchTerm: string) => dispatch(fetchBeers(searchTerm)),
  };
}

const ConnectRoot = connect(mapStateToProps, mapDispatch)(Root);

export default function App() {
  return (
    <Provider store={store}>
      <ConnectRoot></ConnectRoot>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatBar.currentHeight : 0,
  },
});
