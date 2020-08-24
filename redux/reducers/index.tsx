import { Action } from '../actions';
import { Beer } from '../../Models/Beer.model';

export type State = {
  beerdex: any[];
  boroughs: [];
  currentBorough: string;
  location: {
    latitude: number;
    longitude: number;
  };
  isLoading: boolean;
  locationsNearby: [];
  searchTerm: string;
  user: {
    beerFreqs: [[]];
    beerSearchResults: Beer[];
    boroughCounter: {};
    drunkBeers: any[];
    favouriteBeers: Set<Object>;
    Locations: any[];
    sub: string;
  };
};

const initialState: State = {
  beerdex: [],
  boroughs: [],
  currentBorough: '',
  location: {
    latitude: 51.507388,
    longitude: -0.12789,
  },
  isLoading: true,
  locationsNearby: [],
  searchTerm: '',
  user: {
    beerFreqs: [[]],
    beerSearchResults: [],
    boroughCounter: {},
    drunkBeers: [],
    favouriteBeers: new Set(),
    Locations: [],
    sub: '',
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
        user: {
          ...state.user,
          beerSearchResults: action.payload,
        },
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
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
        user: {
          ...state.user,
          Locations: newLocations,
          boroughCounter: {
            ...state.user.boroughCounter,
            [action.payload.boroughName]: state.user.boroughCounter[action.payload.boroughName]
              ? state.user.boroughCounter[action.payload.boroughName] + 1
              : 1,
          },
        },
      };
    case 'STORE_LOCATION':
      return {
        ...state,
        location: action.payload,
      };
    case 'GET_LOCATIONS':
      return {
        ...state,
        user: { ...state.user, boroughCounter: action.payload },
      };
    case 'LOGOUT':
      return initialState;
    case 'SET_DRUNK_BEERS':
      return {
        ...state,
        user: { ...state.user, drunkBeers: action.payload },
      };
    case 'SET_BEERDEX':
      return {
        ...state,
        beerdex: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'STORE_BEER_FREQS':
      return {
        ...state,
        user: { ...state.user, beerFreqs: action.payload },
      };
    case 'SAVE_FAVOURITES':
      return {
        ...state,
        user: { ...state.user, favouriteBeers: action.payload },
      };
    default:
      return state;
  }
}
