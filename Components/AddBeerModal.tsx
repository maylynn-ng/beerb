import React, { useState } from 'react';
import {
  SafeAreaView,
  Picker,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import { fetchBeers } from '../redux/actions';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

function AddBeer({
  isShownAddBeer,
  toggleAddBeer,
  searchTerm,
  beerSearchResults,
  setSearch,
  pubLocations,
  location,
}: any) {
  const [pub, setPub] = useState({});

  return (
    isShownAddBeer && (
      <Modal
        style={{ backgroundColor: '#000000aa', margin: 0, flex: 1 }}
        transparent={true}
        visible={true}
        onBackdropPress={() => {
          toggleAddBeer();
          console.log(pub);
        }}
      >
        <View style={styles.addBeerModal}>
          <View style={styles.lastBeer}>
            <Text style={styles.header}>add location</Text>
            <Picker
              selectedValue={pub}
              onValueChange={pub => setPub(pub)}
              itemStyle={{
                backgroundColor: 'red',
                color: 'red',
                fontFamily: 'Ebrima',
                fontSize: 17,
              }}
            >
              <Picker.Item label="Current Location" value={location} />
              {pubLocations.map(pub => (
                <Picker.Item label={`${pub.name} - ${pub.vicinity}`} value={pub} />
              ))}
            </Picker>
            <Text style={styles.header}>add beer</Text>
            <TextInput
              style={styles.input}
              placeholder="Search Beer"
              enablesReturnKeyAutomatically={true}
              autoCapitalize="words"
              onChangeText={searchTerm => {
                setSearch(searchTerm);
              }}
              returnKeyLabel="done"
              value={searchTerm}
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
              {beerSearchResults.map(beer => (
                <TouchableOpacity style={styles.pubItem}>
                  <Text>{beer.beerName}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity style={styles.create}>
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
  };
}

function mapDispatch(dispatch: any) {
  return {
    setSearch: (searchTerm: string) => dispatch(fetchBeers(searchTerm)),
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
    marginBottom: 30,
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
  pubItem: {
    margin: 5,
  },
  pubName: {
    fontWeight: 'bold',
  },
  pubVicinity: {
    color: 'grey',
  },
});
