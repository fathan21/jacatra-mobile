import React, {Component} from "react";
import AppContainer from "./src/Navigation/Navigation";
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';


const App = () => (
  <ApplicationProvider
    mapping={mapping}
    theme={lightTheme}>
    <AppContainer/>
  </ApplicationProvider>
);
export default App;