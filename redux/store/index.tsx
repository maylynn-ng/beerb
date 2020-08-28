import reducer from '../reducers';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(reducer, applyMiddleware(ReduxThunk));

export default store;
