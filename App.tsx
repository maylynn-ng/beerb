import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StyleSheet, Platform, Text, StatusBar as StatBar, SafeAreaView } from 'react-native';
//import rootReducer from './redux/reducers';
import storeBoroughReducer from './redux/reducers/storeBorough.tsx';

import boroughs from './assets/london_sport.json';
import MapScreen from './Screens/MapScreen';
import { useSelector, useDispatch } from 'react-redux';
import { storeBorough } from './redux/actions/actions.tsx';

const store = createStore(storeBoroughReducer);
store.subscribe(() => {
  console.log(store.getState());
});

function Root() {
  const dispatch = useDispatch();

  const handlePress = (name: String): void => {
    console.info(name);
    dispatch(storeBorough(name));
  };

  const borough = useSelector(state => state.currentBorough);

  return (
    <SafeAreaView style={styles.container}>
      <Text>You're in {borough}</Text>
      <MapScreen handlePress={handlePress} boroughs={boroughs} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Root></Root>
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
