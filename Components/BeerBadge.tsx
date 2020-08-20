import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import BeerModal from '../Components/BeerModal';

const BeerBadge = ({ beer }: any) => {
  const [displayModal, setDisplayModal] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setDisplayModal(true);
        }}
      >
        {beer.haveHad ? (
          <Image style={styles.image} source={{ uri: beer.beerLabel }} />
        ) : (
          <Image style={styles.grayImage} source={{ uri: beer.beerLabel }} />
        )}
      </TouchableOpacity>
      <Modal
        isVisible={displayModal}
        onBackdropPress={() => {
          setDisplayModal(false);
        }}
      >
        <BeerModal beer={beer} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  image: {
    height: 80,
    width: 80,
  },
  grayImage: {
    height: 80,
    width: 80,
    opacity: 0.3,
  },
});

export default BeerBadge;
