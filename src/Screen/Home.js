import * as React from 'react';

import { connect } from 'react-redux';

import {
    ScrollView,
    View,
    RefreshControl,
} from 'react-native';
import {
    Layout,
} from 'react-native-ui-kitten';
import Toast from 'react-native-easy-toast';

import ArticleCard1 from '../Component/ArticleCard1';
import ArticleCard2 from '../Component/ArticleCard2';
import Header from '../Component/Header';

import {fetchBlogs} from '../Redux/Actions/Blog-actions';

export class HomeScreen extends React.Component {
    state = {
        loading: false,
        isRefreshing: true,
        hasMore: true,
        filter:{cat:'',page:1,limit:20,q:''}
    }
    toast = null;
  	constructor(props) {
  		super(props);

      this._goToPage = this._goToPage.bind(this);
  	}

    componentDidMount() {
    };
    componentWillMount() {
      this._getDatas();
    };

    __onRefresh = ()=> {
      this._getDatas();
    }
    _toast = (msg) => {
      this.toast.show(msg, 3000, () => {
         // something you want to do at close
     });
    }
    _getDatas = () => {
      this.setState({isRefreshing: true});
    	this.props.fetchBlogs(this.filter).catch(res=>{
        this._toast(' please cek your connection ');
        this.setState({isRefreshing: false});
    	}).then(res=>{
        this.setState({isRefreshing: false});
      });
    };
    _loadMore = () => {
      let filter = this.state.filter;
          filter.page = filter.page +1;
      this.setState({filter:filter, loading:true},()=>{
          this.props.fetchBlogs(filter).catch(res=>{
            this._toast(' please cek your connection ');
            this.setState({loading:false});
          }).then(res=>{
            this.setState({loading:false});
          });
      });
    };
    _goToPage = (item) => {
        // console.warn(item);
        if(!item.id){
          return;
        }
        this.props.navigation.push('Page', {
            itemId: item.link,
        })
    }

    _isCloseToBottom({
        layoutMeasurement,
        contentOffset,
        contentSize
    }) {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    };
    render() {
      // console.warn(this.props.blogMain)
      return (
      <Layout style={{paddingBottom:40}}>
          <Header navigation = {this.props.navigation} title={'Home'} />
          <ScrollView
            onScroll ={
              ({nativeEvent}) => {
                if (this._isCloseToBottom(nativeEvent) && this.state.hasMore) {
                    this._loadMore();
                }
              }
            }
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
            <View>
              <ArticleCard1 goToPage={this._goToPage} data={this.props.blogMain}  />
            </View>
            <View>
              {
                this.props.blogs.map((blog, i) => {
                  return (<ArticleCard2 goToPage={this._goToPage} key={i}  data={blog}   />);
                })
              }
            </View>
            <Toast
              opacity={0.5}
              ref={ref => { this.toast = ref; }} />
          </ScrollView>
      </Layout>);
    }
}

function mapStateToProps(state, props) {
  return {
      blogs:state.BlogStore.blogs,
      blogMain: state.BlogStore.blogMain,
      blogLoading: state.BlogStore.blogLoading
  }
}
export default connect(mapStateToProps, {fetchBlogs})(HomeScreen);
