import { Beer, TrendingBeer } from '../../Models/Beer.model';

const SEARCH_API_URL = process.env.REACT_NATIVE_UNTAPPED_SEARCH_URL;
const TRENDING_URL = process.env.REACT_NATIVE_UNTAPPED_TRENDING_URL;
const CLIENT_ID = process.env.REACT_NATIVE_UNTAPPED_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_NATIVE_UNTAPPED_CLIENT_SECRET;
const PLACES_NEARBY_URL = process.env.REACT_NATIVE_PLACES_NEARBY_URL;
const PLACES_KEY = process.env.REACT_NATIVE_PLACES_KEY;
const PLACES_NEARBY_PARAMS: string = '&radius=200&type=bar&keyword=pub&key=';

export type Action = {
  type: string;
  payload: any;
};

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

    let results: Beer[] = [];
    fetch(`${SEARCH_API_URL}${searchTerm}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
      .then(res => res.json())
      .then(res => {
        let beers = res.response.beers.items;
        for (let i = 0; i < beers.length; i++) {
          results.push({
            beerId: beers[i].beer.bid,
            haveHad: beers[i].have_had,
            beerName: beers[i].beer.beer_name,
            beerLabel: beers[i].beer.beer_label,
            beerIbu: beers[i].beer.beer_ibu,
            beerDescription: beers[i].beer.beer_description,
            beerStyle: beers[i].beer.beer_style,
            breweryName: beers[i].brewery.brewery_name,
            breweryCountry: beers[i].brewery.country_name,
            breweryLabel: beers[i].brewery.brewery_label,
            breweryUrl: beers[i].brewery.contact.url,
          });
        }
      })
      .then(dispatch({ type: 'SET_SEARCH_BEER_RESULTS', payload: results }));
  };
}

export function fetchTrending() {
  return function (dispatch: any) {
    let results: TrendingBeer[] = [];
    fetch(`${TRENDING_URL}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
      .then(res => res.json())
      .then(res => {
        console.log('YO YO IN FETCH');
        return res;
      })
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
      })
      .then(dispatch({ type: 'SET_TRENDING_BEER_RESULTS', payload: results }));
  };
}

export function fetchPlacesNearby(lat: number, lng: number) {
  return (dispatch: any) => {
    fetch(`${PLACES_NEARBY_URL}${lat},${lng}${PLACES_NEARBY_PARAMS}${PLACES_KEY}`)
      .then(res => res.json())
      .then(locations => {
        console.log('locations', locations);
        dispatch(setLocationsNearby(locations.results));
      });
  };
}

export function postEntry(newEntry: object) {
  return (dispatch: any) => {
    fetch('/location', {
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
      .catch(err => console.log(err));
  };
}

export function setUserInfo(user: object) {
  return {
    type: 'SET_USER_INFO',
    payload: user,
  };
}
