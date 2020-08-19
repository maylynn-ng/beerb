import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StyleSheet, Platform, StatusBar as StatBar, SafeAreaView } from 'react-native';

import reducer from './redux/reducers';
import ReduxThunk from 'redux-thunk';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from './Screens/Menu';
import Profile from './Screens/Profile';
import Favorites from './Screens/Favorites';
import Beerdex from './Screens/Beerdex';
import Achievements from './Screens/Achievements';
import HomeScreen from './Screens/HomeScreen';

const store = createStore(reducer, applyMiddleware(ReduxThunk));

export default function App() {
  const RootStack = createStackNavigator();

  return (
    <Provider store={store}>
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
