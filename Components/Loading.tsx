import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
LottieView = require('lottie-react-native');

import loadingBottles from '../Animations/sixPackLoading.json';

const Loading = () => {
  const loadingBottlesAnimation = useRef(null);
  return (
    <LottieView
      style={styles.loading}
      ref={loadingBottlesAnimation}
      autoPlay={true}
      loop={true}
      source={loadingBottles}
    />
  );
};

const styles = StyleSheet.create({
  loading: {
    height: 300,
    width: 300,
    alignSelf: 'center',
  },
});

export default Loading;
