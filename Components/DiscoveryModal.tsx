import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { InitialBeer } from '../Models/Beer.model';
import BeerModal from '../Components/BeerModal';
const DB_LOCALHOST = process.env.EXPO_LOCALHOST;

const DiscoveryModal = ({ isShownDiscovery, toggleDiscovery, boroughs }: any) => {
  const [discoveryBeer, setDiscoveryBeer] = useState(InitialBeer);
  const [discoveryBorough, setDiscoveryBorough] = useState({});
  const [isShownBeerModal, setIsShownBeerModal] = useState(false);
  useEffect(() => {
    fetch(`${DB_LOCALHOST}/discover`)
      .then(res => res.json())
      .then(res => {
        setDiscoveryBeer(res);
      });
    const randomIndex = Math.floor(Math.random() * 33);
    setDiscoveryBorough(boroughs[randomIndex]);
  }, []);

  const handlePress = () => {
    setIsShownBeerModal(!isShownBeerModal);
  };

  return (
    isShownDiscovery && (
      <Modal
        style={{
          justifyContent: 'center',
          backgroundColor: '#000000aa',
          margin: 0,
          flex: 1,
        }}
        transparent={true}
        visible={true}
        statusBarTranslucent={true}
        onBackdropPress={() => {
          toggleDiscovery();
        }}
      >
        <View style={styles.mainContainer}>
          {console.log(discoveryBeer)}
          <Image source={{ uri: discoveryBeer.beerLabel }} style={styles.label} />
          <Text style={styles.highlightText}>Looking for a new experience? Try...</Text>
          <View>
            <TouchableOpacity style={styles.beer} onPress={() => handlePress()}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                {discoveryBeer.beerName}
              </Text>
              <Text style={{ textAlign: 'center' }}>in</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                {discoveryBorough.boroughName}
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            isVisible={isShownBeerModal}
            statusBarTranslucent={true}
            onBackdropPress={() => {
              setIsShownBeerModal(false);
            }}
          >
            <BeerModal beer={discoveryBeer} noFetching={true} />
          </Modal>
        </View>
      </Modal>
    )
  );
};

export default DiscoveryModal;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 35,
    height: 500,
  },
  beer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'gold',
    borderRadius: 10,
    marginVertical: 15,
    minWidth: '70%',
    maxWidth: '70%',
  },
  label: {
    height: 150,
    width: 150,
    marginVertical: 10,
  },
  highlightText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
  },
});
