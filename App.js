import React from "react";
import AppContainer from "./src/Navigation/Navigation";
import {mapping, light as lightTheme} from '@eva-design/eva';
import {ApplicationProvider} from 'react-native-ui-kitten';
import {View} from 'react-native';

import {_storeLocalData, _getLocalData} from './src/Redux/helper';

import {Provider} from 'react-redux';
import store from "./src/Redux/store";
import {ThemeContextProvider} from './src/Redux/theme';

class App extends React.Component {
  state = {
    themeApp: 'light',
    loading: true
  }

  componentDidMount() {
    _getLocalData('_theme').then((e) => {
      if (e === 'dark') {
        this.setState({themeApp: e, loading: false})
      } else {
        this.setState({themeApp: 'light', loading: false})
      }
    })
  }

  setTheme = (theme) => {
    console.warn(theme);
  }

  render() {
    if (this.state.loading) {
      return (<View></View>);
    }
    return (<ApplicationProvider mapping={mapping} theme={lightTheme}>
      <ThemeContextProvider defTheme={this.state.themeApp}>
        <Provider store={store}>
          <AppContainer/>
        </Provider>
      </ThemeContextProvider>
    </ApplicationProvider>);
  }
}
export default App;
