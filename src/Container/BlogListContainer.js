import * as React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    RefreshControl,
    Text,
} from 'react-native';
import { Button } from 'react-native-ui-kitten';

import {
  ArrowPointToTopWhite,
} from '@src/assets/icons/';

import theme  from '../assets/style';

import {ArticleCard1, ArticleCard2, } from '../Component/';

export class BlogListContainer extends React.Component {
    scroll = null;
  	constructor(props) {
      super(props);
      this.state = {
        showBtnToTop: false,
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
      } = this.props;
      return (
        <View>
          <ScrollView
            ref={(c) => {this.scroll = c}}
            onScroll ={
              ({nativeEvent}) => {
                if(nativeEvent.contentOffset.y > 270) {
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
                  blogLoading || blogError.global?
                  <ArticleCard1 goToPage={()=>{}} data={{}}  /> :
                    blogMain.title?
                    <ArticleCard1 goToPage={()=>{goToPage(blogMain)}} data={blogMain}  />
                    :<Text style={{fontSize:18, textAlign:'center', paddingTop:50}}>Data belum tersedia</Text>
              }
            </View>
            <View>
              {
                  blogs.map((blog, i) => {
                  return (<ArticleCard2 goToPage={goToPage} key={i}  data={blog}   />);
                })
              }
            </View>
          </ScrollView>
          {
            this.state.showBtnToTop?
            <Button
              style={{
                  position: 'absolute',right:20, bottom: 100, width:40,height:40, 
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
