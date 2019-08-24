import * as React from 'react';
import { StyleSheet, View, TouchableOpacity,} from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';
import ProgressiveImage from './ProgressiveImage';
export default AricleCard4 =({data, goToPage}) => {
    return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={()=>this.onItemPress('haha')}
          >
          <Layout style={styles.card3}>
            <ProgressiveImage source={{uri:'http://jacatra.net/assets/img/galery/20190706190724_latihan.jpg'}}
                style={styles.card3Media}
                resizeMode="cover"
                />
            <Text style={styles.card3Title} numberOfLines={2}>Persija Luncurkan Progam Development Center</Text>
          </Layout>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor:'#ffffff',
  },
  card3: {
    borderRadius: 0,
    margin:5,
    overflow: 'hidden',
    paddingBottom:10,
    paddingTop:10,
    paddingLeft: 10,
    paddingRight: 5,
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    borderBottomColor:'black',
    width:200
  },
  card3Title: {
    fontSize:14,
    fontWeight:'bold',
    marginTop:10,
    textAlign:'left',
    marginBottom:10,
  },
  card3Media: {
      height: 100,
      width:'100%',
      backgroundColor:'#cccccc',
      borderRadius: 0,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
  },
  text: {
    marginVertical: 5,
    color:'#FFFFFF'
  },
});
