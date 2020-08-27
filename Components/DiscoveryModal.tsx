import React, { useEffect, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import GestureRecognizer from 'react-native-swipe-gestures';
import { InitialBeer, Beer } from '../Models/Beer.model';
import BeerModal from '../Components/BeerModal';
import { DB_LOCALHOST } from '../redux/actions';
import { Borough, InitialBorough } from '../Models/Borough.model';

const DiscoveryModal = ({
  isShownDiscovery,
  toggleDiscovery,
  boroughs,
}: {
  isShownDiscovery: boolean;
  toggleDiscovery: () => void;
  boroughs: Borough[];
}): JSX.Element => {
  const [discoveryBeer, setDiscoveryBeer] = useState(InitialBeer);
  const [discoveryBorough, setDiscoveryBorough] = useState(InitialBorough);
  const [isShownBeerModal, setIsShownBeerModal] = useState(false);
  const [activated, setActivated] = useState(false);
  const [wiggleAnimation, setwiggleAnimation] = useState(new Animated.Value(0));

  const fetchBeer = (): void => {
    fetch(`${DB_LOCALHOST}/discover`)
      .then(res => {
        if (res.status >= 400) throw new Error('🔴 Error fetching new discovery beer');
        return res;
      })
      .then(res => res.json())
      .then((res: Beer) => {
        setDiscoveryBeer(res);
      })
      .catch(err => {
        ToastAndroid.show('Our server is drunk, no new beers to discover', ToastAndroid.SHORT);
      });
  };

  useEffect(() => {
    fetchBeer();
    const randomIndex: number = Math.floor(Math.random() * 33);
    setDiscoveryBorough(boroughs[randomIndex]);
  }, []);

  const handlePress = (): void => {
    setIsShownBeerModal(!isShownBeerModal);
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const swipe = (direction: string): void => {
    startAnimation(direction);
    fetchBeer();
    const randomIndex: number = Math.floor(Math.random() * 33);
    setDiscoveryBorough(boroughs[randomIndex]);
  };

  const startAnimation = (direction: string): void => {
    setActivated(!activated);

    Animated.sequence([
      Animated.timing(wiggleAnimation, {
        useNativeDriver: true,
        toValue: direction === 'r' ? 40 : -40,
        duration: 0,
      }),
      Animated.timing(wiggleAnimation, {
        useNativeDriver: true,
        toValue: direction === 'r' ? -40 : 40,
        duration: 0,
      }),
      Animated.spring(wiggleAnimation, {
        useNativeDriver: true,
        toValue: 0,
        friction: 2,
        tension: 140,
      }),
    ]).start();
  };

  const animatedStyles = {
    wiggle: {
      transform: [
        {
          translateX: wiggleAnimation,
        },
      ],
    },
  };

  return (
    <>
      {isShownDiscovery && (
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
          <GestureRecognizer
            onSwipeLeft={() => swipe('l')}
            onSwipeRight={() => swipe('r')}
            config={config}
          >
            <TouchableWithoutFeedback>
              <Animated.View style={[styles.mainContainer, animatedStyles.wiggle]}>
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
              </Animated.View>
            </TouchableWithoutFeedback>
          </GestureRecognizer>
          <Modal
            isVisible={isShownBeerModal}
            statusBarTranslucent={true}
            onBackdropPress={() => {
              setIsShownBeerModal(false);
            }}
          >
            <BeerModal beer={discoveryBeer} />
          </Modal>
        </Modal>
      )}
    </>
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
