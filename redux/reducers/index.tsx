import { Action } from '../../Models/Redux.model';
import { Beer } from '../../Models/Beer.model';
import { Badge } from '../../Models/Badge.model';
import { Borough, InitialBorough } from '../../Models/Borough.model';
import { User, InitialUser } from '../../Models/User.model';
import { Coordinates, InitialCoordinates } from '../../Models/Coordinates.model';

export type State = {
  allBadges: Badge[];
  beerdex: Beer[];
  boroughs: Borough[];
  currentBorough: Borough;
  location: Coordinates;
  isLoading: boolean;
  locationsNearby: [];
  searchTerm: string;
  user: User;
};

const initialState: State = {
  allBadges: [],
  beerdex: [],
  boroughs: [],
  currentBorough: InitialBorough,
  location: InitialCoordinates,
  isLoading: true,
  locationsNearby: [],
  searchTerm: '',
  user: InitialUser,
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
      const newLocations = [action.payload, ...state.user.Locations];
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
        user: { ...state.user, drunkBeers: [...state.user.drunkBeers, ...action.payload] },
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
    case 'SET_DRUNK_IDS':
      return {
        ...state,
        user: { ...state.user, uniqueDrunkIds: action.payload },
      };
    case 'SAVE_FAVOURITES':
      return {
        ...state,
        user: { ...state.user, favouriteBeers: action.payload },
      };
    case 'ADD_BADGE':
      return {
        ...state,
        user: { ...state.user, badges: [...state.user.badges, ...action.payload] },
      };
    case 'SET_BADGES':
      return {
        ...state,
        user: { ...state.user, badges: action.payload },
      };
    case 'SET_ALL_BADGES':
      return {
        ...state,
        allBadges: action.payload,
      };
    default:
      return state;
  }
}
