import React, { useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import BeerModal from '../Components/BeerModal';
import { Beer } from '../Models/Beer.model';

const BeerBadge = ({ beer, hasDrunk }: { beer: Beer; hasDrunk: number }) => {
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
          <Text style={styles.badgeTitle}>{beer.beerName}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        isVisible={displayModal}
        statusBarTranslucent={true}
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
  badgeTitle: {
    fontSize: 13,
    maxWidth: 80,
    textAlign: 'center',
    marginTop: 5,
  },
  image: {
    height: 80,
    width: 80,
  },
});

export default BeerBadge;
