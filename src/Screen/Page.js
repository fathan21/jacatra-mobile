import React from "react";
import { ScrollView, RefreshControl, View, Text, Image, ImageBackground  } from "react-native";
import {
    Layout,
} from 'react-native-ui-kitten';
import HTML from 'react-native-render-html';
import HeaderBack from '../Component/HeaderBack';
import Toast from 'react-native-easy-toast';

import {api} from '../Redux/Actions';
import {toDate} from '../Redux/helper';

export default class PageScreen extends React.Component {
  state = {
    isRefreshing: false,
    loading: false,
    error: false, 
    data: {},
    realted:[]
  } 
  toast = null;
  static navigationOptions = {
    title: 'Page',
  };
  
  constructor(props) {
    super(props);
    this._goToPage = this._goToPage.bind(this);
  }
  
  componentWillMount() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    this._getData(itemId);
  };
  
  __onRefresh = (itemId)=> {
    this.setState({isRefreshing:true},()=>{this._getData(itemId);})
  }
  _toast = (msg) => {
    this.toast.show(msg, 3000, () => {
       // something you want to do at close
   });
  }
  _getData = (itemId) => {
    itemId = itemId.replace("/p/", "");
    this.setState({loading:true},()=>{
      api.get('news_detail/' + itemId).then((res) => {
        this.setState({
          loading: false,
          isRefreshing:false,
          data: res.data.data
        },()=>{this._getRelated(itemId)});
      }).catch((e)=>{
        this.setState({
          loading: false,
          isRefreshing:false,
        });
        this._toast('tolong coba lagi')
      });
    });
  }
  _getRelated = (itemId) => {
    itemId = itemId.replace("/p/", "");
    api.get('news_detail_related/' + itemId).then((res) => {
      this.setState({
        loading: false,
        realted: res.data.data
      });
    }).catch((e)=>{
      this.setState({
        loading: false,
      });
      this._toast('tolong coba lagi')
    });
  }
  
  _goToPage = (item) => {
    // console.warn(item);
    if(!item.id){
      return;
    }
    this.props.navigation.push('Page', {
        itemId: item.link,
    })
  };
  replaceAll =(content,search, replacement) => {
    return content.split(search).join(replacement);
  };
  render() {
    const {data} = this.state;
    let content = '';
    if(data.content){
      content = this.replaceAll(data.content,"<p><br></p>",'');
    }
    return (
      <Layout >
        <HeaderBack navigation = {this.props.navigation} title={'title'} />

        <ScrollView 
          refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh}
                tintColor="#000000"
                title="Loading..."
                titleColor="#000000"
                colors={['#000000', '#000000', '#000000']}
                progressBackgroundColor="#ffffff"
              />
          }
          >
            
          {
            this.state.loading?
            <View >
              <View style={{marginVertical:10,marginHorizontal:5, width:'90%', height:35,backgroundColor:'#f4f4f4'}}>
              </View>
              <View style={{marginVertical:10,marginHorizontal:5, width:'10%', height:20,backgroundColor:'#f4f4f4'}}>
              </View>
              <View style={{marginVertical:10,marginHorizontal:5, width:'30%', height:20,backgroundColor:'#f4f4f4'}}>
              </View>
              <View style={{marginVertical:10,marginHorizontal:5, width:'30%', height:20,backgroundColor:'#f4f4f4'}}>
              </View>
              
              <View style={{marginVertical:10,marginHorizontal:5, width:'90%', height:20,backgroundColor:'#f4f4f4'}}>
              </View>
              <View style={{marginVertical:10,marginHorizontal:5, width:'90%', height:20,backgroundColor:'#f4f4f4'}}>
              </View>
              <View style={{marginVertical:10,marginHorizontal:5, width:'90%', height:20,backgroundColor:'#f4f4f4'}}>
              </View>
            </View>
            :null
          }
          {
            !this.state.loading && !this.state.error?
            <ScrollView  style={{ flex: 1, marginHorizontal:0, marginTop:0,paddingBottom:100 }}>        
              <View style={{marginVertical:10,marginHorizontal:10}}>
                <Text style={{fontSize:20,fontWeight:'bold', marginBottom:10,color:'#000000', letterSpacing:1.5, textAlign:'justify'}}>
                  {data.title}
                </Text>
                <Text style={{fontSize:14,fontWeight:'bold', marginBottom:0,color:'#767676',textTransform:'uppercase'}}>
                  {data.writer}
                </Text>
                <Text style={{fontSize:11, marginBottom:10,color:'#767676'}}>
                  jacatra.net - {toDate(data.date)}
                </Text>
              </View>
              
              <View>
                <ImageBackground source={{uri:data.img}} style={{width:'100%', height:250}}
                  >

                </ImageBackground>
                <Text style={{marginHorizontal:10, color:'#767676', fontSize:11}}>
                    {data.photographer}
                </Text>
              </View>
              {
                data.title?
                <HTML html={content} 
                  style={{width:'100%'}}
                  tagsStyles={{p:{padding:0,margin: 10,fontSize:14,color:'black',letterSpacing:0.5,textAlign:'justify'}}}
                />:null
              }
            </ScrollView>
            :null
          }
        </ScrollView>
        
        <Toast
              opacity={0.5}
              ref={ref => { this.toast = ref; }} />
      </Layout>
    );
  }
}
