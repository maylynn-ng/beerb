import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AddBeer from './AddBeerModal';
import ShortProfile from './ShortProfile';

const Navbar = ({ navigation, location, lastBeer, takeScreenShot }: any) => {
  const [isShownAddBeer, setIsShownAddBeer] = useState(false);
  const toggleAddBeer = () => {
    setIsShownAddBeer(!isShownAddBeer);
  };

  const [isShownShortProfile, setIsShownShortProfile] = useState(false);
  const toggleShortProfile = () => {
    setIsShownShortProfile(!isShownShortProfile);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navbarBtn}
        onPress={() => {
          toggleShortProfile();
        }}
      >
        <Image source={require('../assets/user.png')} style={styles.navbarPic} />
      </TouchableOpacity>
      <ShortProfile
        isShownShortProfile={isShownShortProfile}
        toggleShortProfile={toggleShortProfile}
        lastBeer={lastBeer}
        takeScreenShot={takeScreenShot}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          toggleAddBeer();
        }}
      >
        <Text style={styles.plusSign}>+</Text>
      </TouchableOpacity>
      <AddBeer isShownAddBeer={isShownAddBeer} toggleAddBeer={toggleAddBeer} />
      <TouchableOpacity
        style={styles.navbarBtn}
        onPress={() => {
          console.info('link to random beer/location');
        }}
      >
        <Image source={require('../assets/discover.png')} style={styles.navbarPic} />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '10%',
    backgroundColor: 'gold',
    zIndex: 1,
  },
  addBtn: {
    position: 'relative',
    top: (windowHeight * 0.1) / 2 - 50,
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    elevation: 10,
  },
  navbarPic: {
    width: 50,
    height: 50,
  },
  plusSign: {
    top: -13,
    fontSize: 90,
    height: '100%',
    color: 'gold',
  },
  navbarBtn: {
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
