import React from 'react';
// component
import AppNavigation from './app/navigation/AppNavigation';
import { Provider } from 'react-redux';
// utils for remove warning setTimeout
import './app/utils/timeout';

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);
YellowBox.ignoreWarnings(['ImmutableStateInvariantMiddleware took']);
YellowBox.ignoreWarnings(['Require cycle:']);

import { store } from './app/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};
console.ignoredYellowBox = ['Require cycle: node_modules/react-native-paper'];
export default App;
