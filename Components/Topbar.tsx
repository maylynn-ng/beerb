import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';

function Topbar({ navigation, user, currentBorough }: any) {
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
          <Image source={require('../assets/menu.png')} style={styles.burgerMenu} />
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
          <Text style={styles.title}>{currentBorough.boroughName}</Text>
          <View style={styles.currentView}>
            <Text style={styles.currentBoroughName}>
              {Object.keys(user.boroughCounter).length}/33
            </Text>
          </View>
        </>
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
  logoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 5,
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
    fontSize: 25,
    marginLeft: 10,
  },
});
