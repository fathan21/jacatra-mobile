import React, {Component} from "react";
import PropTypes from 'prop-types';
import { View, Text, Button, ScrollView, StyleSheet, Image } from "react-native";
import { 
    createMaterialTopTabNavigator, createSwitchNavigator,
    createBottomTabNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, NavigationActions } from "react-navigation";

import {
  List,
  ListItem,
} from 'react-native-ui-kitten';

import {
    MenuIconWhite,
} from '@src/assets/icons';

import HomeScreen from "../Screen/Home";
import SplashScreen from "../Screen/SplashScreen";
import PageScreen from "../Screen/Page";
import CategoryScreen from "../Screen/Category";
import SettingScreen from "../Screen/Setting";
import SearchScreen from "../Screen/Search";

import theme, {globalStyle} from '../assets/style';
import {logo} from '../assets/images';
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    paddingTop:20,
    backgroundColor:'#ffffff'
  },
  listItemTitle:{
    fontSize:18,
    margin:0,
    color: '#ffffff',
    backgroundColor:'#ffffff'
  }
});

class drawerContentComponents extends Component {
    state={
      menuSetting: [
        {
          name:'Bookmark',
          link:'c',
          param:{id:'bookmark', title:' bookmark'},
          img:MenuIconWhite
        },
        {
          name:'Pengaturan',
          link:'setting',
          param:{ link:'', type:'setting'},
        },
        {
          name:'Teantang Kami',
          param:{ link:'tentang-kami', type:'page'},
          img:MenuIconWhite
        },
        {
          name:'Hubungi Kami',
          param:{ link:'hubungi-kami', type:'page'},
          img:MenuIconWhite
        },
      ],
      menu: [
        {
          name:'Beranda',
          link:'home',
          img:MenuIconWhite,
          param:{id:'home', title:' Beranda'},
        },
        {
          name:'Artikel',
          link:'c',
          param:{id:'artikel', title:' Artikel'},
          img:MenuIconWhite
        },
        {
          name:'Persija',
          link:'c',
          param:{id:'persija', title:' Persija'},
          img:MenuIconWhite
        },
        {
          name:'Sepak Bola',
          link:'c',
          param:{id:'sepak-bola', title:'Sepak Bola'},
          img:MenuIconWhite
        },
        {
          name:'Arena',
          link:'/c/arena',
          link:'c',
          param:{id:'arena', title:'Arena'},
          img:MenuIconWhite
        },
        {
          name:'Gaya Hidup',
          link:'/c/gaya-hidup',
          link:'c',
          param:{id:'gaya-hidup', title:'Gaya Hidup'},
          img:MenuIconWhite
        },
        {
          name:"Rob's Attack",
          link:'c',
          param:{id:'rob-s-attack', title:"Rob's Attack"},
          img:MenuIconWhite
        },
        {
          name:'Galeri',
          link:'c',
          param:{id:'galeri', title:'Galeri'},
          img:MenuIconWhite
        }
      ],

    }
    navigateToScreen = ( route,param ) =>(
        () => {
        if (param.type == 'setting') { 
          this.props.navigation.closeDrawer();
          this.props.navigation.push('Setting')
          return;
        }
        if (param.type == 'page') { 
          this.props.navigation.closeDrawer();
          this.props.navigation.push('Page', {
              itemId: param.link,
          })
          return;
        }
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
          
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.navigateToScreen(item.link,item.param)}
          >
            <View  style={{ borderBottomWidth: 0, width: '100%',
            marginVertical:5,paddingVertical:0, borderBottomColor:'#ffffff'}}>
              <Text style={{color:theme.PRIMARY_COLOR,fontSize:16, marginLeft:10,fontWeight:'bold'}}>{item.name}</Text>
            </View>
        </TouchableOpacity>
      );
    }

    render() {
      return (
        <View style={{backgroundColor:'#ffffff'}}>
          <View style={{marginBottom:10, display:'flex',justifyContent:'flex-end', alignItems:'center',backgroundColor:theme.PRIMARY_COLOR,
            height:90, paddingBottom:10
          }}>
            <Image
                style={globalStyle.logo}
                source={logo.imageSource}
              />
          </View>
          <ScrollView style={{backgroundColor:'#ffffff'}}>
              <List
                style={{backgroundColor:'#ffffff', borderBottomWidth:1,paddingBottom:10, borderBottomColor:theme.PRIMARY_COLOR, marginBottom:10}}
                descriptionStyle={{backgroundColor:'#ffffff'}}
                data={this.state.menu}
                renderItem={this.renderItem}
              />
              <List
                style={{backgroundColor:'#ffffff', borderBottomWidth:0,paddingBottom:10, borderBottomColor:theme.PRIMARY_COLOR}}
                descriptionStyle={{backgroundColor:'#ffffff'}}
                data={this.state.menuSetting}
                renderItem={this.renderItem}
              />
          </ScrollView>
        </View>
      )
    }
}
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

const TabNavigator = createMaterialTopTabNavigator({
  Home: HomeScreen,
  c: HomeScreen,
});
const DrawerNav = createDrawerNavigator({
  home: {
    screen: HomeScreen
  },
  c: {
    screen: CategoryScreen
  },
}, 
{
  contentComponent: drawerContentComponents,
  style:{
    backgroundColor:'#ffffff',
  }
});
const AppNavigator = createStackNavigator({
  DrawerNav: DrawerNav,
  Page: PageScreen,
  Setting: SettingScreen,
  Search: SearchScreen
},{
  headerMode: "none"
});
const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: AppNavigator
});

export default createAppContainer(InitialNavigator);
//const AppContainer = createAppContainer(TabNavigator);

// const AppContainer = createAppContainer(DrawerNav);
// const AppContainer = createAppContainer(AppNavigator);
// export default AppContainer;
