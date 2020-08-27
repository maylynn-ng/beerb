import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Profile from '../Screens/Profile';
import Beerdex from '../Screens/Beerdex';
import Achievements from '../Screens/Achievements';
import HomeScreen from '../Screens/HomeScreen';
import DrawerContent from './DrawerContent';

const Navigation = (): JSX.Element => {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        initialRouteName="Home"
        drawerContentOptions={{
          activeTintColor: 'black',
          activeBackgroundColor: 'gold',
          itemStyle: { marginVertical: 5 },
          inactiveTintColor: 'black',
        }}
        drawerType="slide"
        drawerStyle={{
          backgroundColor: 'whitesmoke',
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Beerdex" component={Beerdex} />
        <Drawer.Screen name="Achievements" component={Achievements} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
