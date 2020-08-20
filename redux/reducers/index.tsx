import { Action } from '../actions';
import { Beer, TrendingBeer } from '../../Models/Beer.model';

export type State = {
  boroughs: [];
  beerSearchResults: Beer[];
  currentBorough: string;
  searchTerm: string;
  trendingBeers: TrendingBeer[];
  locationsNearby: [];
  user: {
    Locations: any[];
  };
  location: {
    latitude: number;
    longitude: number;
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
    Locations: [],
  },
  location: {
    latitude: 51.507388,
    longitude: -0.12789,
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
        user: { ...state.user, ...action.payload },
      };
    case 'ADD_ENTRY':
      const newLocations = [...state.user.Locations, action.payload];
      return {
        ...state,
        user: { ...state.user, Locations: newLocations },
      };
    case 'STORE_LOCATION':
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
}
