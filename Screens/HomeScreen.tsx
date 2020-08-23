import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import store from '../redux/store';
import moment from 'moment';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import Map from '../Components/Map';
import { isPointInPolygon } from 'geolib';
import Navbar from '../Components/Navbar';
import boroughs from '../assets/london_sport.json';

import { storeBorough, storeLocation, getLocations, changeLoading } from '../redux/actions';

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
}: any) => {
  const [lastBeer, setLastBeer] = useState({});

  useEffect(() => {
    setLoading(true);
    // Loading status cleared on the getLocations action to make sure the api calls
    // have ended before showing the screen.
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.info('Permission to access location was denied');
      }

      // Triggers a new listener that will check if the location is updated.
      // On update, background-location-task will manage the changes in the TaskManager.
      await Location.startLocationUpdatesAsync('background-location-task', {
        accuracy: Location.Accuracy.Highest,
      });
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

  return (
    <SafeAreaView style={styles.homeScreen}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.burgerMenuTouch}
          onPress={() => {
            navigation.navigate('Modal');
          }}
        >
          <Image source={require('../assets/menu.png')} style={styles.burgerMenu} />
        </TouchableOpacity>
        <Text style={{ opacity: 0.6, fontSize: 20 }}>{currentBorough.boroughName}</Text>
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
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

TaskManager.defineTask('background-location-task', ({ data, error }) => {
  if (error) {
    console.log('error in taskManager');
  }
  if (data) {
    const { latitude, longitude } = data.locations[0].coords;
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
  };
}

function mapDispatch(dispatch: any) {
  return {
    setLocations: (user: any) => dispatch(getLocations(user)),
    setLoading: (status: boolean) => dispatch(changeLoading(status)),
  };
}

export default connect(mapStateToProps, mapDispatch)(HomeScreen);

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
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
    justifyContent: 'space-around',
    padding: 8,
    height: 'auto',
    paddingHorizontal: 10,
    backgroundColor: 'gold',
    elevation: 10,
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
});
