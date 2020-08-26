import { Beer } from '../../Models/Beer.model';
import { Borough } from '../../Models/Borough.model';
import { Badge } from '../../Models/Badge.model';
import { AppDispatch, Action } from '../../Models/Redux.model';
import { ToastAndroid } from 'react-native';
import { getDistance } from 'geolib';

const SEARCH_API_URL = process.env.REACT_NATIVE_UNTAPPED_SEARCH_URL;
const CLIENT_ID = process.env.REACT_NATIVE_UNTAPPED_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_NATIVE_UNTAPPED_CLIENT_SECRET;
const PLACES_NEARBY_URL = process.env.REACT_NATIVE_PLACES_NEARBY_URL;
const PLACES_KEY = process.env.REACT_NATIVE_PLACES_KEY;
const PLACES_NEARBY_PARAMS: string = '&radius=200&type=bar&keyword=pub&key=';
const DB_LOCALHOST = process.env.REACT_NATIVE_LOCALHOST;

export function storeLocation(location: { latitude: number; longitude: number }): Action {
  return {
    type: 'STORE_LOCATION',
    payload: location,
  };
}

export function setArrayOfBoroughs(boroughs: Borough[]): Action {
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

export function setSearchTerm(input: string): Action {
  return {
    type: 'SET_SEARCH_TERM',
    payload: input,
  };
}

export function setLocationsNearby(locations: []): Action {
  return {
    type: 'SET_LOCATIONS_NEARBY',
    payload: locations,
  };
}

export function logoutUser(user: any): Action {
  return {
    type: 'LOGOUT',
    payload: user,
  };
}

export function changeLoading(status: boolean): Action {
  return {
    type: 'SET_LOADING',
    payload: status,
  };
}

export function storeBeerFreqs(freqs: [[]]): Action {
  return {
    type: 'STORE_BEER_FREQS',
    payload: freqs,
  };
}

export function fetchSearchBeers(searchTerm: string) {
  return function (dispatch: AppDispatch) {
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
              beerName: beer.beer.beer_name,
              beerLabel: beer.beer.beer_label,
              beerAbv: beer.beer.beer_abv,
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

export function fetchPlacesNearby(lat: number, lng: number) {
  return (dispatch: AppDispatch) => {
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
  return (dispatch: AppDispatch) => {
    fetch(`${DB_LOCALHOST}/location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'ADD_ENTRY', payload: data.newLocation });
        ToastAndroid.show('Cheers!! 🍺', ToastAndroid.SHORT);
      })
      .catch(err => {
        ToastAndroid.show('Something went wrong...', ToastAndroid.SHORT);
        console.log('🌞', err);
      });
  };
}

export function setDrunkBeers(beer: Beer) {
  return {
    type: 'SET_DRUNK_BEERS',
    payload: [beer],
  };
}

export function setUserInfo(user: object): Action {
  return {
    type: 'SET_USER_INFO',
    payload: user,
  };
}

export function updateAllUserStates(user: any) {
  const { sub, name } = user;
  let counter: { [key: string]: any } = {};
  return (dispatch: AppDispatch) => {
    fetch(`${DB_LOCALHOST}/locations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sub, name }),
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
        const favouriteBeers = new Set(res.favouriteBeers);
        dispatch({ type: 'SAVE_FAVOURITES', payload: favouriteBeers });
        dispatch({ type: 'ADD_BADGE', payload: res.Badges });
        dispatch({ type: 'SET_DRUNK_BEERS', payload: res.Beers });
        dispatch(changeLoading(false));
      })
      .catch(error => {
        ToastAndroid.show("Couldn't retreive your data 😢", ToastAndroid.SHORT);
        console.log('SORRY: ', error);
        dispatch(changeLoading(false));
      });

    fetch(`${DB_LOCALHOST}/beers`)
      .then(res => res.json())
      .then(res => {
        dispatch({ type: 'SET_BEERDEX', payload: res });
      })
      .catch(error => console.error('Unable to reach Beerdex ', error));
  };
}

export function getBeerdex() {
  return function (dispatch: AppDispatch) {
    fetch(`${DB_LOCALHOST}/beers`)
      .then(res => res.json())
      .then(res => {
        const result = res.length > 50 ? res.slice(0, 50) : res;
        dispatch({ type: 'SET_BEERDEX', payload: result });
      })
      .catch(error => console.error('Unable to reach Beerdex ', error));
  };
}

export function setDrunkIds(drunkIds: number[]): Action {
  return {
    type: 'SET_DRUNK_IDS',
    payload: drunkIds,
  };
}

export function updateFavourites(favouriteBeers: Set<Object>) {
  return {
    type: 'SAVE_FAVOURITES',
    payload: favouriteBeers,
  };
}

export function addBadge(UserId: any, badge: Badge) {
  return function (dispatch: AppDispatch) {
    fetch(`${DB_LOCALHOST}/awardBadge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ UserId, badge }),
    })
      .then(res => {
        if (res.status >= 400) throw new Error("Sorry, can't award you this badge");
        res.json();
      })
      .then(res =>
        dispatch({
          type: 'ADD_BADGE',
          payload: [res],
        })
      )
      .catch(error => console.log('Cannot, sorry: ', error));
  };
}

export function getBadges() {
  return function (dispatch: AppDispatch) {
    fetch(`${DB_LOCALHOST}/getBadges`)
      .then(res => res.json())
      .then(res => {
        const result = res.map((badge: Badge) => {
          return {
            badgeName: badge.badgeName,
            badgeText: badge.badgeText,
            badgeImage: badge.badgeImage,
          };
        });
        dispatch({
          type: 'SET_ALL_BADGES',
          payload: result,
        });
      });
  };
}
