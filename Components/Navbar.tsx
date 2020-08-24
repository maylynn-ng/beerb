import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AddBeer from './AddBeerModal';
<<<<<<< HEAD
import { connect } from 'react-redux';
import { fetchPlacesNearby, changeLoading } from '../redux/actions';

const Navbar = ({ navigation, location, setLoading, setPlacesNearby }: any) => {
=======
import ShortProfile from './ShortProfile';

const Navbar = ({ navigation, location, lastBeer, takeScreenShot }: any) => {
>>>>>>> origin/userProfile
  const [isShownAddBeer, setIsShownAddBeer] = useState(false);
  const toggleAddBeer = () => {
    setLoading(true);
    console.log('location', location);
    setPlacesNearby(location.latitude, location.longitude);
    setLoading(false);
    setIsShownAddBeer(!isShownAddBeer);
  };

  const [isShownShortProfile, setIsShownShortProfile] = useState(false);
  const toggleShortProfile = () => {
    setIsShownShortProfile(!isShownShortProfile);
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
          console.info('link to random beer/location');
        }}
      >
        <Image source={require('../assets/discover.png')} style={styles.navbarPic} />
      </TouchableOpacity>
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
    zIndex: 1,
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
