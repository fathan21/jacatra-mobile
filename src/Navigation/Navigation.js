import React, {Component} from "react";
import PropTypes from 'prop-types';
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, NavigationActions } from "react-navigation";

import HomeScreen from "../Screen/Home";
import PageScreen from "../Screen/Page";
import CategoryScreen from "../Screen/Category";

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },    container: {
        alignItems: 'center',
    },
    headerContainer: {
        height: 150,
    },
    headerText: {
        color: 'red',
    },
    screenContainer: {
        paddingTop: 20,
        width: '100%',
    },
    screenStyle: {
        height: 30,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20,
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: '#00adff'
    },
    activeBackgroundColor: {
        backgroundColor: 'grey'
    }
});
/*
const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
});
*/
class drawerContentComponents extends Component {
    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

    render() {
      return (
          <View style={styles.container}>
              <View style={styles.headerContainer}>
                     <Text style={styles.headerText}>Header Portion</Text>
              </View>
              <View style={styles.screenContainer}>
                  <View style={[styles.screenStyle, (this.props.activeItemKey=='Home') ? styles.activeBackgroundColor : null]}>
                      <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Home') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Home')}>Screen A</Text>
                  </View>
                  <View style={[styles.screenStyle, (this.props.activeItemKey=='cat') ? styles.activeBackgroundColor : null]}>
                      <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='cat') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('cat')}>cat A</Text>
                  </View>
              </View>
          </View>
      )
    }
}
const DrawerNav = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  cat: {
    screen: CategoryScreen
  },
}, {
  contentComponent: drawerContentComponents
});
/*
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Category: CategoryScreen,
    Page: PageScreen
  },
  {
    initialRouteName: "Home"
  }
);*/
const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Page: PageScreen,
});
const AppNavigator = createStackNavigator({
  DrawerNav: DrawerNav,
  Page: PageScreen,
},{
  headerMode: "none"
});
//const AppContainer = createAppContainer(TabNavigator);

// const AppContainer = createAppContainer(DrawerNav);
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
