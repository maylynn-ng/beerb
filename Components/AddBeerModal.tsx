import React, { useState } from 'react';
import {
  Picker,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import { fetchSearchBeers, postEntry } from '../redux/actions';
import { connect } from 'react-redux';
import boroughs from '../assets/london_sport.json';
import { ScrollView } from 'react-native-gesture-handler';
import { isPointInPolygon } from 'geolib';

function AddBeer({
  isShownAddBeer,
  toggleAddBeer,
  currentBorough,
  beerSearchResults,
  setSearch,
  pubLocations,
  location,
  postNewEntry,
}: any) {
  const [pub, setPub] = useState({});
  const [beer, setBeer] = useState('');
  const [tempSearchTerm, setTempSearchTerm] = useState('');

  const submitBeerNLoc = () => {
    let lat: number = 0;
    let lng: number = 0;

    if (Object.keys(pub).length !== 0) {
      lat = pub.geometry.location.lat;
      lng = pub.geometry.location.lng;
    } else {
      lat = location.latitude;
      lng = location.longitude;
    }

    const newEntry = {
      // beerName: beer.beerName,
      // beerId: beer.beerId,
      // placeName: pub.name || 'unknow pub',
      placeId: pub.place_id || 'unknown pub',
      // boroughName: currentBorough.boroughName
      boroughId: currentBorough.boroughId,
      longitude: lng,
      latitude: lat,
      UserId: 1,
    };

    postNewEntry(newEntry);
    Alert.alert('Operation success');
    toggleAddBeer();
  };

  return (
    isShownAddBeer && (
      <Modal
        style={{ backgroundColor: '#000000aa', margin: 0, flex: 1 }}
        transparent={true}
        visible={true}
        onBackdropPress={() => {
          toggleAddBeer();
        }}
      >
        <View style={styles.addBeerModal}>
          <View style={styles.lastBeer}>
            <Text style={styles.header}>Your location:</Text>
            <Picker
              selectedValue={location}
              onValueChange={pub => setPub(pub)}
              itemStyle={{
                fontSize: 5,
              }}
            >
              <Picker.Item label="Current Location" value={location} />
              {pubLocations.map(pub => (
                <Picker.Item
                  key={pub.place_id}
                  label={`${pub.name} - ${pub.vicinity}`}
                  value={pub}
                />
              ))}
            </Picker>
            <Text style={styles.header}>Your beer:</Text>
            <Text style={styles.beerSelected}>{beer}</Text>
            <TextInput
              style={styles.input}
              placeholder={'Search Beer'}
              enablesReturnKeyAutomatically={true}
              autoCapitalize="words"
              onChangeText={input => {
                setTempSearchTerm(input);
              }}
              returnKeyLabel="done"
              value={tempSearchTerm}
            />
            <Button
              title="SEARCH"
              onPress={() => {
                setSearch(tempSearchTerm);
                setTempSearchTerm('');
              }}
            />

            <ScrollView
              style={{
                flex: 1,
                height: 200,
                borderWidth: 1,
                borderColor: 'red',
                overflow: 'hidden',
                flexWrap: 'wrap',
              }}
            >
              {beerSearchResults.map((beer: any) => (
                <TouchableOpacity
                  key={beer.beerId}
                  style={styles.beerItem}
                  onPress={() => setBeer(beer.beerName)}
                >
                  <Text style={styles.beerName}>{beer.beerName}</Text>
                  <Text style={styles.beerBrewery}>{beer.breweryName}</Text>
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
    searchTerm: state.searchTerm,
    beerSearchResults: state.beerSearchResults,
    pubLocations: state.locationsNearby,
    location: state.location,
    currentBorough: state.currentBorough,
  };
}

function mapDispatch(dispatch: any) {
  return {
    setSearch: (searchTerm: string) => dispatch(fetchSearchBeers(searchTerm)),
    postNewEntry: (newEntry: object) => dispatch(postEntry(newEntry)),
  };
}

export default connect(mapStateToProps, mapDispatch)(AddBeer);

const styles = StyleSheet.create({
  addBeerModal: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 30,
    marginVertical: 60,
    padding: 10,
    borderRadius: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'transparent',
    borderBottomWidth: 4,
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 5,
    borderBottomColor: 'black',
    textDecorationLine: 'none',
    fontSize: 18,
    width: 250,
    marginHorizontal: 10,
  },
  create: {
    backgroundColor: '#37897c',
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
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
    margin: 5,
  },
  beerName: {
    fontWeight: 'bold',
  },
  beerBrewery: {
    color: 'grey',
  },
  beerSelected: {
    backgroundColor: 'grey',
    padding: 8,
  },
});
