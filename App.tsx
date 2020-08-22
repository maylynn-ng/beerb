import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StyleSheet, SafeAreaView } from 'react-native';

import reducer from './redux/reducers';
import ReduxThunk from 'redux-thunk';
import Login from './Components/Login';
import Loading from './Components/Loading';

const store = createStore(reducer, applyMiddleware(ReduxThunk));

// store.subscribe(() => {
//   console.log('💮💮💮💮💮💮', store.getState());
// });

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Login />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
