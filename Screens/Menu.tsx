import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Modal, Image } from 'react-native';

function Menu({ navigation }: any) {
  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../assets/close.png')} style={styles.closeMenu} />
      </TouchableOpacity>

      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.menuRoutes}>
          <Text style={styles.menuText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuRoutes} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuRoutes}
          onPress={() => navigation.navigate('Achievements')}
        >
          <Text style={styles.menuText}>Achievements</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRoutes} onPress={() => navigation.navigate('Beerdex')}>
          <Text style={styles.menuText}>Beerdex</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuRoutes}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text style={styles.menuText}>Favorites</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Menu;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  menuRoutes: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 30,
  },
  menuText: {
    fontSize: 30,
  },
  closeMenu: {
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
    marginTop: 15,
    marginRight: 15,
    opacity: 0.5,
  },
});
