import { Action } from '../actions';
<<<<<<< HEAD
import { Beer } from '../../Models/Beer.model';
import { userInfo } from 'os';
=======
import { Beer, TrendingBeer } from '../../Models/Beer.model';
>>>>>>> origin/beerdex

export type State = {
  boroughs: [];
  beerSearchResults: Beer[];
  currentBorough: string;
  searchTerm: string;
  trendingBeers: TrendingBeer[];
  locationsNearby: [];
  user: {
    locations: any[];
  };
};

const initialState: State = {
  boroughs: [],
  beerSearchResults: [],
  currentBorough: '',
  searchTerm: '',
  trendingBeers: [],
  locationsNearby: [],
  user: {
    locations: [],
  },
};

export default function reducer(state: State = initialState, action: Action): State {
  const { type } = action;
  switch (type) {
    case 'SIMPLE_ARRAY_BOROUGHS':
      return {
        ...state,
        boroughs: action.payload,
      };
    case 'STORE_BOROUGH':
      return {
        ...state,
        currentBorough: action.payload,
      };
    case 'SET_SEARCH_BEER_RESULTS':
      return {
        ...state,
        beerSearchResults: action.payload,
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'SET_TRENDING_BEER_RESULTS':
      return {
        ...state,
        trendingBeers: action.payload,
      };
    case 'SET_LOCATIONS_NEARBY':
      return {
        ...state,
        locationsNearby: action.payload,
      };
    case 'SET_USER_INFO':
      return {
        ...state,
        user: action.payload,
      };
    case 'ADD_ENTRY':
      return {
        ...state,
        user: { ...state.user, locations: [...state.user.locations, action.payload] },
      };
    default:
      return state;
  }
}
