import { Action, Beer } from '../actions';

export type State = {
  beerSearchResults: Beer[];
  currentBorough: string;
  searchTerm: string;
  user: object;
};

const initialState: State = {
  beerSearchResults: [],
  currentBorough: '',
  searchTerm: '',
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

    case 'SET_USER_INFO':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
