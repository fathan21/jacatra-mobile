import React from "react";
import { Dimensions, ScrollView, RefreshControl, View, Text, TouchableOpacity, Linking  } from "react-native";
import {
    Layout
} from 'react-native-ui-kitten';
import HTML from 'react-native-render-html';
import {toDate, _storeLocalData, _getLocalData} from '../Redux/helper';
import AutoHeightImage from 'react-native-auto-height-image';
import ImageView from 'react-native-image-view';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { WebView } from "react-native-webview";

import {RenderKeywordBlog, RenderRelatedBlog, } from '../Component/';
import theme from "../assets/style";

const heightWindow = Dimensions.get('window').height;
const widthWindow = Dimensions.get('window').width;
export  class BlogDetailContainer extends React.Component {
  state = {
    isImageViewVisible: false,
    imageIndex:0,
    
    titelFontSize:20,
    contentFontSize:16,
    subContentFontsize:13,
    fontSizeMenu:[
      {title:'Kecil', fontSize:{title:18,cont:14, sub:11} },
      {title:'Sedang', fontSize:{title:20,cont:16, sub:13} },
      {title:'Besar', fontSize:{title:22,cont:20, sub:15} },
      {title:'Sangat Besar', fontSize:{title:25,cont:20, sub:16} },
    ]
  };
  constructor(props) {
    super(props);
  }
  
  ComponentDidMount() {
  };
  
  componentWillMount(){
    _getLocalData('_fontSizeType').then((e)=>{
      if(e!==null) {
        let fontSizeType = parseFloat(e);
        let d = this.state.fontSizeMenu.filter((val,idx)=>{
          return idx == fontSizeType
        });
        
        if(d.length > 0){
            this.setState({
              titelFontSize:d[0].fontSize.title,
              contentFontSize:d[0].fontSize.cont,
              subContentFontsize:d[0].fontSize.sub,
            },()=>{

            });
        }
      }
    })
  }
  componentWillUnmount(){
  }
  componentWillReceiveProps(prevProps){
    if(prevProps.fontSizeType !== undefined){
      let d = this.state.fontSizeMenu.filter((val,idx)=>{
        return idx == prevProps.fontSizeType
      });
      if(d.length > 0){
        _storeLocalData('_fontSizeType',prevProps.fontSizeType).then((e)=>{
          this.setState({
            titelFontSize:d[0].fontSize.title,
            contentFontSize:d[0].fontSize.cont,
            subContentFontsize:d[0].fontSize.sub,
          },()=>{

          });
        })
      }
    }
  }
  _replaceAll =(content,search, replacement) => {
    return content.split(search).join(replacement);
  };
  
  _renderImage = (data,i=0) =>{
    return (
      <View key={i} >
        <TouchableOpacity key={data.title} onPress={()=> {
            this.setState({
                imageIndex: i,
                isImageViewVisible: true,
              });
            }}
            >
            <View style={{minHeight:Dimensions.get('window').width /2,backgroundColor:'#e1e4e8'}}>
              <AutoHeightImage width={Dimensions.get('window').width} source={{uri: data.img}} 
              />
            </View>
        </TouchableOpacity>

        <Text style={{marginHorizontal:10, color:'#767676', fontSize:this.state.subContentFontsize}}>
            {data.photographer}
        </Text>
    </View>
    );
  }
  _renderImages = (data) =>{
    return (
      <View key={0} style={{
        borderBottomWidth:0,
        paddingBottom:0
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
      <View style={{width:widthWindow, height:(widthWindow/2), backgroundColor:'#cccccc', marginBottom:20}} key={0}>
         <WebView
            style={ {margin :0 }}
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
        marginTop:20,
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
    let {
      titelFontSize,
      contentFontSize,
      subContentFontsize
    } = this.state;


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
      <Layout style={{paddingBottom:10, backgroundColor:theme.CARD_TEXT_BG,minHeight:heightWindow}}>
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
                <Text style={{fontSize:titelFontSize,fontWeight:'bold', marginBottom:10,color:theme.CARD_TEXT_COLOR, letterSpacing:1.5, textAlign:'justify'}}>
                  {data.title}
                </Text>
                <Text style={{fontSize:subContentFontsize,color:'#767676', textTransform:'capitalize'}}>
                  {data.writer}
                  {'\n'}
                  jacatra.net - {toDate(data.date)}
                </Text>
              </View>
              {
                data.title?
                media:null
              }
              <View style={{marginHorizontal:10, marginTop:10}}>
                {
                  content?
                  <HTML html={content}
                    {...DEFAULT_PROPS}
                    tagsStyles={{p:{padding:0,margin:2,marginBottom:10,color:'black',letterSpacing:1,textAlign:'justify', color: theme.CARD_TEXT_COLOR,
                        fontSize:contentFontSize
                      }}
                    }
                  />:null
                }
              </View>
            </ScrollView>
            {
              data.tags?<RenderKeywordBlog items={(data.tags).split(',')} />:null
            }
            {
              realted.length >0 ?<RenderRelatedBlog items={realted} goToPage={goToPage} />:null
            }
            
            
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
