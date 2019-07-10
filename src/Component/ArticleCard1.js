import * as React from 'react';
import { StyleSheet, View, TouchableOpacity,ImageBackground } from 'react-native';
import { Button, Layout, Text } from 'react-native-ui-kitten';

export default class AricleCard1 extends React.Component {


  onItemPress = (article) => {
    // this.props.onItemPress(article);
    // alert(article);
  };
  render() {
    return (
      <Layout style={styles.container}>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={()=>this.onItemPress('haha')}
          style={styles.card1}
          >
          <ImageBackground source={{uri:'http://jacatra.net/assets/img/galery/20190706190724_latihan.jpg'}}
              style={styles.card1Media}>

          </ImageBackground>
          <Layout style={styles.card1Description}>
            <Text style={styles.card1Title} numberOfLines={2}>Persija Luncurkan Progam Development Center</Text>
            <Text style={styles.card1Content} numberOfLines={2}>Note that this is recommended for English and English-like scripts (Latin, Greek, and Cyrillic). For South and Southeast Asian and Middle Eastern languages, including Arabic, Hindi, and Thai:</Text>
            <Text style={styles.card1Content}>
              3 menit yang lalu
            </Text>
          </Layout>
        </TouchableOpacity>
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      backgroundColor:'#ffffff',
  },
  card1: {
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 0,
    overflow: 'hidden',
    marginTop:0,
    marginBottom:0,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderBottomColor:'black',
  },
  card1Description: {
      width:'100%',
      borderRadius: 0,
      overflow: 'hidden',
      display:'flex',
      justifyContent:'flex-start',
      alignItems:'flex-start',
      paddingLeft:16,
      paddingRight:16,
      paddingBottom:10,
  },
  card1Title: {
    fontSize:20,
    fontWeight:'bold',
    marginTop:16,
    marginBottom:10,
  },
  card1Content: {
    fontSize:16,
    color:'#808080',
    marginBottom:5,
  },
  card1Media: {
      height: 250,
      width:'100%',
      borderRadius: 0,
      overflow: 'hidden',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
  },
  text: {
    marginVertical: 16,
    color:'#FFFFFF'
  },
});
