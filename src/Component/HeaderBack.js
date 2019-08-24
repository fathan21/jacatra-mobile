import * as React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView
} from 'react-native';
import {
    Button,
    Layout,
    Text
} from 'react-native-ui-kitten';
import {
    TopNavigation,
    TopNavigationAction,
} from 'react-native-ui-kitten';
import {
    SafeAreaView as SafeAreaViewReactNavigation,
} from 'react-navigation';
import {
    ArrowBackOutlineWhite,
    BookmarkShapeWhite,
    BookmarkShape,
} from '@src/assets/icons';
import theme, {globalStyle} from '../assets/style';
import {logo} from '../assets/images';
import { ShareOutlineWhite } from '../assets/icons';


export class HeaderBack extends React.Component {
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
          
          <View style = {{display: 'flex',flexDirection: 'row', alignItems:'center'}} >
            
            <Button
              style={{
                  width:40,height:40, 
                  backgroundColor:theme.PRIMARY_COLOR, 
                  color:theme.PRIMARY_TEXT_COLOR,
                  padding:0,
                  display:'flex', alignItems:'center',justifyContent:'center', borderWidth:0
              }}
              size='large'
              icon={ArrowBackOutlineWhite}
              onPress={()=>this.props.navigation.goBack()}
            />
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
              icon={BookmarkShapeWhite}
              onPress={()=>this.props.navigation.goBack()}
            />
            
            <Button
              style={globalStyle.btnHeader}
              size='large'
              icon={ShareOutlineWhite}
              onPress={()=>this.props.share()}
            />
          </View>
      );
    }
    render() {
        return (
              <SafeAreaViewReactNavigation >
                <TopNavigation alignment = 'start'
                    style={{backgroundColor:theme.PRIMARY_COLOR, marginBottom:10, color:theme.PRIMARY_TEXT_COLOR}}
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
