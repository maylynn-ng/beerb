import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { StyleSheet, Platform, Text, StatusBar as StatBar, SafeAreaView } from 'react-native';

import reducer from './redux/reducers/storeBorough';

import boroughs from './assets/london_sport.json';
import MapScreen from './Screens/MapScreen';
import { storeBorough } from './redux/actions/actions';

const store = createStore(reducer);
// store.subscribe(() => {
//   console.log(store.getState());
// });

function Root({ currentBorough, setBorough }: any) {
  const handlePress = (name: string): void => {
    setBorough(name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>You're in {currentBorough}</Text>
      <MapScreen handlePress={handlePress} boroughs={boroughs} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function mapStateToProps(state: any) {
  return {
    currentBorough: state.currentBorough,
  };
}

function mapDispatch(dispatch: any) {
  return {
    setBorough: (name: string) => dispatch(storeBorough(name)),
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
