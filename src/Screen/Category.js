import * as React from "react";

import { connect } from "react-redux";
import { View, ScrollView, ActivityIndicator, RefreshControl } from "react-native";

import { withTheme } from "../Redux/theme";
import { Layout, Button } from "react-native-ui-kitten";
import Toast from "react-native-easy-toast";
import { ArrowPointToTopWhite } from "@src/assets/icons/";

import { Header, RenderErrorBlog } from "../Component/";
import { BlogListContainer } from "../Container";

import { fetchBlogs, fetchBlogsCat } from "../Redux/Actions/Blog-actions";

export class CategoryScreen extends React.Component {
  state = {
    loading: false,
    isRefreshing: false,
    hasMore: true,
    showBtnToTop: false,
    filter: {
      cat: "",
      page: 1,
      limit: 20,
      q: ""
    },
    title: ""
  };
  toast = null;
  scroll = null;
  constructor(props) {
    super(props);

    this._goToPage = this._goToPage.bind(this);
  }

  componentDidMount() {}
  componentWillMount() {
    const { params } = this.props.navigation.state;
    const filter = this.state.filter;
    filter.cat = params.id;
    this.setState(
      {
        filter: filter
      },
      () => {
        if (this.props.blogs.length <= 0 || filter.cat == "bookmark") {
          this.props.fetchBlogsCat(filter);
        }
      }
    );
  }
  componentWillReceiveProps(nextProps) {
    const { params } = nextProps.navigation.state;
    const paramsOld = this.state.filter;
    if (params.id !== paramsOld.cat) {
      const filter = this.state.filter;
      filter.cat = params.id;
      filter.page = 1;
      this.setState(
        {
          hasMore: true
        },
        () => {
          if (this.props.blogs.length <= 0 || filter.cat == "bookmark") {
            this.setState(
              {
                filter: filter
              },
              this.props.fetchBlogsCat(filter)
            );
          }
        }
      );
    }
  }

  _onRefresh = () => {
    let filter = this.state.filter;
    filter.page = 1;
    this.setState(
      {
        filter: filter
      },
      () => {
        this.props.fetchBlogsCat(filter);
      }
    );
  };
  _toast = msg => {
    this.toast.show(msg, 3000, () => {
      // something you want to do at close
    });
  };
  _getDatas = () => {
    let filter = this.state.filter;
    this.setState({ isRefreshing: true });
    this.props.fetchBlogsCat(filter);
  };
  _loadMore = () => {
    // console.warn(this.props.blogCount);
    if (this.props.blogCount <= this.props.blogs.length) {
      this.setState({ hasMore: false });
      return;
    }

    let filter = this.state.filter;
    filter.page = filter.page + 1;
    this.setState(
      {
        filter: filter,
        loading: true
      },
      () => {
        this.props.fetchBlogsCat(filter);
      }
    );
  };
  _goToPage = item => {
    if (!item.id) {
      return;
    }
    if (item.link === undefined) {
      item.link = item.posts_id + "-" + item.title;
    }
    this.props.navigation.push("Page", { itemId: item.link });
  };
  _goToTop = () => {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
  };
  _isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50
    );
  }

  render() {
    const { params } = this.props.navigation.state;
    const { theme } = this.props;
    if (this.props.blogError.global) {
      return (
        <View>
          <Header
            navigation={this.props.navigation}
            title={params.title}
            theme={theme}
          />
          <RenderErrorBlog getDatas={this._getDatas} theme={theme} />
        </View>
      );
    }
    return (
      <Layout
        style={{
          flex: 1
        }}
      >
        <ScrollView stickyHeaderIndices={[0]} 
        
          showsVerticalScrollIndicator={false} 
          ref={c => {
            this.scroll = c;
          }}
          onScroll={({ nativeEvent }) => {
            if (nativeEvent.contentOffset.y > 200) {
              if (!this.state.showBtnToTop) {
                this.setState({ showBtnToTop: true });
              }
            } else {
              if (this.state.showBtnToTop) {
                this.setState({ showBtnToTop: false });
              }
            }
            if (this._isCloseToBottom(nativeEvent) && this.state.hasMore) {
              this._loadMore()
            }
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#000000"
              title="Loading..."
              titleColor="#000000"
              colors={["#000000", "#000000", "#000000"]}
              progressBackgroundColor="#ffffff"
              progressViewOffset={80}
            />
          }
        >
          <Header
            navigation={this.props.navigation}
            title={params.title}
            theme={theme}
          />
          <BlogListContainer
            hasMore={this.state.hasMore}
            isRefreshing={this.state.isRefreshing}
            loadMore={this._loadMore}
            onRefresh={this._onRefresh}
            goToPage={this._goToPage}
            blogLoading={this.props.blogLoading}
            hideHeader={d => {}}
            blogError={this.props.blogError}
            blogs={this.props.blogs}
            blogMain={this.props.blogMain}
            theme={this.props.theme}
          />
          
          {
            this.props.blogLoading ?          
            <View contentContainerStyle={{flex:"1"}}>
              <ActivityIndicator size="large" />
            </View>: null
          }
        </ScrollView>
        <Toast
          opacity={0.5}
          ref={ref => {
            this.toast = ref;
          }}
        />
        
        {this.state.showBtnToTop ? (
          <Button
            style={{
              position: "absolute",
              right: 20,
              bottom: 200,
              width: 40,
              height: 40,
              backgroundColor: theme.PRIMARY_HEADER_BG,
              color: theme.PRIMARY_TEXT_COLOR,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 0
            }}
            size="small"
            icon={ArrowPointToTopWhite}
            onPress={this._goToTop}
          />
        ) : null}
      </Layout>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    blogs:
      state.BlogStore.blogsByCat[props.navigation.state.params.id] === undefined
        ? []
        : state.BlogStore.blogsByCat[props.navigation.state.params.id],
    blogMain:
      state.BlogStore.blogMainByCat[props.navigation.state.params.id] ===
      undefined
        ? {}
        : state.BlogStore.blogMainByCat[props.navigation.state.params.id],
    blogCount:
      state.BlogStore.blogCountByCat[props.navigation.state.params.id] ===
      undefined
        ? 0
        : state.BlogStore.blogCountByCat[props.navigation.state.params.id],
    blogError: state.BlogStore.blogError,
    blogLoading: state.BlogStore.blogLoading
  };
}

const Homesc = withTheme(CategoryScreen);
export default connect(mapStateToProps, { fetchBlogs, fetchBlogsCat })(Homesc);
