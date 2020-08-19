import { Action } from '../actions';
import { Beer } from '../../Models/Beer.model';

export type State = {
  beerSearchResults: Beer[];
  currentBorough: string;
  searchTerm: string;
  trendingBeers: Beer[];
  locationsNearby: [];
  user: object;
};

const initialState: State = {
  beerSearchResults: [],
  currentBorough: '',
  searchTerm: '',
  trendingBeers: [],
  locationsNearby: [],
  user: {},
};

export default function reducer(state: State = initialState, action: Action): State {
  const { type } = action;
  switch (type) {
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
    default:
      return state;
  }
}
