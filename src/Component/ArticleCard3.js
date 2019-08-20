import * as React from 'react';
import { StyleSheet, View, TouchableOpacity,ImageBackground, Dimensions } from 'react-native';
import { Button, Layout, Text } from 'react-native-ui-kitten';

const widthWindow = Dimensions.get('window').width;
import {toDateIndo} from '../Redux/helper';
import ProgressiveImage from './ProgressiveImage';
export default class AricleCard3 extends React.Component {


  onItemPress = (article) => {
    // this.props.onItemPress(article);
    // alert(article);
  };
  render() {
    return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={()=>this.onItemPress('haha')}
          >
          <Layout style={styles.card3}>
            <ImageBackground source={{uri:'http://jacatra.net/assets/img/galery/20190706190724_latihan.jpg'}}
                style={styles.card3Media}>

                <Layout style={styles.card3Description}>
                  <Text style={styles.card3Title} numberOfLines={2}>Persija Luncurkan Progam Development Center</Text>
                </Layout>
            </ImageBackground>
          </Layout>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      backgroundColor:'#ffffff',
  },
  card3: {
    height:250,
    borderRadius: 0,
    margin:16,
    overflow: 'hidden',
    paddingBottom:10,
    paddingTop:10,
    paddingLeft: 16,
    paddingRight: 16,
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    borderBottomColor:'black',
    width:(widthWindow-32)
  },
  card3Description: {
      width:'90%',
      height:60,
      marginRight:'5%',
      marginLeft:'5%',
      padding:5,
      borderRadius: 0,
      overflow: 'hidden',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      textAlign:'center',
      paddingLeft:16,
      paddingRight:16,
      paddingBottom:0,
      borderWidth: 1,
      position:'absolute',
      bottom:-25,
      borderWidth:1,
      elevation: 2,
      borderColor: '#CCC',
  },
  card3Title: {
    fontSize:16,
    fontWeight:'bold',
    marginTop:0,
    textAlign:'center',
    marginBottom:0,
  },
  card3Content: {
    fontSize:16,
    color:'#808080',
    marginBottom:0,
  },
  card3Media: {
      height: 200,
      width:'100%',
      backgroundColor:'#cccccc',
      borderRadius: 0,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
  },
  text: {
    marginVertical: 16,
    color:'#FFFFFF'
  },
});
