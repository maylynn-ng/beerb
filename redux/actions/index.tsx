import { Beer, TrendingBeer } from '../../Models/Beer.model';

const SEARCH_API_URL = process.env.REACT_NATIVE_UNTAPPED_SEARCH_URL;
const TRENDING_URL = process.env.REACT_NATIVE_UNTAPPED_TRENDING_URL;
const CLIENT_ID = process.env.REACT_NATIVE_UNTAPPED_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_NATIVE_UNTAPPED_CLIENT_SECRET;
const PLACES_NEARBY_URL = process.env.REACT_NATIVE_PLACES_NEARBY_URL;
const PLACES_KEY = process.env.REACT_NATIVE_PLACES_KEY;
const PLACES_NEARBY_PARAMS: string = '&radius=2000&type=bar&keyword=pub&key=';

export type Action = {
  type: string;
  payload: any;
};

export function storeLocation(location) {
  return {
    type: 'STORE_LOCATION',
    payload: location,
  };
}

export function setArrayOfBoroughs(boroughs) {
  return {
    type: 'SIMPLE_ARRAY_BOROUGHS',
    payload: boroughs,
  };
}

export function storeBorough(currentBorough: string): Action {
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

export function fetchSearchBeers(searchTerm: string) {
  return function (dispatch: any) {
    dispatch(setSearchTerm(searchTerm));

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
    console.log(
      '🍎 index.tsx, line 103: ',
      `${PLACES_NEARBY_URL}${lat},${lng}${PLACES_NEARBY_PARAMS}${PLACES_KEY}`
    );
    fetch(`${PLACES_NEARBY_URL}${lat},${lng}${PLACES_NEARBY_PARAMS}${PLACES_KEY}`)
      .then(res => res.json())
      .then(locations => {
        dispatch(setLocationsNearby(locations.results));
      });
  };
}

export function postEntry(newEntry: object) {
  return (dispatch: any) => {
    console.log('😩 index.tsx, line 117 before fetch newEntry: ', newEntry);
    fetch(`${process.env.EXPO_API_LOCALHOST}/location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    })
      .then(res => res.json())
      .then(data => {
        console.log('🦝 ', 'somewhere in postEntry action', data);
        dispatch({ type: 'ADD_ENTRY', payload: data });
      })
      .catch(err => console.log('🌞', err));
  };
}

export function setUserInfo(user: object) {
  return {
    type: 'SET_USER_INFO',
    payload: user,
  };
}

export function getLocations(user: object) {
  return (dispatch: any) => {
    fetch(``);
  };
}
