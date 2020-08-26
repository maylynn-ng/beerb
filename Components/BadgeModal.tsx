import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { Badge } from '../Models/Badge.model';

function BadgeModal({ badge }: any) {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.woo}>WOO!</Text>
        <Image style={styles.badge} source={{ uri: badge.badgeImage }} />
        <Text
          style={styles.text}
        >{`Yay! You've just achieved the '${badge.badgeText}' award!`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  container: {
    padding: 20,
  },
  woo: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  badge: {
    alignSelf: 'center',
    height: 300,
    width: 300,
  },
  text: {
    textAlign: 'center',
  },
});

export default BadgeModal;
