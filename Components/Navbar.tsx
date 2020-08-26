import React, { useState } from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import AddBeer from './AddBeerModal';
import { connect } from 'react-redux';
import { fetchPlacesNearby, changeLoading } from '../redux/actions';

import ShortProfile from './ShortProfile';
import DiscoveryModal from './DiscoveryModal';

const Navbar = ({
  location,
  lastBeer,
  takeScreenShot,
  setLoading,
  setPlacesNearby,
  boroughs,
}: any) => {
  const [isShownAddBeer, setIsShownAddBeer] = useState(false);
  const toggleAddBeer = () => {
    setLoading(true);
    setPlacesNearby(location.latitude, location.longitude);
    setLoading(false);
    setIsShownAddBeer(!isShownAddBeer);
  };

  const [isShownShortProfile, setIsShownShortProfile] = useState(false);
  const toggleShortProfile = () => {
    setIsShownShortProfile(!isShownShortProfile);
  };

  const [isShownDiscovery, setIsShownDiscovery] = useState(false);
  const toggleDiscovery = (): void => {
    setIsShownDiscovery(!isShownDiscovery);
    !isShownDiscovery && ToastAndroid.show('Swipe to get a new discovery!', ToastAndroid.LONG);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navbarBtn}
        onPress={() => {
          toggleShortProfile();
        }}
      >
        <Image source={require('../assets/user.png')} style={styles.navbarPic} />
      </TouchableOpacity>
      <ShortProfile
        isShownShortProfile={isShownShortProfile}
        toggleShortProfile={toggleShortProfile}
        lastBeer={lastBeer}
        takeScreenShot={takeScreenShot}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          toggleAddBeer();
        }}
      >
        <Text style={styles.plusSign}>+</Text>
      </TouchableOpacity>
      <AddBeer isShownAddBeer={isShownAddBeer} toggleAddBeer={toggleAddBeer} />
      <TouchableOpacity
        style={styles.navbarBtn}
        onPress={() => {
          toggleDiscovery();
        }}
      >
        <Image source={require('../assets/discover.png')} style={styles.navbarPic} />
      </TouchableOpacity>
      <DiscoveryModal
        isShownDiscovery={isShownDiscovery}
        toggleDiscovery={toggleDiscovery}
        boroughs={boroughs}
      />
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    location: state.location,
  };
}

function mapDispatch(dispatch: any) {
  return {
    setPlacesNearby: (lat: number, lng: number) => dispatch(fetchPlacesNearby(lat, lng)),
    setLoading: (status: boolean) => dispatch(changeLoading(status)),
  };
}

export default connect(mapStateToProps, mapDispatch)(Navbar);

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '10%',
    backgroundColor: 'gold',
    // zIndex: 1,
    elevation: 50000000,
  },
  addBtn: {
    position: 'relative',
    top: (windowHeight * 0.1) / 2 - 50,
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    elevation: 10,
  },
  navbarPic: {
    width: 50,
    height: 50,
  },
  plusSign: {
    top: -13,
    fontSize: 90,
    height: '100%',
    color: 'gold',
  },
  navbarBtn: {
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
