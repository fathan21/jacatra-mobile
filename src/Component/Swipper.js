import * as React from 'react';
import {
    View
} from 'react-native';

import SwiperFlatList from 'react-native-swiper-flatlist';
import ArticleCard3 from './ArticleCard3';

export default class Swipper extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {};
    componentWillMount() {

    }
    render() {
        return (
          <View style={{
            borderBottomWidth: 1,
            borderColor: '#cccccc',
            paddingBottom:20
          }}>
            <SwiperFlatList
              autoplay
              autoplayDelay={2}
              autoplayLoop
              index={1}
              showPagination
              paginationDefaultColor={"#D6D6D6"}
              paginationActiveColor={"#5c171a"}
              paginationStyle={{height:15}}
              paginationStyleItem={{width:10, height:10}}
            >
              <ArticleCard3 />
              <ArticleCard3 />
            </SwiperFlatList>
          </View>
        );
    }
}
