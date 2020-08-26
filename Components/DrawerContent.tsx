import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedbackComponent } from 'react-native';
import { connect } from 'react-redux';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import store from '../redux/store';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
              <TouchableWithoutFeedback
                onPress={() => {
                  props.navigation.navigate('Home');
                }}
              >
                <Image
                  source={require('../assets/logo.png')}
                  style={{ width: 100, height: 100, marginHorizontal: 70 }}
                />
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => {
                  props.navigation.navigate('Profile');
                }}
              >
                <Image
                  source={{ uri: user.picture }}
                  style={[
                    styles.icon,
                    {
                      borderRadius: 15,
                      alignSelf: 'center',
                      marginRight: 10,
                      left: -1,
                    },
                  ]}
                />
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.title}>{user.nickname}</Text>
                  <Text style={styles.caption}>{currentBorough.boroughName}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View style={styles.drawerSection}>
            <DrawerItem
              icon={() => <Image source={require('../assets/map3.png')} style={styles.icon} />}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={() => <Image source={require('../assets/user.png')} style={styles.icon} />}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              icon={() => <Image source={require('../assets/beer.png')} style={styles.icon} />}
              label="Beerdex"
              onPress={() => {
                props.navigation.navigate('Beerdex');
              }}
            />
            <DrawerItem
              icon={() => <Image source={require('../assets/medal.png')} style={styles.icon} />}
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
          icon={() => <Image source={require('../assets/logout.png')} style={styles.icon} />}
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

export default connect(mapStateToProps, () => ({}))(DrawerContent);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
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
