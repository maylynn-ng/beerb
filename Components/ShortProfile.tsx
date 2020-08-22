import React, { useRef } from 'react';
import { Image, Text, StyleSheet, View, Share, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { storeBorough, fetchPlacesNearby, storeLocation, getLocations } from '../redux/actions';

function ShortProfile({
  isShownShortProfile,
  toggleShortProfile,
  user,
  lastBeer,
  currentBorough,
  takeScreenShot,
  location,
}: any) {
  const share = async () => {
    try {
      const whatArticle = () => {
        return /[AEIOU]/.test(lastBeer.beerName[0]) ? 'an' : 'a';
      };

      const link = () => {
        if (user.Locations.placeName === 'unknown pub') {
          return '';
        } else {
          let pubName = user.Locations[0].placeName.split(' ').join('+');
          let gps = `@${user.Locations[0].latitude},${user.Locations[0].longitude}`;
          return `google.co.uk/maps/place/${pubName}/${gps},15z`;
        }
      };
      const googleLink = link();

      await Share.share({
        message: `Hey! Fancy joining me? I'm having ${whatArticle()} ${lastBeer.beerName} in ${
          lastBeer.placeName
        }. ${googleLink}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const picture = () => {
    let src;
    if (user.picture) {
      src = { uri: user.picture };
    } else {
      src = 'require("./assets/user.png")';
    }
    return src;
  };

  return (
    isShownShortProfile && (
      <Modal
        style={{
          justifyContent: 'flex-end',
          backgroundColor: '#000000aa',
          margin: 0,
          flex: 1,
        }}
        transparent={true}
        visible={true}
        onBackdropPress={() => {
          toggleShortProfile();
          takeScreenShot();
        }}
      >
        <View style={styles.mainContainer}>
          <Image style={styles.userImage} source={picture()} />
          <Text style={styles.userName}>{user.given_name}</Text>
          <Text style={styles.currentB}>{currentBorough.boroughName}</Text>
          <View style={styles.infoView}>
            <View style={styles.info}>
              <Text style={styles.number}>{Object.keys(user.boroughCounter).length}</Text>
              <Text style={styles.text}>
                {Object.keys(user.boroughCounter).length === 1 ? 'BOROUGH' : 'BOROUGHS'}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.number}>{user.Locations.length}</Text>
              <Text style={styles.text}>{user.Locations.length === 1 ? 'BEER' : 'BEERS'}</Text>
            </View>
          </View>
          <Text
            style={{
              opacity: 0.2,
              alignSelf: 'flex-start',
              marginHorizontal: 10,
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Your last beer...
          </Text>
          <Text style={styles.lastBeer}>
            {lastBeer.beerName} in {lastBeer.placeName}
          </Text>

          <TouchableOpacity style={styles.shareButton} onPress={() => share()}>
            <Image source={require('../assets/share.png')} style={styles.shareButton} />
          </TouchableOpacity>
        </View>
      </Modal>
    )
  );
}

function mapStateToProps(state: any) {
  return {
    currentBorough: state.currentBorough,
    searchTerm: state.searchTerm,
    beerSearchResults: state.beerSearchResults,
    user: state.user,
    location: state.location,
    beerFrequency: state.user.beerFreqs,
    boroughCounter: state.user.boroughCounter,
  };
}

function mapDispatch(dispatch: any) {
  return {
    setLocation: (location: object) => dispatch(storeLocation(location)),
    setBorough: (name: string) => dispatch(storeBorough(name)),
    setPlacesNearby: (lat: number, lng: number) => dispatch(fetchPlacesNearby(lat, lng)),
    setLocations: (user: any) => dispatch(getLocations(user)),
  };
}

export default connect(mapStateToProps, mapDispatch)(ShortProfile);

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    height: 500,
    marginHorizontal: 35,
    marginBottom: 70,
  },
  userImage: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  userName: {
    fontSize: 30,
  },
  currentB: {
    fontSize: 15,
    fontStyle: 'italic',
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
    marginHorizontal: 20,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 25,
    fontWeight: 'bold',
    elevation: 3,
    marginTop: '5%',
  },
  text: {
    color: 'grey',
  },
  lastBeer: {
    margin: '5%',
    marginTop: 0,
    padding: 10,
    backgroundColor: 'gold',
    textAlign: 'center',
    fontSize: 15,
    elevation: 5,
    borderRadius: 10,
    fontWeight: '400',
  },
  shareButton: {
    height: 30,
    width: 30,
    opacity: 0.3,
  },
  shareIcon: {},
});
