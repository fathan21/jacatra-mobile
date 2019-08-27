import React from "react";
import { View,Text, ImageBackground, Dimensions } from "react-native";


const widthWindow = Dimensions.get('window').width;
const heightWindow = Dimensions.get('window').height;
import {splashBg} from '../assets/images';
export default class SplashScreen extends React.Component {
  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }

  async componentDidMount() {
    
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('App');
    }
  }
  render() {
    return ( 
    <View style={styles.viewStyles}>
      <ImageBackground source={splashBg.imageSource} style={styles.bg}>
      </ImageBackground>
    </View>
    );
  }
}
const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  bg: {
    width: widthWindow,
    height: heightWindow
  }
}
