import React from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navbarBtn}
        onPress={() => {
          console.info('link to user profile');
        }}
      >
        <Image source={require('../assets/user.png')} style={styles.navbarPic} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          console.info('register new location');
        }}
      >
        <Text style={styles.plusSign}>+</Text>
      </TouchableOpacity>
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

export default Navbar;
