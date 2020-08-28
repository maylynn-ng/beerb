import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { logoutUser } from '../redux/actions';
import { AppDispatch, Action } from '../Models/Redux.model';
import { Borough } from '../Models/Borough.model';
import { State } from '../redux/reducers';

function DrawerContent({
  picture,
  nickname,
  currentBorough,
  navigation,
  logout,
}: {
  picture: string;
  nickname: string;
  currentBorough: Borough;
  navigation: any;
  logout: () => Action;
}): JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ marginTop: 15 }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('Home');
                }}
              >
                <Image
                  source={require('../assets/logo.png')}
                  style={{ width: 130, height: 100, marginHorizontal: 55, marginBottom: 50 }}
                />
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => {
                  navigation.navigate('Profile');
                }}
              >
                <Image
                  source={{ uri: picture }}
                  style={{
                    borderRadius: 80,
                    alignSelf: 'center',
                    marginLeft: 0,
                    marginRight: 10,
                    width: 55,
                    height: 55,
                  }}
                />
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.title}>{nickname}</Text>
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
                navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={() => <Image source={require('../assets/user.png')} style={styles.icon} />}
              label="Profile"
              onPress={() => {
                navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              icon={() => <Image source={require('../assets/beer.png')} style={styles.icon} />}
              label="Beerdex"
              onPress={() => {
                navigation.navigate('Beerdex');
              }}
            />
            <DrawerItem
              icon={() => <Image source={require('../assets/medal.png')} style={styles.icon} />}
              label="Achievements"
              onPress={() => {
                navigation.navigate('Achievements');
              }}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => <Image source={require('../assets/logout.png')} style={styles.icon} />}
          label="Sign Out"
          onPress={() => logout()}
        />
      </View>
    </View>
  );
}

function mapStateToProps(state: State) {
  return {
    currentBorough: state.currentBorough,
    picture: state.user.picture,
    nickname: state.user.nickname,
    location: state.location,
    beerFrequency: state.user.beerFreqs,
    boroughCounter: state.user.boroughCounter,
  };
}

function mapDispatch(dispatch: AppDispatch) {
  return {
    logout: () => dispatch(logoutUser()),
  };
}

export default connect(mapStateToProps, mapDispatch)(DrawerContent);

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
    marginTop: 35,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: -9,
    marginLeft: 13,
  },
});
