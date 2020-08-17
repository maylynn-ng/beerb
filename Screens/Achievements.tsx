import React from 'react';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';

function Favorites({ navigation }: any) {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.closeMenu}
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <Image source={require('../assets/close.png')} style={styles.closeMenu} />
      </TouchableOpacity>
    </View>
  );
}

export default Favorites;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'blue',
  },
  closeMenu: {
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 10,
    opacity: 0.5,
  },
});
