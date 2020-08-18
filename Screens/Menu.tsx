import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { setUserInfo } from '../redux/actions';

function Menu({ navigation, setUser }: any) {
  const logOut = () => {
    AsyncStorage.setItem('@session_token', '').then(data => {
      setUser({});
    });
  };

  return (
    <>
      <TouchableOpacity
        style={styles.closeMenu}
        onPress={() => {
          navigation.goBack();
        }}
      >
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
        <TouchableOpacity style={styles.menuRoutes} onPress={() => logOut()}>
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function mapDispatch(dispatch: any) {
  return {
    setUser: (user: object) => dispatch(setUserInfo(user)),
  };
}

export default connect(() => ({}), mapDispatch)(Menu);

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
