import React, {Component} from "react";
import PropTypes from 'prop-types';
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, NavigationActions } from "react-navigation";

import {
  List,
  ListItem,
} from 'react-native-ui-kitten';

import {
    CameraIconFill,
} from '@src/assets/icons';

import HomeScreen from "../Screen/Home";
import PageScreen from "../Screen/Page";
import CategoryScreen from "../Screen/Category";

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    paddingTop:20
  },
  listItemTitle:{
    fontSize:18
  }
});

class drawerContentComponents extends Component {
    state={
      menu: [
        {
          name:'Beranda',
          link:'home',
          img:CameraIconFill,
          param:{id:'home', title:' Beranda'},
        },
        {
          name:'Artikel',
          link:'c',
          param:{id:'artikel', title:' Artikel'},
          img:CameraIconFill
        },
        {
          name:'Persija',
          link:'c',
          param:{id:'persija', title:' Persija'},
          img:CameraIconFill
        },
        {
          name:'Sepak Bola',
          link:'c',
          param:{id:'sepak-bola', title:'Sepak Bola'},
          img:CameraIconFill
        },
        {
          name:'Arena',
          link:'/c/arena',
          link:'c',
          param:{id:'arena', title:'Arena'},
          img:CameraIconFill
        },
        {
          name:'Gaya Hidup',
          link:'/c/gaya-hidup',
          link:'c',
          param:{id:'gaya-hidup', title:'Gaya Hidup'},
          img:CameraIconFill
        },
        {
          name:"Rob's Attack",
          link:'c',
          param:{id:'rob-s-attack', title:"Rob's Attack"},
          img:CameraIconFill
        },
        {
          name:'Galeri',
          link:'c',
          param:{id:'galeri', title:'Galeri'},
          img:CameraIconFill
        }
      ]
    }
    navigateToScreen = ( route,param ) =>(
        () => {
        let d =  Math.random () * 10000;
        // console.warn(d);
        const navigateAction = NavigationActions.navigate({
            routeName: route,
            params: param,
            key: d
        });
        this.props.navigation.closeDrawer();
        this.props.navigation.dispatch(navigateAction);
    })

    renderItem = ({ item })=>{
      return (
          <ListItem
              titleStyle={styles.listItemTitle}
              title={item.name}
              onPress={this.navigateToScreen(item.link,item.param)}
            />
      );
    }
    render() {
      return (
          <View style={styles.container}>
              <List
                data={this.state.menu}
                renderItem={this.renderItem}
              />
          </View>
      )
    }
}
const DrawerNav = createDrawerNavigator({
  home: {
    screen: HomeScreen
  },
  c: {
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
