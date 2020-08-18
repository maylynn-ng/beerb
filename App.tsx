import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StyleSheet, Platform, StatusBar as StatBar, SafeAreaView } from 'react-native';

import reducer from './redux/reducers';
import ReduxThunk from 'redux-thunk';

import HomeScreen from './Screens/HomeScreen';

const store = createStore(reducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <HomeScreen />
        <StatusBar style="auto" />
      </SafeAreaView>
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
