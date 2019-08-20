import * as React from 'react';

import ArticleCard4 from './ArticleCard4';
import {
    View, FlatList,
} from 'react-native';

export default class HorizontalScroll extends React.Component {

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
              paddingBottom:0
            }}>
                <FlatList
                contentContainerStyle={{
                    alignSelf: 'flex-start'
                }}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}

                data={['1','2','3','4']}

                renderItem={({ item, i  }) => (
                  <ArticleCard4 />
                )}
                keyExtractor={(item, i) => item}
                />
            </View>
        );
    }
}
