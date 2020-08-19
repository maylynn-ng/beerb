import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from '../Screens/Menu';
import Profile from '../Screens/Profile';
import Favorites from '../Screens/Favorites';
import Beerdex from '../Screens/Beerdex';
import Achievements from '../Screens/Achievements';
import HomeScreen from '../Screens/HomeScreen';

const Navigation = () => {
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
};

export default Navigation;
