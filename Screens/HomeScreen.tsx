import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { connect } from 'react-redux';
import store from '../redux/store';
import ViewShot, { captureRef } from 'react-native-view-shot';
import moment from 'moment';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import Map from '../Components/Map';
import { isPointInPolygon } from 'geolib';
import Navbar from '../Components/Navbar';
import boroughs from '../assets/london_sport.json';

import {
  storeBorough,
  storeLocation,
  getLocations,
  changeLoading,
  storeBeerFreqs,
} from '../redux/actions';

const simpleArrayOfBoroughs = boroughs.features.map(borough => {
  return {
    boroughName: borough.properties.name,
    boroughId: borough.id,
    boroughCoords: borough.geometry.coordinates[0].map(coords => {
      return {
        latitude: coords[1],
        longitude: coords[0],
      };
    }),
  };
});

const HomeScreen = ({
  currentBorough,
  navigation,
  setLocations,
  location,
  user,
  setLoading,
  setBeerFrequency,
}: any) => {
  const [lastBeer, setLastBeer] = useState({});

  useEffect(() => {
    setLoading(true);
    // Loading status cleared on the getLocations action to make sure the api calls
    // have ended before showing the screen.
    (async () => {
      let { status } = await Location.requestPermissionsAsync();

      if (status === 'granted') {
        await Location.startLocationUpdatesAsync('background-location-task', {
          accuracy: Location.Accuracy.Highest,
        });
      } else {
        console.info('Permission to access location was denied');
      }

      // Triggers a new listener that will check if the location is updated.
      // On update, background-location-task will manage the changes in the TaskManager.
    })();
  }, []);

  useEffect(() => {
    if (user.sub) {
      setLocations(user);
    }
  }, [user.sub]);

  useEffect(() => {
    if (user.sub) {
      user.Locations.length !== 0
        ? setLastBeer(user.Locations[user.Locations.length - 1])
        : setLastBeer({ beerName: 'get a beer', createdAt: new Date(), boroughName: 'you' });
    }
  }, [user.Locations]);

  useEffect(() => {
    let locs = [...user.Locations];
    if (locs.length !== 0) {
      let frequencies = locs.reduce((acc, cur) => {
        acc[cur.beerName] = (acc[cur.beerName] || 0) + 1;
        return acc;
      }, {});
      let sortedFreqs = Object.entries(frequencies).sort((a, b) => b[1] - a[1]);
      setBeerFrequency(sortedFreqs);
    }
  }, [user.Locations]);

  const screenShot = useRef();

  const takeScreenShot = async () => {
    try {
      const uri = await captureRef(screenShot, {
        format: 'jpg',
        quality: 0.8,
      });
      await hasAndroidPermission();
      await savePicture(uri);
    } catch (error) {
      console.log(error);
    }
  };

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      const status = await PermissionsAndroid.request(permission);
      status === 'granted'
        ? console.log('Permission to store granted')
        : console.log('Permission to store DENIED');
    }
  };

  const savePicture = async (uri: string) => {
    await MediaLibrary.saveToLibraryAsync(uri);
    Sharing.shareAsync(uri);
  };

  return (
    <ViewShot ref={screenShot} style={styles.homeScreen}>
      <View style={styles.topBar}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.burgerMenuTouch}
            onPress={() => {
              navigation.push('Modal');
            }}
          >
            <Image source={require('../assets/menu.png')} style={styles.burgerMenu} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{currentBorough.boroughName}</Text>
        <View style={styles.currentView}>
          <Text style={styles.currentBoroughName}>
            {Object.keys(user.boroughCounter).length}/33
          </Text>
        </View>
      </View>
      <Map
        boroughs={simpleArrayOfBoroughs}
        boroughCounter={user.boroughCounter}
        location={location}
        user={user}
      />
      <View style={styles.lastBeer}>
        {user.Locations.lengtgh !== 0 ? (
          <Text style={{ opacity: 0.6 }}>Your last beer was a :</Text>
        ) : null}
        <Text style={styles.lastBeerName}>
          {lastBeer.beerName} in {lastBeer.boroughName}
        </Text>
        <Text style={styles.lastBeerDate}>
          {moment(lastBeer.createdAt).format('dddd, MMM Do YYYY')}
        </Text>
      </View>
      <Navbar takeScreenShot={takeScreenShot} lastBeer={lastBeer} navigation={navigation} />
    </ViewShot>
  );
};

TaskManager.defineTask('background-location-task', ({ data, error }) => {
  if (error) {
    console.log('error in taskManager');
  }
  if (data) {
    const { latitude, longitude } = data.locations[0].coords;
    console.log(latitude);
    store.dispatch(storeLocation({ latitude, longitude }));
    simpleArrayOfBoroughs.some(
      borough =>
        isPointInPolygon({ latitude, longitude }, borough.boroughCoords) &&
        store.dispatch(storeBorough(borough))
    );
  }
});

function mapStateToProps(state: any) {
  return {
    currentBorough: state.currentBorough,
    user: state.user,
    location: state.location,
    beerFrequency: state.user.beerFreqs,
  };
}

function mapDispatch(dispatch: any) {
  return {
    setLocations: (user: any) => dispatch(getLocations(user)),
    setLoading: (status: boolean) => dispatch(changeLoading(status)),
    setBeerFrequency: (freqs: [[]]) => dispatch(storeBeerFreqs(freqs)),
  };
}

export default connect(mapStateToProps, mapDispatch)(HomeScreen);

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer: {
    width: '50%',
    height: 40,
  },
  burgerMenu: {
    width: 30,
    height: 30,
  },
  burgerMenuTouch: {
    flex: 1,
    width: 30,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 10,
    zIndex: 2,
  },
  lastBeer: {
    flex: 1,
    backgroundColor: '#ffd400',
    borderWidth: 2,
    width: 300,
    borderColor: 'whitesmoke',
    borderRadius: 4,
    position: 'absolute',
    bottom: 100,
    left: '50%',
    marginLeft: -150,
    elevation: 22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  lastBeerName: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lastBeerDate: {
    fontSize: 15,
    marginTop: 5,
  },
  map: {
    width: '100%',
    height: '50%',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    height: 'auto',
    paddingHorizontal: 10,
    backgroundColor: 'gold',
    elevation: 10,
    width: '100%',
  },
  currentView: {
    width: 'auto',
    height: 25,
    justifyContent: 'center',
  },
  currentBoroughName: {
    fontSize: 25,
    marginLeft: 10,
  },
  previewImage: {
    height: 200,
    backgroundColor: 'black',
  },
  title: {
    opacity: 0.6,
    fontSize: 20,
    position: 'absolute',
    width: Dimensions.get('screen').width,
    textAlign: 'center',
  },
});
