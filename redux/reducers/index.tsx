import { Action, Beer } from '../actions/actions';

export type State = {
  beerSearchResults: Beer[];
  currentBorough: string;
  searchTerm: string;
};

const initialState: State = {
  beerSearchResults: [],
  currentBorough: '',
  searchTerm: '',
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
    default:
      return state;
  }
}
