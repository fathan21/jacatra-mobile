import * as React from 'react';

import { connect } from 'react-redux';

import {
    ScrollView,
    View,
    RefreshControl,
    Text,
} from 'react-native';
import {
    Layout,
} from 'react-native-ui-kitten';
import Toast from 'react-native-easy-toast';

import ArticleCard1 from '../Component/ArticleCard1';
import ArticleCard2 from '../Component/ArticleCard2';
import Header from '../Component/Header';

import {fetchBlogs, fetchBlogsCat} from '../Redux/Actions/Blog-actions';


export class CategoryScreen extends React.Component {
    state = {
        loading: false,
        isRefreshing: false,
        hasMore: true,
        filter:{cat:'',page:1,limit:20,q:''},
        title:'',

    }
    toast = null;
  	constructor(props) {
  		super(props);

      this._goToPage = this._goToPage.bind(this);
  	}

    componentDidMount() {
    };
    componentWillMount() {
      const { params } = this.props.navigation.state;
      const filter = this.state.filter;
            filter.cat = params.id;
      this.setState({filter:filter},this.props.fetchBlogsCat(filter));
    };
    componentWillReceiveProps(nextProps) {
      const { params } = nextProps.navigation.state;
      const  paramsOld = this.state.filter;
      if(params.id !== paramsOld.cat) {
        const filter = this.state.filter;
              filter.cat = params.id;
              filter.page = 1;
        this.setState({hasMore:true},()=>{
            if (this.props.blogs.length <=0) {        
              this.setState({filter:filter},this.props.fetchBlogsCat(filter));
            }
        });

      }
    }

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
    	this.props.fetchBlogsCat(filter);
    };
    _loadMore = () => {

      if(this.props.blogCount <= this.props.blogs.length) {
        this.setState({hasMore:false});
        return;
      }

      let filter = this.state.filter;
          filter.page = filter.page +1;
      this.setState({filter:filter, loading:true},()=>{
        this.props.fetchBlogsCat(filter);
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
      const { params } = this.props.navigation.state;
      return (
      <Layout style={{paddingBottom:40}}>
          <Header navigation = {this.props.navigation} title={params.title} />
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
              {
                this.props.blogLoading || this.props.errorsBlog.global?
                <ArticleCard1 goToPage={()=>{}} data={{}}  /> :
                  this.props.blogMain.title?
                  <ArticleCard1 goToPage={()=>{this._goToPage(this.props.blogMain)}} data={this.props.blogMain}  />
                  :<Text>Data belum tersedia</Text>
                
              }

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
      blogs:state.BlogStore.blogsByCat[props.navigation.state.params.id]===undefined?[]:state.BlogStore.blogsByCat[props.navigation.state.params.id],
      blogMain:state.BlogStore.blogMainByCat[props.navigation.state.params.id]===undefined?{}:state.BlogStore.blogMainByCat[props.navigation.state.params.id],
      blogCount:state.BlogStore.blogCountByCat[props.navigation.state.params.id]===undefined?0:state.BlogStore.blogCountByCat[props.navigation.state.params.id],
      errorsBlog: state.BlogStore.errorsBlog,
      blogLoading: state.BlogStore.blogLoading,
  }
}
export default connect(mapStateToProps, {fetchBlogs, fetchBlogsCat})(CategoryScreen);
