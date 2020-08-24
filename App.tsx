import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, SafeAreaView } from 'react-native';
import store from './redux/store';
import Login from './Components/Login';

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
    paddingTop: 25,
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
