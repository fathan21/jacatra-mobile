import * as React from 'react';
import { StyleSheet, View, TouchableOpacity,ImageBackground } from 'react-native';
import { Button, Layout, Text } from 'react-native-ui-kitten';

export default class AricleCard2 extends React.Component {


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
          <Layout style={styles.card2}>
            <Layout style={{width:'30%'}}>
            <ImageBackground source={{uri:'http://jacatra.net/assets/img/galery/20190706190724_latihan.jpg'}}
                style={styles.card2Media}>

            </ImageBackground>
            </Layout>
            <Layout style={styles.card2Description}>
              <Text style={styles.card2Title} numberOfLines={2}>Persija Luncurkan Progam Development Center</Text>
              <Text style={styles.card2Content}>
                3 menit yang lalu
              </Text>
            </Layout>
          </Layout>
        </TouchableOpacity>
    );
  }
}const styles = StyleSheet.create({
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
  },
  card2Description: {
      width:'70%',
      height:100,
      borderRadius: 0,
      overflow: 'hidden',
      display:'flex',
      justifyContent:'space-between',
      alignItems:'flex-start',
      paddingLeft:16,
      paddingRight:16,
      paddingBottom:0,
  },
  card2Title: {
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
