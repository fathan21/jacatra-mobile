import React from "react";
import {
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Layout, TopNavigation, Input, Text } from "react-native-ui-kitten";

import { SafeAreaView as SafeAreaViewReactNavigation } from "react-navigation";
import { RenderErrorBlog, GeneralStatusBarColor } from "../Component";

import { api } from "../Redux/Actions";
import { globalStyle } from "../assets/style";

import { BackImg } from "../assets/images";

import { ArticleCard2 } from "../Component/";
import { withTheme } from "../Redux/theme";

const widthWindow = Dimensions.get("window").width;
const heightWindow = Dimensions.get("window").height;
export class SarchScreen extends React.Component {
  state = {
    isRefreshing: false,
    loading: false,
    error: false,
    submit: false,
    q: "",
    type: "q",
    data: [],
    realted: []
  };
  _isMounted = false;
  constructor(props) {
    super(props);

    this.inputS = React.createRef();
    this._goToPage = this._goToPage.bind(this);
  }

  componentDidMount() {
    //console.warn(this.inputS);
  }

  componentWillMount() {
    this._isMounted = true;
    const { navigation } = this.props;
    const type = navigation.getParam("type");
    const val = navigation.getParam("val");
    if (type !== undefined) {
      this.setState(
        {
          type: type,
          q: val
        },
        () => {
          this._getData();
        }
      );
    } else {
      let app = this;
      setTimeout(function() {
        app.inputS.current.focus();
      }, 1000);
    }
  }
  onInputValueChange = q => {
    this.setState({ q });
  };
  onSubmitEditing = e => {
    if (this.state.q == "" || this.state.q == null) {
      return;
    }
    this.setState({ submit: true });
    this._getData();
  };

  renderLeftControl = () => {
    const { theme } = this.props;
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image
            style={globalStyle.btnImgHeader}
            source={BackImg.imageSource}
          />
        </TouchableOpacity>
        {this.state.type == "q" ? (
          <Input
            ref={this.inputS}
            value={this.state.q}
            onChangeText={this.onInputValueChange}
            size={"small"}
            placeholder="cari.."
            onSubmitEditing={this.onSubmitEditing}
            style={{
              width: widthWindow - 80,
              padding: 0,
              fontSize: 13
            }}
            textStyle={{
              padding: 0,
              margin: 0
            }}
          />
        ) : (
          <Text
            style={{
              color: theme.PRIMARY_TEXT_COLOR,
              fontSize: 20,
              textTransform: "capitalize"
            }}
          >
            {this.state.q}
          </Text>
        )}
      </View>
    );
  };
  renderRightControls = () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      ></View>
    );
  };

  _goToPage = item => {
    if (!item.id) {
      return;
    }
    this.props.navigation.push("Page", { itemId: item.link });
  };
  componentWillUnmount() {
    this._isMounted = false;
    this.setState({
      isRefreshing: false,
      loading: false,
      error: false,
      data: {},
      realted: []
    });
  }
  _onRefresh = () => {};
  _getData = () => {
    let params = {
      page: 1,
      limit: 50,
      q: ""
    };
    if (this.state.type == "tag") {
      params.tag = this.state.q;
    } else if (this.state.type == "writer") {
      params.writer = this.state.q;
    } else {
      params.q = this.state.q;
    }
    this.setState(
      {
        loading: true
      },
      () => {
        api
          .post("news", { filter: params })
          .then(res => {
            if (!this._isMounted) {
              return;
            }
            this.setState({
              loading: false,
              isRefreshing: false,
              data: res.data.data
            });
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

  render() {
    const { navigation, theme } = this.props;

    return (
      <Layout
        style={{
          backgroundColor: theme.CARD_TEXT_BG,
          minHeight: heightWindow
        }}
      >
        <ScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#000000"
              title="Loading..."
              titleColor="#000000"
              colors={["#000000", "#000000", "#000000"]}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          <View>
            
            <GeneralStatusBarColor backgroundColor={theme.PRIMARY_HEADER_BG} barStyle="light-content"/>
            <SafeAreaViewReactNavigation >
              <TopNavigation alignment='start' style={{
                  backgroundColor: theme.PRIMARY_HEADER_BG,
                  marginBottom: 10,
                  color: theme.PRIMARY_TEXT_COLOR
                }} leftControl={this.renderLeftControl()} rightControls={this.renderRightControls()}/>
            </SafeAreaViewReactNavigation>
          </View>
          <View
            style={{
              backgroundColor: theme.CARD_TEXT_BG
            }}
          >
            {this.state.loading ? (
              <ActivityIndicator size="large" color={theme.PRIMARY_COLOR} />
            ) : null}
            {this.state.error ? (
              <RenderErrorBlog getDatas={this._getData} theme={theme} />
            ) : null}
            <View>
              {!this.state.loading && !this.state.error ? (
                this.state.data.length == 0 && this.state.submit ? (
                  <Text
                    style={{
                      marginVertical: 50,
                      textAlign: "center",
                      color: theme.CARD_TEXT_COLOR
                    }}
                  >
                    Data tidak ditemukan
                  </Text>
                ) : (
                  this.state.data.map((blog, i) => {
                    return (
                      <ArticleCard2
                        goToPage={this._goToPage}
                        key={i}
                        data={blog}
                        theme={theme}
                      />
                    );
                  })
                )
              ) : null}
            </View>
          </View>
        </ScrollView>
      </Layout>
    );
  }
}

export default PageSc = withTheme(SarchScreen);
