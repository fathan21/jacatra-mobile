import * as React from 'react';
import {
    StyleSheet,
    View,
    Image,
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
import {
    SearchIconOutlineWhite,
    MenuIconWhite,
} from '@src/assets/icons';
import theme, {globalStyle} from '../assets/style';
import {logo} from '../assets/images';


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
            <Image
              style={globalStyle.logo}
              source={logo.imageSource}
          />
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
                <TopNavigation alignment = 'start'
                    style={{backgroundColor:theme.PRIMARY_COLOR, marginBottom:0, color:theme.PRIMARY_TEXT_COLOR}}
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
