import {
    StyleSheet, ViewPropTypes
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {_storeLocalData, _getLocalData} from '../../Redux/helper';
import { withStyles } from 'react-native-ui-kitten';


export const Apptheme = [
    {
        key:'light',
        FONT_SIZE_SMALL: 12,
        FONT_SIZE_MEDIUM: 14,
        FONT_SIZE_LARGE: 16,
        PRIMARY_COLOR: '#B12524',//'#B12524', //#3e3b3b
        PRIMARY_HEADER_BG: '#B12524',//'#B12524'
        PRIMARY_TEXT_COLOR:'#ffffff',
        SECONDARY_COLOR: 'rgb(238, 167, 2)',
        CARD_TEXT_COLOR: '#000000', // #000000,
        CARD_TEXT_BG: '#ffffff', // #ffffff,
        FONT_WEIGHT_LIGHT: 200,
        FONT_WEIGHT_MEDIUM: 600,
        FONT_WEIGHT_HEAVY: 800
    }, 
    {
        key: 'dark',
        FONT_SIZE_SMALL: 12,
        FONT_SIZE_MEDIUM: 14,
        FONT_SIZE_LARGE: 16,
        PRIMARY_COLOR: '#000000',//'#B12524', //#3e3b3b
        PRIMARY_HEADER_BG: '#3e3b3b',//'#B12524'
        PRIMARY_TEXT_COLOR:'#ffffff',
        SECONDARY_COLOR: 'rgb(238, 167, 2)',
        CARD_TEXT_COLOR: '#ffffff', // #000000,
        CARD_TEXT_BG: '#000000', // #ffffff,
        FONT_WEIGHT_LIGHT: 200,
        FONT_WEIGHT_MEDIUM: 600,
        FONT_WEIGHT_HEAVY: 800

    }
];

_getLocalData('_theme').then((e)=>{
    if (e === 'night') {
        
    } else{
        
    }
})

const th: any = () => {
  return Apptheme[0];
}
export const themes = Apptheme;
export const theme = Apptheme[1];
export default th();


export const globalStyle = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    SwipperPaginationStyle:{
      top:30
    },
    btnPrimary:{
        backgroundColor:th.PRIMARY_COLOR, 
        color:th.PRIMARY_TEXT_COLOR,
        borderColor:th.PRIMARY_COLOR,
        marginVertical:10
    },
    btnHeader: {
        width:30,height:30, 
        backgroundColor:th.PRIMARY_HEADER_BG, 
        color:th.PRIMARY_TEXT_COLOR,
        padding:0,
        margin:0,
        display:'flex', alignItems:'center',justifyContent:'center', borderWidth:1
    },
    btnImgHeader:{
        width:25, height:25, marginHorizontal:10
    },
    logo: {
        width: 150,
        height: 40,
    }
});
