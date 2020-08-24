import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { logoutUser } from '../redux/actions';

function Logout({ logout }: any) {
  const logOut = () => {
    AsyncStorage.setItem('@session_token', '').then(data => {
      logout({
        Locations: [],
        boroughCounter: {},
      });
    });
  };

  return (
    <View style={{ height: '100%' }}>
      <TouchableOpacity style={styles.menuRoutes} onPress={() => logOut()}>
        <Text style={styles.menuText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

function mapDispatch(dispatch: any) {
  return {
    logout: (user: object) => dispatch(logoutUser(user)),
  };
}

export default connect(() => ({}), mapDispatch)(Logout);

const styles = StyleSheet.create({
  menuRoutes: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 30,
  },
  menuText: {
    fontSize: 30,
  },
});
