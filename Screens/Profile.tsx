import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableOpacityBase,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-native-modal';
import BeerModal from '../Components/BeerModal';
import { storeBorough, fetchPlacesNearby, storeLocation, storeBeerFreqs } from '../redux/actions';
import Topbar from '../Components/Topbar';

function Profile({ user, beerFrequency, navigation }: any) {
  const [displayModal, setDisplayModal] = useState(false);
  const [modalBeer, setModalBeer] = useState({ beerId: 0 });
  const picture = () => {
    let src;
    user.picture ? (src = { uri: user.picture }) : (src = 'require("./assets/user.png")');
    return src;
  };

  const handleTouch = (beerId: number) => {
    setModalBeer({ beerId });
    setDisplayModal(true);
  };

  return (
    <>
      <Topbar navigation={navigation} user={user} />
      <View style={styles.mainContainer}>
        <View style={styles.userInfo}>
          <Image style={styles.userImage} source={picture()} />
          <View style={{ paddingLeft: 15, paddingTop: 15 }}>
            <Text style={{ fontSize: 30 }}>{user.name}</Text>
            <View style={styles.infoView}>
              <View style={styles.info}>
                <Text style={styles.number}>
                  {Object.keys(user.boroughCounter).length}
                  <Text style={{ fontSize: 20, color: 'grey' }}>/33</Text>
                </Text>
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
            <Text style={{ paddingTop: 15 }}>My favourite:</Text>
            {beerFrequency[0][0] ? (
              <Text style={{ fontWeight: 'bold' }}>
                {beerFrequency[0][0]} - {beerFrequency[0][1]} time
                {beerFrequency[0][1] === 1 ? '' : 's'}
              </Text>
            ) : (
              <Text style={{ fontWeight: 'bold' }}>No beers yet</Text>
            )}
          </View>
        </View>
        {user.badges.length ? (
          <>
            <Text
              style={{
                backfaceVisibility: user.badges.length !== 0 ? 'visible' : 'hidden',
                fontSize: 20,
                alignSelf: 'flex-start',
                paddingLeft: 15,
              }}
            >
              My badges:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                margin: 10,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingHorizontal: 10,
                alignSelf: 'flex-start',
              }}
            >
              {user.badges.length !== 0 &&
                user.badges.map(badge => (
                  <Image
                    source={{ uri: badge.badgeImage }}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                ))}
            </View>
          </>
        ) : null}
        <Text style={{ fontSize: 20, alignSelf: 'flex-start', paddingLeft: 15 }}>History:</Text>
        <ScrollView style={styles.scrollable}>
          {user && user.Locations && user.Locations.length ? (
            user.Locations.map(loc => (
              <TouchableOpacity
                key={loc.createdAt}
                style={styles.historyItem}
                onPress={() => handleTouch(loc.beerId)}
              >
                <Text style={styles.historyItemText}>
                  {loc.beerName} in{' '}
                  {loc.placeName === 'somewhere' || loc.boroughName === 'you!'
                    ? loc.boroughName
                    : loc.placeName}
                </Text>
                <Text style={[styles.historyItemText, { fontSize: 13, color: 'gray' }]}>
                  {loc.boroughName !== 'somewhere' ? loc.boroughName + ' - ' : ''}
                  {moment(loc.createdAt).format('MMM Do, YYYY')}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.historyItem}>
              <Text style={styles.historyItemText}>No beers yet? What are you waiting for?</Text>
            </View>
          )}
        </ScrollView>
        <Modal
          isVisible={displayModal}
          statusBarTranslucent={true}
          onBackdropPress={() => {
            setDisplayModal(false);
          }}
        >
          <BeerModal beer={modalBeer} />
        </Modal>
      </View>
    </>
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
  };
}

function mapDispatch(dispatch: any) {
  return {
    setLocation: (location: object) => dispatch(storeLocation(location)),
    setBorough: (name: string) => dispatch(storeBorough(name)),
    setPlacesNearby: (lat: number, lng: number) => dispatch(fetchPlacesNearby(lat, lng)),
    setBeerFrequency: (freqs: [[]]) => dispatch(storeBeerFreqs(freqs)),
  };
}

export default connect(mapStateToProps, mapDispatch)(Profile);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    padding: 15,
  },
  scrollable: {
    flex: 2,
    margin: 20,
    marginTop: 10,
    width: '100%',
    padding: 0,
  },
  userImage: {
    height: 150,
    width: 150,
    borderRadius: 80,
    marginTop: 15,
  },
  infoView: {
    flexDirection: 'row',
    paddingBottom: 4,
    borderBottomColor: 'gold',
    borderBottomWidth: 3,
    borderRadius: 10,
    width: 170,
  },
  info: {
    flex: 1,
    alignItems: 'center',
  },
  number: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
  },
  historyItem: {
    alignSelf: 'center',
    marginTop: 0,
    padding: 10,
    backgroundColor: '#ffd70080',
    marginBottom: 3,
    borderRadius: 5,
    width: '90%',
  },
  historyItemText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
  },
});
