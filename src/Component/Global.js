import * as React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';

import {Text, Button} from 'react-native-ui-kitten';
import {ArticleCard2} from './ArticleCard2';
import {globalStyle} from '../assets/style';

export const RenderErrorBlog = ({getDatas, theme}) => {
  return (<View style={{
      backgroundColor: theme.CARD_TEXT_BG
    }}>
    <View style={{
        textAlign: 'center',
        marginVertical: 50,
        marginHorizontal: 16,
        height:'100%'
      }}>
      <Text style={{
          textAlign: 'center',
          fontSize: 15,
          color:theme.CARD_TEXT_COLOR
        }}>
        Koneksi gagal, silahkan coba lagi
      </Text>
      <Button onPress={() => getDatas()} style={theme.btnPrimary}>
        Coba Lagi
      </Button>
    </View>
  </View>)
}
export const RenderLoadingBlogDetail = ({theme}) => {
  return (<View style={{
      backgroundColor: theme.CARD_TEXT_BG
    }}>
    <View style={{
        marginVertical: 10,
        marginHorizontal: 5,
        width: '90%',
        height: 35,
        backgroundColor: '#e1e4e8'
      }}></View>
    <View style={{
        marginVertical: 1,
        marginHorizontal: 5,
        width: '20%',
        height: 20,
        backgroundColor: '#e1e4e8'
      }}></View>
    <View style={{
        marginVertical: 1,
        marginHorizontal: 5,
        width: '30%',
        height: 20,
        backgroundColor: '#e1e4e8'
      }}></View>
    <View style={{
        marginVertical: 10,
        width: '100%',
        height: 250,
        backgroundColor: '#e1e4e8'
      }}></View>

    <View style={{
        marginVertical: 5,
        marginHorizontal: 5,
        width: '98%',
        height: 20,
        backgroundColor: '#e1e4e8'
      }}></View>
    <View style={{
        marginVertical: 5,
        marginHorizontal: 5,
        width: '98%',
        height: 20,
        backgroundColor: '#e1e4e8'
      }}></View>
    <View style={{
        marginVertical: 5,
        marginHorizontal: 5,
        width: '98%',
        height: 20,
        backgroundColor: '#e1e4e8'
      }}></View>
  </View>)
}
export const RenderKeywordBlog = ({items, navigation, theme}) => {
  return (<View style={{
      paddingVertical: 5,
      marginHorizontal: 10,
      marginVertical: 20,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start'
    }}>
    {
      items.map((keyword, i) => {
        return (<TouchableOpacity key={i} onPress={(e) => {
            navigation.push('Search', {
              val: keyword,
              type: 'tag'
            })
          }}>
          <View size={'small'} style={{
              borderColor: '#ebebeb',
              backgroundColor: '#ebebeb',
              marginRight: 5,
              paddingVertical: 3,
              paddingHorizontal: 5,
              textTransform: 'lowercase',
              color: '#CCC',
              borderWidth: 2,
              marginBottom: 5
            }}>
            <Text style={{
                color: '#747474'
              }}>{keyword}</Text>
          </View>
        </TouchableOpacity>);
      })
    }
  </View>)
}

export const RenderRelatedBlog = ({items, goToPage, theme}) => {
  return (<ScrollView style={{
      paddingVertical: 5,
      marginHorizontal: 10
    }}>
    <Text style={{
        color: theme.CARD_TEXT_COLOR,
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',
        borderBottomColor: theme.PRIMARY_HEADER_BG,
        borderBottomWidth: 3,
        width: 100
      }}>
      Terkait
    </Text>
    {
      items.map((blog, i) => {
        return (<ArticleCard2 goToPage={goToPage} key={i} data={blog} theme={theme}/>);
      })
    }
  </ScrollView>)
}
