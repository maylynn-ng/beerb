import React from 'react';
import { Image, Text, StyleSheet, View, Share, TouchableOpacity, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { storeBorough, fetchPlacesNearby, storeLocation } from '../redux/actions';

function ShortProfile({
  isShownShortProfile,
  toggleShortProfile,
  user,
  lastBeer,
  currentBorough,
  takeScreenShot,
  beerFrequency,
}: any) {
  const share = async () => {
    try {
      const whatArticle = () => (/[AEIOU]/.test(lastBeer.beerName[0]) ? 'an' : 'a');

      const link = () => {
        let index = 0;
        if (user.Locations[index].placeName === 'somewhere') {
          let gps = `${user.Locations[index].latitude},${user.Locations[index].longitude}`;
          return `google.co.uk/maps/search/?api=1&query=${gps}`;
        } else {
          let pubName = user.Locations[index].placeName.split(' ').join('+');
          return `google.co.uk/maps/search/?api=1&query=${pubName}`;
        }
      };
      ToastAndroid.showWithGravity(
        '🍺 Share your beer and your location',
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );

      await Share.share({
        message: `Hey! Fancy joining me? I'm having ${whatArticle()} ${lastBeer.beerName} in ${
          lastBeer.placeName === 'somewhere' ? lastBeer.boroughName : lastBeer.placeName
        }. ${link()}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const picture = () => (user.picture ? { uri: user.picture } : 'require("./assets/user.png")');

  return (
    isShownShortProfile && (
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
          toggleShortProfile();
        }}
      >
        <View style={styles.mainContainer}>
          <Image style={styles.userImage} source={picture()} />
          <Text style={styles.userName}>{user.nickname}</Text>
          <Text style={styles.currentB}>{currentBorough.boroughName}</Text>
          <View style={styles.infoView}>
            <View style={styles.info}>
              <Text style={styles.number}>{Object.keys(user.boroughCounter).length}</Text>
              <Text style={styles.text}>
                {Object.keys(user.boroughCounter).length === 1 ? 'BOROUGH' : 'BOROUGHS'}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.number}>
                {beerFrequency[0].length ? beerFrequency.length : 0}
              </Text>
              <Text style={styles.text}>{beerFrequency[0].beerId ? 'BEER' : 'BEERS'}</Text>
            </View>
          </View>
          <Text
            style={{
              opacity: 0.2,
              alignSelf: 'flex-start',
              marginHorizontal: 20,
              marginTop: 20,
              marginBottom: 5,
            }}
          >
            Your last beer...
          </Text>
          <Text style={styles.lastBeer}>
            {lastBeer.beerName} in{' '}
            {lastBeer.placeName === 'somewhere' || lastBeer.boroughName === 'you!'
              ? lastBeer.boroughName
              : lastBeer.placeName}
          </Text>
          <View style={styles.shareView}>
            <TouchableOpacity style={styles.shareButton} onPress={() => takeScreenShot()}>
              <Image
                source={require('../assets/shareImage.png')}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={() => share()}>
              <Image source={require('../assets/share.png')} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>
          </View>
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
  },
  userImage: {
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: 25,
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
    marginTop: '5%',
    marginHorizontal: 20,
    paddingBottom: 4,
    borderBottomColor: 'gold',
    borderBottomWidth: 3,
    borderRadius: 10,
  },
  info: {
    flex: 1,
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
    width: '90%',
  },
  shareView: {
    flexDirection: 'row',
  },
  shareButton: {
    height: 30,
    width: 30,
    opacity: 0.3,
    margin: 20,
    alignItems: 'center',
  },
});
