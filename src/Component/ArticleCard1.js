import * as React from 'react';
import { StyleSheet,  TouchableOpacity, Dimensions } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';

import {toDateIndo} from '../Redux/helper';
const widthWindow = Dimensions.get('window').width;
import ProgressiveImage from './ProgressiveImage';
export const ArticleCard1 = ({data, goToPage}) => {
    return (
      <Layout style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={()=>goToPage(data)}
          style={styles.card1}
          >
          <ProgressiveImage source={{uri:data.img}}
              style={styles.card1Media}
              resizeMode="cover"
              />
          <Layout style={styles.card1Description}>
            <Text style={[styles.card1Title, !data.title?styles.fuck:'']} numberOfLines={2}>{data.title}</Text>
            <Text style={[styles.card1Content,!data.title?styles.fuck:'' ]}>
              {toDateIndo(data.date)}
            </Text>
          </Layout>
        </TouchableOpacity>
      </Layout>
    );
}
const styles = StyleSheet.create({
  container: {
      backgroundColor:'#ffffff',
      marginBottom:5
  },
  card1: {
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 0,
    overflow: 'hidden',
    marginTop:0,
    marginBottom:0,
    width:widthWindow
  },
  card1Description: {
      width:widthWindow,
      borderRadius: 0,
      overflow: 'hidden',
      paddingLeft:16,
      paddingRight:16,
      paddingBottom:10,
  },
  card1Title: {
    fontSize:18,
    fontWeight:'bold',
    marginTop:10,
    marginBottom:10,
    letterSpacing:1,
  },
  card1Content: {
    fontSize:16,
    color:'#808080',
    marginBottom:10,
  },
  fuck:{
    backgroundColor:'#e1e4e8',
  },
  card1Media: {
      height: widthWindow / 2,
      width:widthWindow,
  },
  text: {
    marginVertical: 16,
    color:'#FFFFFF'
  },
});
