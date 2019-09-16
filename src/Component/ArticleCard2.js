import * as React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';

import ProgressiveImage from './ProgressiveImage';
import {toDateIndo} from '../Redux/helper';

const widthWindow = Dimensions.get('window').width;
export const ArticleCard2 =({data, goToPage, theme}) => {
  const styles = StyleSheet.create({
    card2: {
      borderRadius: 0,
      overflow: 'hidden',
      paddingBottom:10,
      marginTop:10,
      paddingTop:16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 16,
      flexDirection:'row',
      display:'flex',
      justifyContent:'flex-start',
      alignItems:'flex-start',
      borderBottomWidth: 1,
      borderColor: '#cccccc',
      backgroundColor: theme.CARD_TEXT_BG
    },
    card2Description: {
        width:widthWindow - 130,
        height:100,
        borderRadius: 0,
        overflow: 'hidden',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'flex-start',
        paddingLeft:16,
        paddingRight:16,
        paddingBottom:0,
        backgroundColor: theme.CARD_TEXT_BG
    },
    card2Title: {
      color:theme.CARD_TEXT_COLOR,
      fontSize:16,
      fontWeight:'bold',
      marginTop:0,
      marginBottom:0,
    },
    card2Content: {
      fontSize:16,
      color:'#808080',
      marginBottom:0,
    },
    card2Media: {
        height: 100,
        width: 100,
        borderRadius: 0,
        overflow: 'hidden',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#cccccc'
    },
    text: {
      marginVertical: 16,
      color:'#FFFFFF'
    },
  });
    return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={()=>goToPage(data)}
          >
          <Layout style={styles.card2}>
            <Layout style={{width:100}}>
              <ProgressiveImage
                source={{ uri: data.img }}
                style={styles.card2Media}
                resizeMode="cover"
              />
            </Layout>
            <Layout style={styles.card2Description}>
              <Text style={styles.card2Title} numberOfLines={2}>
                {data.title}
              </Text>
              <Text style={styles.card2Content}>
                {toDateIndo(data.date)}
              </Text>
            </Layout>
          </Layout>
        </TouchableOpacity>
    );
}
