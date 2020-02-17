import React from "react";
import { View, Share, Dimensions, ScrollView } from "react-native";
import { Layout } from "react-native-ui-kitten";
import { api } from "../Redux/Actions";
import Toast from "react-native-easy-toast";

import { App } from "../Redux/const";
import { _isBookmark, _saveBookmark } from "../Redux/helper";
import {
  RenderLoadingBlogDetail,
  RenderErrorBlog,
  HeaderBack
} from "../Component/";
import { BlogDetailContainer } from "../Container";
const widthWindow = Dimensions.get("window").width;
const heightWindow = Dimensions.get("window").height;
import { withTheme } from "../Redux/theme";
export class PageScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    isRefreshing: false,
    loading: false,
    error: false,
    isBookmark: false,
    data: {},
    realted: []
  };
  _isMounted = false;
  toast = null;
  constructor(props) {
    super(props);
    this._goToPage = this._goToPage.bind(this);
    this._shareText = this._shareText.bind(this);
    this._showResultShare = this._showResultShare.bind(this);
  }

  ComponentDidMount() {}

  componentWillMount() {
    this._isMounted = true;
    const { navigation } = this.props;
    const itemId = navigation.getParam("itemId", "NO-ID");

    this._getData(itemId);
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.setState({
      isRefreshing: false,
      loading: false,
      error: false,
      data: {},
      realted: [],
      fontSizeType: 1
    });
  }

  _toast = msg => {
    this.toast.show(msg, 3000, () => {
      // something you want to do at close
    });
  };
  __onRefresh = itemId => {
    this.setState(
      {
        isRefreshing: true
      },
      () => {
        this._getData(itemId);
      }
    );
  };

  _getData = itemId => {
    itemId = itemId.replace("/p/", "");

    this.setState(
      {
        loading: true
      },
      () => {
        api
          .get("news_detail/" + itemId, {})
          .then(res => {
            if (!this._isMounted) {
              return;
            }
            _isBookmark(res.data.data.id).then(e => {
              if (e) {
                this.setState({ isBookmark: true });
              }
            });
            this.setState(
              {
                loading: false,
                isRefreshing: false,
                data: res.data.data
              },
              () => {
                if (itemId == "hubungi-kami" || itemId == "tentang-kami") {
                } else {
                  this._getRelated(itemId);
                }
              }
            );
          })
          .catch(e => {
            if (!this._isMounted) {
              return;
            }
            this.setState({ loading: false, isRefreshing: false, error: true });
          });
      }
    );
  };
  _getRelated = itemId => {
    itemId = itemId
      .replace("/p/", "")
      .split(" ")
      .join("-");
    console.log(itemId);
    api
      .get("news_detail_related/" + itemId, {})
      .then(res => {
        console.log(res);
        this.setState({ loading: false, realted: res.data.data });
      })
      .catch(e => {
        if (!this._isMounted) {
          return;
        }
        this.setState({ loading: false, isRefreshing: false, error: true });
      });
  };

  _shareText() {
    const { data } = this.state;
    // console.warn(data);
    if (!data.title) {
      return;
    }

    const { navigation } = this.props;
    const itemId = navigation.getParam("itemId", "NO-ID");
    const link = decodeURI(App.base_url + itemId);
    Share.share(
      {
        message: link + "\n" + data.title,
        //url: 'https://www.npmjs.com/package/react-native-video',
        title: data.title
      },
      {
        subject: data.title,
        dialogTitle: data.title,
        excludedActivityTypes: [],
        tintColor: "green"
      }
    )
      .then(this._showResultShare)
      .catch(error =>
        this.setState({
          result: "error: " + error.message
        })
      );
  }
  _showResultShare(result) {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        this.setState({
          result: "shared with an activityType: " + result.activityType
        });
        this._toast("shared with an activityType: " + result.activityType);
      } else {
        this.setState({ result: "shared" });
        //this._toast('shared');
      }
    } else if (result.action === Share.dismissedAction) {
      this.setState({ result: "dismissed" });
      this._toast("dismissed");
    }
  }

  _goToPage = item => {
    // console.warn(item);
    if (!item.id) {
      return;
    }
    this.props.navigation.push("Page", { itemId: item.link });
  };
  _saveBookmark = item => {
    if (!item.id) {
      return;
    }
    _saveBookmark(item).then(e => {
      if (e === "save") {
        this.setState({ isBookmark: true });
        this._toast(" berhasil di simpan jadi bookmark ");
      } else {
        this.setState({ isBookmark: false });
        this._toast(" berhasil di hapus jadi bookmark ");
      }
    });
  };
  _fontSizeChange = e => {
    this.setState({ fontSizeType: e });
  };
  render() {
    const { navigation, theme } = this.props;
    const itemId = navigation.getParam("itemId", "NO-ID");

    if (this.state.loading) {
      return (
        <View
          style={{
            backgroundColor: theme.CARD_TEXT_BG,
            minHeight: heightWindow
          }}
        >
          <HeaderBack
            navigation={this.props.navigation}
            title={"title"}
            share={this._shareText}
            data={this.state.data}
            isBookmark={this.state.isBookmark}
            saveBookmark={this._saveBookmark}
            theme={theme}
          />
          <RenderLoadingBlogDetail theme={theme} />
        </View>
      );
    }
    if (this.state.error) {
      return (
        <View
          style={{
            backgroundColor: theme.CARD_TEXT_BG,
            minHeight: heightWindow
          }}
        >
          <HeaderBack
            navigation={this.props.navigation}
            title={"title"}
            share={this._shareText}
            data={this.state.data}
            isBookmark={this.state.isBookmark}
            saveBookmark={this._saveBookmark}
            theme={theme}
          />
          <RenderErrorBlog
            getDatas={() => this._getData(itemId)}
            theme={theme}
          />
        </View>
      );
    }

    return (
      <Layout
        style={{
          paddingBottom: 0
        }}
      >
        <ScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
        >
          <HeaderBack
            navigation={this.props.navigation}
            title={"title"}
            share={this._shareText}
            data={this.state.data}
            isBookmark={this.state.isBookmark}
            saveBookmark={this._saveBookmark}
            fontSizeChange={this._fontSizeChange}
            theme={theme}
          />
          <BlogDetailContainer
            data={this.state.data}
            isRefreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            navigation={this.props.navigation}
            realted={this.state.realted}
            goToPage={this._goToPage}
            fontSizeType={this.state.fontSizeType}
            theme={theme}
          />
        </ScrollView>
        <Toast
          opacity={1}
          ref={ref => {
            this.toast = ref;
          }}
        />
      </Layout>
    );
  }
}

export default PageSc = withTheme(PageScreen);
