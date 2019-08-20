import * as React from 'react';
import {
    StyleSheet,
    View,
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
    TopNavigationActionProps,
    TopNavigationProps,
} from 'react-native-ui-kitten';
import {
    SafeAreaView as SafeAreaViewReactNavigation,
    SafeAreaViewProps,
} from 'react-navigation';
import {
    ArrowIosBackFill,
    SearchIconOutline,
    MenuIconDark,
} from '@src/assets/icons';



export default class Header extends React.Component {
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
        return ( <TopNavigationAction icon = {
                MenuIconDark
            }
            onPress = {
                this.openDrawer
            }
            />
        );
    }
    renderRightControls = () => {
        return (<View style = {
        {
          display: 'flex',
          flexDirection: 'row'
        }
      } >
      <TopNavigationAction icon = {
        SearchIconOutline
      }
      onPress = {
        this.onSearchPress
      }
      />
      <TopNavigationAction icon = {
        MenuIconDark
      }
      onPress = {
        this.openDrawer
      }
      />
      </View>);
    }
    render() {
        return (
              <SafeAreaViewReactNavigation >
                <TopNavigation alignment = 'start'
                    title = {this.props.title}
                    // leftControl={this.renderLeftControl()}
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
