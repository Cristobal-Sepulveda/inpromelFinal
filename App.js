import React from 'react';
import { store } from './src/store/store';
import { Provider } from 'react-redux';

import RootNavigation from './src/navigator/RootNavigation';

export default function App() {
  return (
    <Provider store={store}>
        <RootNavigation />
    </Provider>
  );
}

