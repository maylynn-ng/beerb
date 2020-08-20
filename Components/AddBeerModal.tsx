import React, { useState, useCallback } from 'react';
import { Picker, TouchableOpacity, Text, View, StyleSheet, TextInput, Button } from 'react-native';
import Modal from 'react-native-modal';
import { fetchSearchBeers, postEntry } from '../redux/actions';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { Beer } from '../Models/Beer.model';
import _ from 'lodash';

const initialBeer: Beer = {
  beerId: 0,
  haveHad: false,
  beerName: '',
  beerLabel: '',
  beerIbu: 0,
  beerDescription: '',
  beerStyle: '',
  breweryName: '',
  breweryCountry: '',
  breweryLabel: '',
  breweryUrl: '',
};

function AddBeer({
  isShownAddBeer,
  toggleAddBeer,
  currentBorough,
  beerSearchResults,
  setSearch,
  pubLocations,
  location,
  postNewEntry,
  user,
}: any) {
  const [pub, setPub] = useState({});
  const [beer, setBeer] = useState(initialBeer);
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
      beerName: beer.beerName,
      beerId: beer.beerId,
      placeName: pub.name || 'unknown pub',
      placeId: pub.place_id || 'unknown pub',
      boroughName: currentBorough.boroughName,
      boroughId: currentBorough.boroughId,
      longitude: lng,
      latitude: lat,
      UserId: user.id,
    };

    postNewEntry(newEntry);
    toggleAddBeer();
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
            <View style={styles.input}>
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
            </View>
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
              {beerSearchResults.map((curBeer: any) => (
                <TouchableOpacity
                  key={curBeer.beerId}
                  style={beer.beerId === curBeer.beerId ? styles.beerHighlight : styles.beerItem}
                  onPress={() => setBeer(curBeer)}
                >
                  <Text style={styles.beerName}>{curBeer.beerName}</Text>
                  <Text style={styles.beerBrewery}>{curBeer.breweryName}</Text>
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
    user: state.user,
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
    // flex: 1,
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
    // paddingVertical: 10,
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
  },
  beerHighlight: {
    padding: 5,
    backgroundColor: 'gold',
    width: 250,
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
