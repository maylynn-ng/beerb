import { Action, Beer, Pub } from '../actions';

export type State = {
  beerSearchResults: Beer[];
  currentBorough: string;
  searchTerm: string;
  locationsNearby: [];
};

const initialState: State = {
  beerSearchResults: [],
  currentBorough: '',
  searchTerm: '',
  locationsNearby: [],
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
    case 'SET_LOCATIONS_NEARBY':
      return {
        ...state,
        locationsNearby: action.payload,
      };
    default:
      return state;
  }
}
