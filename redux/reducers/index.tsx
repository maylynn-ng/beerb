import { Action } from '../actions/actions';

type State = {
  currentBorough: string;
};

const initialState: State = {
  currentBorough: '',
};

export default function reducer(state: State = initialState, action: Action) {
  const { type } = action;
  switch (type) {
    case 'STORE_BOROUGH':
      return {
        ...state,
        currentBorough: action.payload,
      };
    default:
      return state;
  }
}
