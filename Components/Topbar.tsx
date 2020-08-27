import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { User } from '../Models/User.model';
import { Borough } from '../Models/Borough.model';
import { Badge } from '../Models/Badge.model';

function Topbar({
  navigation,
  user,
  currentBorough,
  allBadges,
}: {
  navigation: any;
  user: User;
  currentBorough?: Borough;
  allBadges?: Badge[];
}): JSX.Element {
  const route = useRoute();

  return (
    <View style={styles.topBar}>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.burgerMenuTouch}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Image source={require('../assets/open-menu.png')} style={styles.burgerMenu} />
        </TouchableOpacity>
      </View>
      {route.name !== 'Home' && <Text style={styles.title}>{route.name}</Text>}
      {route.name === 'Beerdex' && (
        <View style={styles.currentView}>
          <Text>Discovered: {user.drunkBeers.length}</Text>
        </View>
      )}
      {route.name === 'Home' && (
        <>
          <Text style={[styles.title, { fontSize: 20 }]}>
            {currentBorough && currentBorough.boroughName}
          </Text>
          <View style={styles.currentView}>
            <Text style={styles.currentBoroughName}>
              {Object.keys(user.boroughCounter).length}
              <Text style={{ fontSize: 20, opacity: 0.6 }}>/33</Text>
            </Text>
          </View>
        </>
      )}
      {route.name === 'Achievements' && allBadges && (
        <View style={styles.currentView}>
          <Text style={styles.badgeCount}>
            {user.badges.length}/{allBadges.length}
          </Text>
        </View>
      )}
    </View>
  );
}

export default Topbar;

const styles = StyleSheet.create({
  menuContainer: {
    width: '50%',
    height: 40,
  },
  burgerMenu: {
    width: 30,
    height: 30,
    opacity: 0.9,
  },
  burgerMenuTouch: {
    flex: 1,
    width: 30,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 10,
    zIndex: 2,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    height: 'auto',
    paddingHorizontal: 10,
    backgroundColor: 'gold',
    elevation: 10,
    width: Dimensions.get('screen').width,
  },
  currentView: {
    width: 'auto',
    height: 25,
    justifyContent: 'center',
  },
  title: {
    opacity: 0.6,
    fontSize: 22,
    position: 'absolute',
    width: Dimensions.get('screen').width,
    textAlign: 'center',
  },
  currentBoroughName: {
    fontSize: 27,
    marginLeft: 10,
  },
  badgeCount: {
    fontSize: 24,
  },
});
