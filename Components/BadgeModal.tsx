import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Badge } from '../Models/Badge.model';
import firework from '../Animations/firework.json';

function BadgeModal({ badge }: { badge: Badge }) {
  return (
    <View style={styles.screen}>
      <LottieView style={styles.firework} source={firework} autoPlay={true} loop={true} />
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
  firework: {
    position: 'absolute',
    height: 400,
    width: 400,
  },
});

export default BadgeModal;
