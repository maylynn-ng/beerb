import { Action } from '../actions';
import { Beer } from '../../Models/Beer.model';

export type State = {
  boroughs: [];
  currentBorough: string;
  searchTerm: string;
  locationsNearby: [];
  beerdex: any[];
  user: {
    beerSearchResults: Beer[];
    Locations: any[];
    boroughCounter: {};
    drunkBeers: any[];
  };
  location: {
    latitude: number;
    longitude: number;
  };
};

const initialState: State = {
  boroughs: [],
  currentBorough: '',
  searchTerm: '',
  locationsNearby: [],
  beerdex: [],
  user: {
    beerSearchResults: [],
    Locations: [],
    boroughCounter: {},
    drunkBeers: [],
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
    case 'SET_DRUNK_RESULTS':
      return {
        ...state,
        user: { ...state.user, drunkBeers: action.payload },
      };
    case 'SET_BEERDEX':
      return {
        ...state,
        beerdex: action.payload,
      };
    default:
      return state;
  }
}
