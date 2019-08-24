import * as React from 'react';

import { connect } from 'react-redux';
import {
    View,
} from 'react-native';
import {
    Layout
} from 'react-native-ui-kitten';
import Toast from 'react-native-easy-toast';

import {Header, RenderErrorBlog } from '../Component/';
import {BlogListContainer } from '../Container';

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
      this._getDatas = this._getDatas.bind(this);
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
        this._toast(res.message);
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
            this._toast(res.message);
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
    
    render() {
      if (this.props.blogError.global){
        return(
          <View>
            <Header navigation = {this.props.navigation} title={'Home'} />
            <RenderErrorBlog getDatas={this._getDatas} />
            <Toast
              opacity={0.5}
              ref={ref => { this.toast = ref; }} />
          </View>
        );
      }
      return (
        <Layout style={{paddingBottom:40}}>
            <Header navigation = {this.props.navigation} title={'Home'} />
            <BlogListContainer 
              hasMore={this.state.hasMore}
              isRefreshing={this.state.isRefreshing}

              loadMore={this._loadMore}
              onRefresh={this._onRefresh}
              goToPage={this._goToPage}
              
              blogLoading={this.props.blogLoading}
              blogError={this.props.blogError}
              blogs={this.props.blogs}
              blogMain={this.props.blogMain}
            />
            <Toast
                opacity={0.5}
                ref={ref => { this.toast = ref; }} />
        </Layout>
      );
    }
}

function mapStateToProps(state) {
  return {
      blogs:state.BlogStore.blogs,
      blogMain: state.BlogStore.blogMain,
      blogLoading: state.BlogStore.blogLoading,
      blogError: state.BlogStore.blogError
  }
}
export default connect(mapStateToProps, {fetchBlogs})(HomeScreen);
