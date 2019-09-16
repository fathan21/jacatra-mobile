import * as React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    RefreshControl,
    Text, Dimensions
} from 'react-native';
import { Button } from 'react-native-ui-kitten';

import {
  ArrowPointToTopWhite,
} from '@src/assets/icons/';

// import theme  from '../assets/style';

import {ArticleCard1, ArticleCard2, ArticleCard3 } from '../Component/';

const widthWindow = Dimensions.get('window').width;
const heightWindow = Dimensions.get('window').height;

export class BlogListContainer extends React.Component {
    scroll = null;
  	constructor(props) {
      super(props);
      this.state = {
        showBtnToTop: false,
        offset: 0
      }
  	}

    componentDidMount() {
    };
    componentWillMount() {
    };
    _goToTop = () => {
      this.scroll.scrollTo({x: 0, y: 0, animated: true});
    }
    _isCloseToBottom({
        layoutMeasurement,
        contentOffset,
        contentSize
    }) {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    };
    
    render() {
      const {
        hasMore,
        loadMore,
        isRefreshing,
        onRefresh,
        goToPage,
        blogLoading,
        blogError,
        blogs,
        blogMain,
        type_card,
        hideHeader,
        theme
      } = this.props;
      return (
        <View style={{backgroundColor:theme.CARD_TEXT_BG,minHeight:heightWindow}}>
          <ScrollView
            style={{backgroundColor:theme.CARD_TEXT_BG, marginBottom:100}}
            ref={(c) => {this.scroll = c}}
            onScroll ={
              ({nativeEvent}) => {
                
                
                  var currentOffset = nativeEvent.contentOffset.y;
                  var direction = currentOffset > this.state.offset && currentOffset > 100 ? true : false;
                  this.setState({
                    offset : currentOffset
                  });
                  // console.warn(direction);
                  // hideHeader(direction);
                if(nativeEvent.contentOffset.y > 200) {
                  if(!this.state.showBtnToTop) {
                    this.setState({showBtnToTop:true})
                  }
                } else {                
                  if(this.state.showBtnToTop) {
                    this.setState({showBtnToTop:false})
                  }
                }
                if (this._isCloseToBottom(nativeEvent) && hasMore) {
                    loadMore();
                }
              }
            }
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
            <View>
              {
                  (blogLoading || blogError.global) && !blogMain.title?
                  <ArticleCard1 goToPage={()=>{}} data={{}}  theme={theme}  /> :
                    blogMain.title?
                    <ArticleCard1 goToPage={()=>{goToPage(blogMain)}} data={blogMain}  theme={theme}  />
                    : 
                    blogs.length <= 0?<Text style={{fontSize:18, textAlign:'center', paddingTop:50}}>Data belum tersedia</Text>:null
              }
            </View>
            <View style={{paddingBottom:150}}>
              {
                  blogs.map((blog, i) => {
                  return (
                    type_card == '1'? 
                      <ArticleCard2 goToPage={goToPage} key={i}  data={blog} theme={theme}   />: 
                      type_card == '3'? 
                      <ArticleCard3 goToPage={goToPage} key={i}  data={blog} theme={theme}   /> :
                      <ArticleCard2 goToPage={goToPage} key={i}  data={blog} theme={theme}   /> 
                    
                  );
                })
              }
            </View>
          </ScrollView>
          {
            this.state.showBtnToTop?
            <Button
              style={{
                  position: 'absolute',right:20, bottom: 200, width:40,height:40, 
                  backgroundColor:theme.PRIMARY_COLOR, 
                  color:theme.PRIMARY_TEXT_COLOR,
                  display:'flex', alignItems:'center',justifyContent:'center', borderWidth:0
              }}
              size='small'
              icon={ArrowPointToTopWhite}
              onPress={this._goToTop}
            />:null
          }
        </View>
        );
    }
}
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#336699',
  },

  icon: {
    width: 20,
    height: 20,
  },

  label: {
    color: '#F8F8F8',
    textAlign: 'center',
  },
});
