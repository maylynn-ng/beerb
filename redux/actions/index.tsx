import { Beer, TrendingBeer } from '../../Models/Beer.model';
import { Borough } from '../../Models/Borough.model';
import { ToastAndroid } from 'react-native';
import { getDistance } from 'geolib';

const SEARCH_API_URL = process.env.REACT_NATIVE_UNTAPPED_SEARCH_URL;
const TRENDING_URL = process.env.REACT_NATIVE_UNTAPPED_TRENDING_URL;
const CLIENT_ID = process.env.REACT_NATIVE_UNTAPPED_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_NATIVE_UNTAPPED_CLIENT_SECRET;
const PLACES_NEARBY_URL = process.env.REACT_NATIVE_PLACES_NEARBY_URL;
const PLACES_KEY = process.env.REACT_NATIVE_PLACES_KEY;
const PLACES_NEARBY_PARAMS: string = '&radius=200&type=bar&keyword=pub&key=';
const DB_LOCALHOST = process.env.EXPO_LOCALHOST;
const DRUNK_API = process.env.REACT_NATIVE_UNTAPPED_DRUNK_URL;

export type Action = {
  type: string;
  payload: any;
};

export function storeLocation(location: { latitude: number; longitude: number }) {
  return {
    type: 'STORE_LOCATION',
    payload: location,
  };
}

export function setArrayOfBoroughs(boroughs: any[]) {
  return {
    type: 'SIMPLE_ARRAY_BOROUGHS',
    payload: boroughs,
  };
}

export function storeBorough(currentBorough: Borough): Action {
  return {
    type: 'STORE_BOROUGH',
    payload: currentBorough,
  };
}

export function setSearchTerm(input: string) {
  return {
    type: 'SET_SEARCH_TERM',
    payload: input,
  };
}

export function setLocationsNearby(locations: []) {
  return {
    type: 'SET_LOCATIONS_NEARBY',
    payload: locations,
  };
}

export function logoutUser(user: any) {
  return {
    type: 'LOGOUT',
    payload: user,
  };
}

export function changeLoading(status: boolean) {
  return {
    type: 'SET_LOADING',
    payload: status,
  };
}

export function fetchSearchBeers(searchTerm: string) {
  return function (dispatch: any) {
    dispatch(setSearchTerm(searchTerm));
    if (searchTerm === '') {
      dispatch({ type: 'SET_SEARCH_BEER_RESULTS', payload: [] });
    } else {
      fetch(`${SEARCH_API_URL}${searchTerm}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
        .then(res => res.json())
        .then(res => {
          const results: Beer[] = res.response.beers.items.map((beer: any) => {
            return {
              beerId: beer.beer.bid,
              haveHad: beer.have_had,
              beerName: beer.beer.beer_name,
              beerLabel: beer.beer.beer_label,
              beerIbu: beer.beer.beer_ibu,
              beerDescription: beer.beer.beer_description,
              beerStyle: beer.beer.beer_style,
              breweryName: beer.brewery.brewery_name,
              breweryCountry: beer.brewery.country_name,
              breweryLabel: beer.brewery.brewery_label,
              breweryUrl: beer.brewery.contact.url,
            };
          });
          dispatch({ type: 'SET_SEARCH_BEER_RESULTS', payload: results });
        })
        .catch(error => console.error('FETCH SEARCH BEERS SAYS NO: ', error));
    }
  };
}

export function fetchTrending() {
  return function (dispatch: any) {
    let results: TrendingBeer[] = [];
    fetch(`${TRENDING_URL}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
      .then(res => res.json())
      .then(res => {
        let beers = res.response.macro.items;
        for (let i = 0; i < beers.length; i++) {
          results.push({
            beerId: beers[i].beer.bid,
            haveHad: false,
            beerName: beers[i].beer.beer_name,
            beerLabel: beers[i].beer.beer_label,
            beerStyle: beers[i].beer.beer_style,
            breweryName: beers[i].brewery.brewery_name,
            breweryCountry: beers[i].brewery.country_name,
            breweryLabel: beers[i].brewery.brewery_label,
            breweryUrl: beers[i].brewery.contact.url,
          });
        }
        dispatch({ type: 'SET_TRENDING_BEER_RESULTS', payload: results });
      })
      .catch(error => console.error('FETCH TRENDY BEERS SAYS NO: ', error));
  };
}

export function fetchPlacesNearby(lat: number, lng: number) {
  return (dispatch: any) => {
    fetch(`${PLACES_NEARBY_URL}${lat},${lng}${PLACES_NEARBY_PARAMS}${PLACES_KEY}`)
      .then(res => res.json())
      .then(locations => {
        const sortedLocs = locations.results.sort(
          (a: any, b: any) =>
            getDistance(
              { latitude: a.geometry.location.lat, longitude: a.geometry.location.lng },
              { latitude: lat, longitude: lng }
            ) -
            getDistance(
              { latitude: b.geometry.location.lat, longitude: b.geometry.location.lng },
              { latitude: lat, longitude: lng }
            )
        );
        const filteredLocs = sortedLocs.filter((loc: any) => loc.business_status === 'OPERATIONAL');
        dispatch(setLocationsNearby(filteredLocs.slice(0, 6)));
      });
  };
}

export function postEntry(newEntry: object) {
  return (dispatch: any) => {
    fetch(`${DB_LOCALHOST}/location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'ADD_ENTRY', payload: data });
        ToastAndroid.show('Cheers!! 🍺', ToastAndroid.SHORT);
      })
      .catch(err => {
        ToastAndroid.show('Something went wrong...', ToastAndroid.SHORT);
        console.log('🌞', err);
      });
  };
}

export function setUserInfo(user: object) {
  return {
    type: 'SET_USER_INFO',
    payload: user,
  };
}

export function getLocations(user: any) {
  const { sub, name } = user;
  let counter: { [key: string]: any } = {};
  const fetchBody = { sub, name };
  return (dispatch: any) => {
    fetch(`${DB_LOCALHOST}/locations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fetchBody),
    })
      .then(res => res.json())
      .then(res => {
        res.Locations.map((entry: { boroughName: string }) => {
          if (counter[entry.boroughName]) {
            counter[entry.boroughName]++;
          } else {
            counter[entry.boroughName] = 1;
          }
        });
        dispatch({ type: 'GET_LOCATIONS', payload: counter });
        dispatch({ type: 'SET_USER_INFO', payload: { id: res.id, Locations: res.Locations } });
        dispatch(changeLoading(false));
      })
      .catch(error => {
        ToastAndroid.show("Couldn't retreive your data 😢", ToastAndroid.SHORT);
        console.log('SORRY: ', error);
        dispatch(changeLoading(false));
      });
  };
}

export function fetchDrunkBeers(id: number) {
  return function (dispatch: any) {
    fetch(`${DRUNK_API}/${id}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
      .then(res => res.json())
      .then(res => {
        console.log('FETCH DRUNK', res);
        const beer = res.response.beer;
        return {
          beerId: beer.bid,
          haveHad: true,
          beerName: beer.beer_name,
          beerLabel: beer.beer_label,
          beerIbu: beer.beer_ibu,
          beerDescription: beer.beer_description,
          beerStyle: beer.beer_style,
          breweryName: beer.brewery.brewery_name,
          breweryCountry: beer.brewery.country_name,
          breweryLabel: beer.brewery.brewery_label,
          breweryUrl: beer.brewery.contact.url,
        };
      })
      .then(res => dispatch({ type: 'SET_DRUNK_RESULTS', payload: res }))
      .catch(error => console.error('FETCH DRUNK BEERS SAYS NO: ', error));
  };
}
