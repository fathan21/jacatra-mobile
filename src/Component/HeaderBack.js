import * as React from 'react';

import {
    StyleSheet,
    View, Text,
    Image
} from 'react-native';

import {GeneralStatusBarColor} from './GeneralStatusBarColor';
import {
    TopNavigation,Popover
} from 'react-native-ui-kitten';
import {
    SafeAreaView as SafeAreaViewReactNavigation,
} from 'react-navigation';

import  {globalStyle} from '../assets/style';
import {logo, BackImg, StartOutlineImg, StartImg, AlphabetImg, ShareImg} from '../assets/images';
import { TouchableOpacity } from 'react-native-gesture-handler';


export class HeaderBack extends React.Component {
    state = {
      popoverVisible: false
    }
    componentWillMount() {
    };

    onSearchPress = () => {
    };
    openDrawer = () => {
        this.props.navigation.openDrawer();
    };
    renderPopover=()=>{
      return (
        <View style={{width:200, paddingHorizontal:10, shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        
        elevation: 24,}}>
          <TouchableOpacity
              onPress={(e)=>{this.props.fontSizeChange(0); this.setState({popoverVisible:false}) }} 
            >
            <Text style={{fontSize:16,fontWeight:'bold', marginVertical:20,}}>Kecil</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={(e)=>{this.props.fontSizeChange(1); this.setState({popoverVisible:false}) }} 
            >
            <Text style={{fontSize:16,fontWeight:'bold', marginVertical:10,}}>Sedang</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
              onPress={(e)=>{this.props.fontSizeChange(2); this.setState({popoverVisible:false}) }} 
            >
            <Text style={{fontSize:16,fontWeight:'bold', marginVertical:10,}}>Besar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
              onPress={(e)=>{this.props.fontSizeChange(3); this.setState({popoverVisible:false}) }} 
            >
            <Text style={{fontSize:16,fontWeight:'bold', marginVertical:10,}}>Sangat Besar</Text>
          </TouchableOpacity>
        </View>
      )
    }
    renderLeftControl = () => {
        return (
          
          <View style = {{display: 'flex',flexDirection: 'row', alignItems:'center'}} >
            
            <TouchableOpacity 
              onPress={()=>this.props.navigation.goBack()}
            >
              <Image
                  style={globalStyle.btnImgHeader}
                  source={BackImg.imageSource}
              />
            </TouchableOpacity>
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
            
            <Popover
            visible={this.state.popoverVisible}
            content={this.renderPopover()}
            onBackdropPress={(e)=>{this.setState({popoverVisible:false})}}>
              
              <TouchableOpacity 
                onPress={()=>this.setState({popoverVisible:true})}
              >
                <Image
                    style={globalStyle.btnImgHeader}
                    source={AlphabetImg.imageSource}
                />
              </TouchableOpacity>
            </Popover>
            <TouchableOpacity 
              onPress={()=>this.props.share()}
            >
              <Image
                  style={globalStyle.btnImgHeader}
                  source={ShareImg.imageSource}
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={()=>this.props.saveBookmark(this.props.data)}
            >
              <Image
                  style={globalStyle.btnImgHeader}
                  source={this.props.isBookmark?StartImg.imageSource:StartOutlineImg.imageSource}
              />
            </TouchableOpacity>
          </View>
      );
    }
    render() {
      const {data, theme} = this.props;
     // let isB = data.id? IsBoomark(data.id):null;
      // console.warn(isB);    
        return (
              <SafeAreaViewReactNavigation >
                <GeneralStatusBarColor backgroundColor={theme.PRIMARY_HEADER_BG} barStyle="light-content"/>
                <TopNavigation alignment = 'start'
                    style={{backgroundColor:theme.PRIMARY_HEADER_BG, marginBottom:0, color:theme.PRIMARY_TEXT_COLOR}}
                    leftControl={this.renderLeftControl()}
                    rightControls = {data?this.renderRightControls():null}
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
