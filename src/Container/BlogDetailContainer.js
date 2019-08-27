import React from "react";
import { Dimensions, ScrollView, RefreshControl, View, Text, TouchableOpacity, Linking  } from "react-native";
import {
    Layout
} from 'react-native-ui-kitten';
import HTML from 'react-native-render-html';
import {toDate} from '../Redux/helper';
import AutoHeightImage from 'react-native-auto-height-image';
import ImageView from 'react-native-image-view';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { WebView } from "react-native-webview";

import {RenderKeywordBlog, RenderRelatedBlog, } from '../Component/';

export  class BlogDetailContainer extends React.Component {
  state = {
    isImageViewVisible: false,
    imageIndex:0
  };
  constructor(props) {
    super(props);
  }
  
  ComponentDidMount() {
  };
  
  componentWillMount(){
  }
  componentWillUnmount(){
  }
  _replaceAll =(content,search, replacement) => {
    return content.split(search).join(replacement);
  };
  
  _renderImage = (data,i=0) =>{
    return (
      <View key={i}>
        <TouchableOpacity key={data.title} onPress={()=> {
            this.setState({
                imageIndex: i,
                isImageViewVisible: true,
              });
            }}
            >
            <AutoHeightImage width={Dimensions.get('window').width} source={{uri: data.img}} />
        </TouchableOpacity>
        <Text style={{marginHorizontal:10, color:'#767676', fontSize:11}}>
            {data.photographer}
        </Text>
    </View>
    );
  }
  _renderImages = (data) =>{
    return (
      <View key={0} style={{
        borderBottomWidth:0,
        paddingBottom:25
      }}>
        <SwiperFlatList
          autoplayDelay={5}
          autoplayLoop
          index={data.imgs.length-1}
          showPagination
          paginationDefaultColor={"#D6D6D6"}
          paginationActiveColor={"#5c171a"}
          paginationStyle={{height:25}}
          paginationStyleItem={{width:20, height:20, margin:0,padding:0}}
        >
          { 
            data.imgs.map((img, i) => {
              // img.photographer = img.name;
              return (
                this._renderImage(img,i)
              );
            })
          }
        </SwiperFlatList>
      </View>
    );
  }
  _renderVideo = (data) =>{
    return (
      <View style={{width:'100%', height:250}} key={0}>
         <WebView
            style={ {margin : 20 }}
            source={{ uri: data.video }}
            javaScriptEnabled={true}
            domStorageEnabled={true}   
          />
      </View>
    )
  }
  render() {
    const IMAGES_MAX_WIDTH = Dimensions.get('window').width;
    const CUSTOM_STYLES = {};
    const CUSTOM_RENDERERS = {};
    const DEFAULT_PROPS = {
        htmlStyles: CUSTOM_STYLES,
        renderers: CUSTOM_RENDERERS,
        imagesMaxWidth: IMAGES_MAX_WIDTH  - 20,
        onLinkPress: (evt, href) => { Linking.openURL(href); },
        debug: true
    };

    const {
      data,
      isRefreshing,
      onRefresh,
      realted,
      goToPage,
      } = this.props;
    let content = '';
    let media = [];
    if(data.content){
      content = this._replaceAll(data.content,"<p><br></p>",'');
    }

    let images = [];
    if(data.type == 'article'){
      media.push(this._renderImage(data,0));
      images = [
        {
            source: {
                uri:data.img,
            },
            title: data.title,
            width: IMAGES_MAX_WIDTH,
            height: IMAGES_MAX_WIDTH / 2,
        },
      ];
    }
    if(data.type == 'galery'){
      media.push(this._renderImages(data));
      data.imgs.forEach(element => {
          images.push({
            source: {
                uri:element.img,
            },
            title: element.name,
            width: IMAGES_MAX_WIDTH,
            height: IMAGES_MAX_WIDTH / 2,
          })
      });
    }
    if(data.type == 'video'){
      media.push(this._renderVideo(data));
    }



    return (
      <Layout style={{paddingBottom:50}}>
        <ScrollView 
          refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                tintColor="#000000"
                title="Loading..."
                titleColor="#000000"
                colors={['#000000', '#000000', '#000000']}
                progressBackgroundColor="#ffffff"
              />
          }
          >
            <ScrollView  style={{ flex: 1, marginHorizontal:0, marginTop:0,paddingBottom:10 }}>        
              <View style={{marginVertical:10,marginHorizontal:10}}>
                <Text style={{fontSize:20,fontWeight:'bold', marginBottom:10,color:'#000000', letterSpacing:1.5, textAlign:'justify'}}>
                  {data.title}
                </Text>
                <Text style={{fontSize:11,color:'#767676', textTransform:'capitalize'}}>
                  {data.writer}
                  {'\n'}
                  jacatra.net - {toDate(data.date)}
                </Text>
              </View>
              {
                data.title?
                media:null
              }
              <View style={{marginHorizontal:10}}>
                {
                  content?
                  <HTML html={content}
                    {...DEFAULT_PROPS}
                    tagsStyles={{p:{padding:0,margin: 0,marginBottom:0,fontSize:14,color:'black',letterSpacing:0.5,textAlign:'justify'}}
                    }
                  />:null
                }
              </View>
            </ScrollView>
            <RenderKeywordBlog items={(data.tags).split(',')} />
            <RenderRelatedBlog items={realted} goToPage={goToPage} />
        </ScrollView>
        {
          data.title?
          
          <ImageView
              glideAlways
              images={images}
              imageIndex={this.state.imageIndex}
              animationType="fade"
              isVisible={this.state.isImageViewVisible}
              renderFooter={(currentImage) => (<View style={{width:100,height:100}}><Text>My footer</Text></View>)}
              onClose={() => this.setState({isImageViewVisible: false})}
              onImageChange={index => {
                  console.log(index);
              }}
          />:null
        }
        
      </Layout>
    );
  }
}
