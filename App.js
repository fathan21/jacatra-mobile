import React, {Component} from "react";
import AppContainer from "./src/Navigation/Navigation";
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';

import { Provider } from 'react-redux';
import store from "./src/Redux/store";

const App = () => (
  <ApplicationProvider
    mapping={mapping}
    theme={lightTheme}>
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  </ApplicationProvider>
);
export default App;
