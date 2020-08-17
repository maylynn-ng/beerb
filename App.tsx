import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import {
  StyleSheet,
  Platform,
  Text,
  StatusBar as StatBar,
  SafeAreaView,
  Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import reducer from './redux/reducers/storeBorough';

import boroughs from './assets/london_sport.json';
import MapScreen from './Screens/MapScreen';
import { storeBorough } from './redux/actions/actions';
import Menu from './Screens/Menu';
import Profile from './Screens/Profile';
import Favorites from './Screens/Favorites';
import Beerdex from './Screens/Beerdex';
import Achievements from './Screens/Achievements';

const store = createStore(reducer);

function Root({ currentBorough, setBorough }: any) {
  const handlePress = (name: string): void => {
    setBorough(name);
  };

  function HomeScreen({ navigation }: any) {
    return (
      <SafeAreaView style={styles.container}>
        <Button
          title="menu"
          onPress={() => {
            navigation.navigate('Modal');
          }}
        />
        <Text>You're in {currentBorough}</Text>
        <MapScreen handlePress={handlePress} boroughs={boroughs} />
      </SafeAreaView>
    );
  }

  const RootStack = createStackNavigator();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Modal" component={Menu} />
        <RootStack.Screen name="Profile" component={Profile} />
        <RootStack.Screen name="Favorites" component={Favorites} />
        <RootStack.Screen name="Beerdex" component={Beerdex} />
        <RootStack.Screen name="Achievements" component={Achievements} />
      </RootStack.Navigator>
    </NavigationContainer>
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
    marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatBar.currentHeight : 0,
  },
});
