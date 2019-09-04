

import {
    StyleSheet, ViewPropTypes
} from 'react-native';
import {_storeLocalData, _getLocalData} from '../../Redux/helper';
let theme = {
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
};

const themeBlack = {
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
};

_getLocalData('_theme').then((e)=>{
    if (e === 'night') {
        theme = themeBlack;
    } else{
        
    }
})
export default theme;
export const globalStyle = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    SwipperPaginationStyle:{
      top:30
    },
    btnPrimary:{
        backgroundColor:theme.PRIMARY_COLOR, 
        color:theme.PRIMARY_TEXT_COLOR,
        borderColor:theme.PRIMARY_COLOR,
        marginVertical:10
    },
    btnHeader: {
        width:40,height:40, 
        backgroundColor:theme.PRIMARY_HEADER_BG, 
        color:theme.PRIMARY_TEXT_COLOR,
        padding:0,
        display:'flex', alignItems:'center',justifyContent:'center', borderWidth:0
    },
    logo: {
        width: 150,
        height: 40,
    }
});
