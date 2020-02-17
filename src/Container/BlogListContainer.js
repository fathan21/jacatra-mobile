import * as React from "react";
import {
  View,
  Text,
} from "react-native";
import { Button } from "react-native-ui-kitten";

// import theme  from '../assets/style';

import { ArticleCard1, ArticleCard2, ArticleCard3 } from "../Component/";

export class BlogListContainer extends React.Component {
  scroll = null;
  constructor(props) {
    super(props);
    this.state = {
      showBtnToTop: false,
      offset: 0
    };
  }

  componentDidMount() {}
  componentWillMount() {}

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
      <View
        style={{
          backgroundColor: theme.CARD_TEXT_BG
        }}
        contentContainerStyle={{flexGrow: 1}}
      >
          <View contentContainerStyle={{flex:1}} >
            {(blogLoading || blogError.global) && !blogMain.title ? (
              <ArticleCard1 goToPage={() => {}} data={{}} theme={theme} />
            ) : blogMain.title ? (
              <ArticleCard1
                goToPage={() => {
                  goToPage(blogMain);
                }}
                data={blogMain}
                theme={theme}
              />
            ) : blogs.length <= 0 ? (
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  paddingTop: 50
                }}
              >
                Data belum tersedia
              </Text>
            ) : null}
          </View>
          <View contentContainerStyle={{flex:1}} >
            {blogs.map((blog, i) => {
              return type_card == "1" ? (
                  <ArticleCard2
                    goToPage={goToPage}
                    key={i}
                    data={blog}
                    theme={theme}
                  />
              ) : type_card == "3" ? (
                <ArticleCard3
                  goToPage={goToPage}
                  key={i}
                  data={blog}
                  theme={theme}
                />
              ) : (
                <ArticleCard2
                  goToPage={goToPage}
                  key={i}
                  data={blog}
                  theme={theme}
                />
              );
            })}
          </View>
          
      </View>
    );
  }
}
