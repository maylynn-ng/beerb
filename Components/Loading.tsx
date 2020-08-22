import React from 'react';

import { View, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('screen').width,
      }}
    >
      {console.log('animating...')}
      <Video
        source={require('../assets/LoadingVideos/19713-six-pack-beer.mp4')}
        rate={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
};

export default Loading;
