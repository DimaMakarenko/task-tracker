import React from 'react';
// component
import AppNavigation from './app/navigation/AppNavigation';
import { Provider } from 'react-redux';

import { store } from './app/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
