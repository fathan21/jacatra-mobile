import React from "react";
import {View, ImageBackground} from "react-native";
import {getAppSetting} from '../Redux/helper';

import {withTheme} from '../Redux/theme';

import {logo} from '../assets/images';
export class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    getAppSetting().then((e) => {
      // return e;
    });
    return new Promise((resolve) => setTimeout(() => {
      resolve('result')
    }, 2000))
  }

  async componentDidMount() {

    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('App');
    }
  }
  /*
  function updateAppNotice(){
    const APP_STORE_LINK = 'itms://itunes.apple.com/us/app/apple-store/myiosappid?mt=8';
    const PLAY_STORE_LINK = 'market://details?id=myandroidappid';
    Alert.alert(
       'Update Available',
       'This version of the app is outdated. Please update app from the '+(Platform.OS =='ios' ? 'app store' : 'play store')+'.',
       [
           {text: 'Update Now', onPress: () => {
               if(Platform.OS =='ios'){
                   Linking.openURL(APP_STORE_LINK).catch(err => console.error('An error occurred', err));
               }
               else{
                   Linking.openURL(PLAY_STORE_LINK).catch(err => console.error('An error occurred', err));
               }
           }},
       ]
   );
}
*/
  render() {
    return (<View style={[
        styles.viewStyles, {
          backgroundColor: this.props.theme.PRIMARY_COLOR
        }
      ]}>
      <ImageBackground source={logo.imageSource} style={styles.bg}></ImageBackground>
    </View>);
  }
}
const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bg: {
    width: 300,
    height: 100
  }
}

export default PageSc = withTheme(SplashScreen);
