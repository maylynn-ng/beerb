import React, { useState, useCallback } from 'react';
import {
  Picker,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
  ToastAndroid,
  Image,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import { fetchSearchBeers, postEntry, addBadge, setDrunkBeers } from '../redux/actions';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { Beer, InitialBeer } from '../Models/Beer.model';
import { Badge, InitialBadge } from '../Models/Badge.model';
import { NewEntry } from '../Models/NewEntry.model';
import _ from 'lodash';
import FavouriteBeer from './FavouriteBeer';
import BadgeModal from './BadgeModal';
import { badgeCheck } from '../Helpers/badges';
import { Pub, InitialPub } from '../Models/Pub.model';

function AddBeer({
  isShownAddBeer,
  toggleAddBeer,
  currentBorough,
  beerSearchResults,
  addAchievement,
  setSearch,
  pubLocations,
  location,
  postNewEntry,
  user,
  allBadges,
  updateDrunkBeers,
  drunkBeers,
}: any) {
  const [pub, setPub] = useState(InitialPub);
  const [beer, setBeer] = useState(InitialBeer);
  const [tempSearchTerm, setTempSearchTerm] = useState('');
  const [badge, setBadge] = useState(InitialBadge);
  const [isShowBadgeModal, setIsShowBadgeModal] = useState(false);

  const submitBeerNLoc = () => {
    let lat: number = 0;
    let lng: number = 0;
    if (beer.beerId === 0) {
      ToastAndroid.show('Select your beer!', ToastAndroid.SHORT);
    } else {
      if (pub.geometry.location.lat !== 0) {
        lat = pub.geometry.location.lat;
        lng = pub.geometry.location.lng;
      } else {
        lat = location.latitude;
        lng = location.longitude;
      }

      const newEntry: NewEntry = {
        location: {
          beerName: beer.beerName,
          beerId: beer.beerId,
          placeName: pub.name || 'somewhere',
          placeId: pub.place_id || 'somewhere',
          boroughName: currentBorough.boroughName,
          boroughId: currentBorough.boroughId,
          longitude: lng,
          latitude: lat,
          UserId: user.id,
        },
        beers: beerSearchResults,
      };
      badgeCheck(
        addAchievement,
        allBadges,
        currentBorough,
        setBadge,
        setIsShowBadgeModal,
        toggleAddBeer,
        user
      );

      postNewEntry(newEntry);
      if (!drunkBeers.some((drunkBeer: Beer) => drunkBeer.beerId === beer.beerId)) {
        updateDrunkBeers(beer);
      }
    }
  };

  const delayedQuery = useCallback(
    _.debounce((tempSearchTerm: string) => setSearch(tempSearchTerm), 400),
    []
  );

  const onChange = (input: string) => {
    setTempSearchTerm(input);
    delayedQuery(input);
  };

  return (
    isShownAddBeer && (
      <Modal
        style={{
          backgroundColor: '#000000aa',
          margin: 0,
          flex: 1,
          height: Dimensions.get('screen').height,
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        statusBarTranslucent={true}
        visible={true}
        onBackdropPress={() => {
          toggleAddBeer();
        }}
      >
        <Modal
          isVisible={isShowBadgeModal}
          onBackdropPress={() => {
            setIsShowBadgeModal(false);
            toggleAddBeer();
          }}
        >
          <BadgeModal badge={badge} />
        </Modal>
        <View style={styles.addBeerModal}>
          <View style={styles.lastBeer}>
            <Text style={styles.header}>Your location:</Text>
            <View style={styles.input}>
              <Picker
                selectedValue={location}
                onValueChange={pub => setPub(pub)}
                enabled={pubLocations.length === 0 ? false : true}
                itemStyle={{
                  fontSize: 5,
                }}
              >
                <Picker.Item
                  label={pubLocations.length === 0 ? 'No pubs nearby' : 'Current Location'}
                  value={location}
                />
                {pubLocations.map(
                  (pub: Pub): JSX.Element => (
                    <Picker.Item
                      key={pub.place_id}
                      label={`${pub.name} - ${pub.vicinity}`}
                      value={pub}
                    />
                  )
                )}
              </Picker>
            </View>
            {pubLocations.length === 0 ? (
              <Text>Even if there are no pubs in your vicinity, you can still log a beer!</Text>
            ) : null}
            <Text style={styles.header}>Your beer:</Text>
            <TextInput
              style={styles.input2}
              placeholder={'Search Beer'}
              enablesReturnKeyAutomatically={true}
              autoCapitalize="words"
              onChangeText={onChange}
              returnKeyLabel="done"
              value={tempSearchTerm}
            />
            <ScrollView
              style={{
                flex: 1,
                overflow: 'hidden',
                flexWrap: 'wrap',
              }}
            >
              {beerSearchResults.slice(0, 4).map((curBeer: any) => (
                <TouchableOpacity
                  key={curBeer.beerId}
                  style={beer.beerId === curBeer.beerId ? styles.beerHighlight : styles.beerItem}
                  onPress={() => setBeer(curBeer)}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={{ uri: curBeer.beerLabel }}
                      style={{ width: 30, height: 30, marginRight: 10, alignSelf: 'center' }}
                    />
                    <View style={{ maxWidth: 165, overflow: 'hidden' }}>
                      <View style={{ width: 300 }}>
                        <Text style={styles.beerName}>{curBeer.beerName}</Text>
                        <Text style={styles.beerBrewery}>{curBeer.breweryName}</Text>
                      </View>
                    </View>
                  </View>
                  <FavouriteBeer beerId={curBeer.beerId} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={styles.create}
            onPress={() => {
              submitBeerNLoc();
            }}
          >
            <Text style={styles.createText}>I choose my beer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  );
}

function mapStateToProps(state: any) {
  return {
    beerSearchResults: state.user.beerSearchResults,
    pubLocations: state.locationsNearby,
    location: state.location,
    currentBorough: state.currentBorough,
    user: state.user,
    allBadges: state.allBadges,
    drunkBeers: state.user.drunkBeers,
  };
}

function mapDispatch(dispatch: any) {
  return {
    setSearch: (searchTerm: string) => dispatch(fetchSearchBeers(searchTerm)),
    postNewEntry: (newEntry: object) => dispatch(postEntry(newEntry)),
    addAchievement: (userId: string, badge: Badge) => dispatch(addBadge(userId, badge)),
    updateDrunkBeers: (beer: Beer) => dispatch(setDrunkBeers(beer)),
  };
}

export default connect(mapStateToProps, mapDispatch)(AddBeer);

const styles = StyleSheet.create({
  addBeerModal: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 30,
    marginVertical: 60,
    padding: 30,
    borderRadius: 15,
    height: 570,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderColor: 'transparent',
    paddingHorizontal: 15,
    borderRadius: 10,
    textDecorationLine: 'none',
    fontSize: 18,
    width: 250,
    marginVertical: 10,
    backgroundColor: '#eeeeee',
  },
  input2: {
    borderColor: 'transparent',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    textDecorationLine: 'none',
    fontSize: 18,
    width: 250,
    marginVertical: 10,
    backgroundColor: '#eeeeee',
  },
  create: {
    backgroundColor: '#37897c',
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 3,
  },
  createText: {
    fontSize: 16,
    color: 'white',
  },
  lastBeer: {
    flex: 1,
  },
  beerItem: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
  },
  beerHighlight: {
    padding: 5,
    backgroundColor: 'gold',
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  beerName: {
    fontWeight: 'bold',
  },
  beerBrewery: {
    color: 'grey',
  },
});
