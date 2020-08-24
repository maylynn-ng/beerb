import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import BeerModal from '../Components/BeerModal';

const BeerBadge = ({ beer, hasDrunk }: any) => {
  const [displayModal, setDisplayModal] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setDisplayModal(true);
        }}
      >
        <View>
          <Image style={[styles.image, { opacity: hasDrunk }]} source={{ uri: beer.beerLabel }} />
        </View>
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
    padding: 5,
  },
  image: {
    height: 80,
    width: 80,
  },
});

export default BeerBadge;
