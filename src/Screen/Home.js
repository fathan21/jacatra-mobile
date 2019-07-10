import * as React from 'react';
import { StyleSheet, View, TouchableOpacity,ImageBackground, ScrollView } from 'react-native';
import { Button, Layout, Text } from 'react-native-ui-kitten';

import ArticleCard1 from '../Component/ArticleCard1';
import ArticleCard2 from '../Component/ArticleCard2';
import ArticleCard3 from '../Component/ArticleCard3';

export default class HomeScreen extends React.Component {
  state = {
      loading: false,
      data: [],
      current_page: 1,
      error: null,
      hasMore: true
  }
  componentWillMount() {
    this.getData();
  };

  onItemPress = (article) => {

  };
  getData = () => {
    let nextData=[];
    for (var i = 0; i < 5; i++) {
      nextData.push({id:'5'});
    }
    this.setState({
        hasMore: true,
        data: [...this.state.data, ...nextData],
        loading: false,
        current_page: this.state.current_page + 1
    })
  };
  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
  };
  render() {
    return (
      <Layout style={styles.container}>
        <ScrollView onScroll={({ nativeEvent }) => {
          if (this.isCloseToBottom(nativeEvent) && this.state.hasMore) {
             this.getData();
           }}}
        >
          <ArticleCard1 ></ArticleCard1>
          <ArticleCard3 ></ArticleCard3>
          {this.state.data.map(function(object, i){
              return <ArticleCard2 key={i}></ArticleCard2>;
          })}
        </ScrollView>
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      backgroundColor:'#ffffff',
  }
});
