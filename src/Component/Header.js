import * as React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';
import {
    Button,
} from 'react-native-ui-kitten';
import {
    TopNavigation,
} from 'react-native-ui-kitten';
import {
    SafeAreaView as SafeAreaViewReactNavigation,
} from 'react-navigation';
import {GeneralStatusBarColor} from './GeneralStatusBarColor';
import {
    SearchIconOutlineWhite,
    MenuIconWhite,IconApp
} from '@src/assets/icons';
import theme, {globalStyle} from '../assets/style';
import {logo, icon} from '../assets/images';


export class Header extends React.Component {
    state = {

    }
    componentWillMount() {

    };

    onSearchPress = () => {

    };
    openDrawer = () => {
        this.props.navigation.openDrawer();
    };
    renderLeftControl = () => {
        return (
          
          <View style = {{display: 'flex',flexDirection: 'row', justifyContent:'center',alignItems:'flex-start'}} >
            <Image
                style={globalStyle.logo}
                source={logo.imageSource}
            />
          </View>
        );
    }
    renderRightControls = () => {
        return (
          <View style = {{display: 'flex',flexDirection: 'row'}} >
            
            <Button
              style={globalStyle.btnHeader}
              size='large'
              icon={SearchIconOutlineWhite}
              onPress={()=>this.props.navigation.push('Search')}
            />
            <Button
              style={globalStyle.btnHeader}
              size='large'
              icon={MenuIconWhite}
              onPress={this.openDrawer}
            />
          </View>
      );
    }
    render() {
        return (
              <SafeAreaViewReactNavigation >
                
                <GeneralStatusBarColor backgroundColor={theme.PRIMARY_HEADER_BG}
                  barStyle="light-content"/>
                <TopNavigation alignment = 'start'
                    style={{backgroundColor:theme.PRIMARY_HEADER_BG, marginBottom:0, color:theme.PRIMARY_TEXT_COLOR}}
                    leftControl={this.renderLeftControl()}
                    rightControls = {
                      this.renderRightControls()
                    }
                    />
                </SafeAreaViewReactNavigation>
              );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    }
});
