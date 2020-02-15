import * as React from "react";

import { connect } from "react-redux";
import { View, Dimensions, Animated } from "react-native";
import { TabView, Tab, Layout } from "react-native-ui-kitten";
import Toast from "react-native-easy-toast";

import { Header, RenderErrorBlog } from "../Component/";
import { BlogListContainer } from "../Container";

import {
  fetchBlogs,
  fetchHeadline,
  fetchPopuler
} from "../Redux/Actions/Blog-actions";
import { withTheme } from "../Redux/theme";

export class HomeScreen extends React.Component {
  headerHeight = 75;
  state = {
    t: 0,
    loading: false,
    isRefreshing: true,
    hasMore: true,
    filter: {
      cat: "",
      page: 1,
      limit: 20,
      q: ""
    },
    selectedIndexTab: 0,
    hideHeader: false,
    scrollY: new Animated.Value(0)
  };
  toast = null;
  constructor(props) {
    super(props);

    this._goToPage = this._goToPage.bind(this);
    this._getDatas = this._getDatas.bind(this);
    this.renderListHeader = this.renderListHeader.bind(this);
  }

  componentDidMount() {}
  componentWillMount() {
    if (this.props.blogs.length <= 0) {
      this._getDatas();
    }
  }
  _hideHeaderAct = hd => {
    // this.setState({hideHeader: hd});
  };

  _onRefresh = () => {
    let filter = this.state.filter;
    filter.page = 1;
    this.setState(
      {
        filter: filter
      },
      () => {
        this.props.fetchBlogs(filter);
      }
    );
  };

  _onRefresh2 = () => {
    this.props.fetchHeadline();
  };

  _onRefresh3 = () => {
    this.props.fetchPopuler();
  };
  _toast = msg => {
    this.toast.show(msg, 3000, () => {
      // something you want to do at close
    });
  };
  _getDatas = () => {
    this.setState({ isRefreshing: true });
    this.props
      .fetchBlogs(this.filter)
      .catch(res => {
        this._toast(res.message);
        this.setState({ isRefreshing: false });
      })
      .then(res => {
        this.setState({ isRefreshing: false });
      });
  };
  _loadMore = () => {
    let filter = this.state.filter;
    filter.page = filter.page + 1;
    this.setState(
      {
        filter: filter,
        loading: true
      },
      () => {
        this.props
          .fetchBlogs(filter)
          .catch(res => {
            this._toast(res.message);
            this.setState({ loading: false });
          })
          .then(res => {
            this.setState({ loading: false });
          });
      }
    );
  };
  _goToPage = item => {
    // console.warn(item);
    if (!item.id) {
      return;
    }
    this.props.navigation.push("Page", { itemId: item.link });
  };
  _onSelect = selectedIndexTab => {
    // console.warn(selectedIndexTab);
    if (selectedIndexTab == 1) {
      if (this.props.headline.length <= 0) {
        this.props.fetchHeadline();
      }
    }
    if (selectedIndexTab == 2) {
      if (this.props.populer.length <= 0) {
        this.props.fetchPopuler();
      }
    }
    this.setState({ selectedIndexTab: selectedIndexTab });
  };

  _shouldLoadTabContent = index => {
    // console.warn(index, this.state.selectedIndexTab);
    return index === this.state.selectedIndexTab;
  };
  renderListHeader() {
    const { theme } = this.props;
    return (
      <Header navigation={this.props.navigation} title={"Home"} theme={theme} />
    );
  }
  render() {
    const { theme } = this.props;
    if (this.props.blogError.global) {
      return (
        <View>
          <Header
            navigation={this.props.navigation}
            title={"Home"}
            theme={theme}
          />
          <RenderErrorBlog getDatas={this._getDatas} theme={theme} />
          <Toast
            opacity={0.5}
            ref={ref => {
              this.toast = ref;
            }}
          />
        </View>
      );
    }
    //console.warn(this.props.blogs);
    return (
      <Layout
        style={{
          paddingBottom: 40,
          position: "relative",
          backgroundColor: theme.CARD_TEXT_BG
        }}
      >
        {this.renderListHeader()}
        <TabView
          style={{
            margin: 0,
            padding: 0
          }}
          tabBarStyle={{
            backgroundColor: theme.PRIMARY_HEADER_BG,
            color: theme.PRIMARY_TEXT_COLOR,
            paddingBottom: 5
          }}
          indicatorStyle={{
            backgroundColor: theme.PRIMARY_TEXT_COLOR,
            marginTop: -5
          }}
          selectedIndex={this.state.selectedIndexTab}
          shouldLoadComponent={this._shouldLoadTabContent}
          onSelect={this._onSelect}
        >
          <Tab
            title="Terbaru"
            titleStyle={{
              color: "#cccccc"
            }}
          >
            <BlogListContainer
              hasMore={this.state.hasMore}
              isRefreshing={this.state.isRefreshing}
              hideHeader={this._hideHeaderAct}
              loadMore={this._loadMore}
              onRefresh={this._onRefresh}
              goToPage={this._goToPage}
              blogLoading={this.props.blogLoading}
              blogError={this.props.blogError}
              blogs={this.props.blogs}
              blogMain={this.props.blogMain}
              theme={this.props.theme}
            />
          </Tab>

          <Tab
            title="Headline"
            titleStyle={{
              color: "#CCCCCC"
            }}
          >
            <BlogListContainer
              hasMore={false}
              isRefreshing={false}
              loadMore={() => {}}
              onRefresh={this._onRefresh2}
              goToPage={this._goToPage}
              hideHeader={this._hideHeaderAct}
              type_card={"3"}
              blogLoading={this.props.headlineLoading}
              blogError={this.props.headlineError}
              blogs={this.props.headline}
              blogMain={{}}
              theme={this.props.theme}
            />
          </Tab>
          <Tab
            title="Terpopuler"
            titleStyle={{
              color: "#CCCCCC"
            }}
          >
            <BlogListContainer
              hasMore={false}
              isRefreshing={false}
              loadMore={() => {}}
              onRefresh={this._onRefresh3}
              goToPage={this._goToPage}
              hideHeader={this._hideHeaderAct}
              type_card={"1"}
              blogLoading={this.props.populerLoading}
              blogError={this.props.populerError}
              blogs={this.props.populer}
              blogMain={{}}
              theme={this.props.theme}
            />
          </Tab>
        </TabView>

        <Toast
          opacity={0.5}
          ref={ref => {
            this.toast = ref;
          }}
        />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    blogs: state.BlogStore.blogs,
    blogMain: state.BlogStore.blogMain,
    blogLoading: state.BlogStore.blogLoading,
    blogError: state.BlogStore.blogError,

    headline: state.BlogStore.headline,
    headlineError: state.BlogStore.headlineError,
    headlineLoading: state.BlogStore.headlineLoading,

    populer: state.BlogStore.populer,
    populerError: state.BlogStore.populerError,
    populerLoading: state.BlogStore.populerLoading
  };
}
const Homesc = withTheme(HomeScreen);
export default connect(mapStateToProps, {
  fetchBlogs,
  fetchHeadline,
  fetchPopuler
})(Homesc);
