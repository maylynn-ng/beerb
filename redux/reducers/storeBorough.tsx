import Action from '../actions/actions.tsx';

type State = {
  currentBorough: string;
};

const initialState: State = {
  currentBorough: '',
};

export default function storeBoroughReducer(state: State = initialState, action: Action) {
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
