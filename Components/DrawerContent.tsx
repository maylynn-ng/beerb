import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import store from '../redux/store';

function DrawerContent(props: any) {
  const state = store.getState();

  const { user } = state;
  const { currentBorough } = state;

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ marginTop: 15 }}>
              <Image source={require('../assets/logo.png')} style={{ width: 100, height: 100 }} />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Text style={styles.title}>{user.name}</Text>
                <Text style={styles.caption}>{currentBorough.boroughName}</Text>
              </View>
            </View>
          </View>

          <View style={styles.drawerSection}>
            <DrawerItem
              icon={() => <Image source={require('../assets/map.png')} style={styles.icon} />}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={() => <Image source={require('../assets/userIcon.png')} style={styles.icon} />}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              icon={() => <Image source={require('../assets/star.png')} style={styles.icon} />}
              label="Favorites"
              onPress={() => {
                props.navigation.navigate('Favorites');
              }}
            />
            <DrawerItem
              icon={() => (
                <Image source={require('../assets/food-and-restaurant.png')} style={styles.icon} />
              )}
              label="Beerdex"
              onPress={() => {
                props.navigation.navigate('Beerdex');
              }}
            />
            <DrawerItem
              icon={() => <Image source={require('../assets/ribbon.png')} style={styles.icon} />}
              label="Achievements"
              onPress={() => {
                props.navigation.navigate('Achievements');
              }}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => <Image source={require('../assets/close.png')} style={styles.icon} />}
          label="Sign Out"
          onPress={() => {
            store.dispatch({ type: 'LOGOUT', payload: user });
          }}
        />
      </View>
    </View>
  );
}

function mapStateToProps(state: any) {
  return {
    currentBorough: state.currentBorough,
    searchTerm: state.searchTerm,
    beerSearchResults: state.beerSearchResults,
    user: state.user,
    location: state.location,
    beerFrequency: state.user.beerFreqs,
    boroughCounter: state.user.boroughCounter,
  };
}

export default connect(mapStateToProps, () => {})(DrawerContent);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    height: 30,
    width: 30,
  },
});
