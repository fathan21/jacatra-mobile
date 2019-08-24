

import {
    StyleSheet, ViewPropTypes
} from 'react-native';
const theme = {
    FONT_SIZE_SMALL: 12,
    FONT_SIZE_MEDIUM: 14,
    FONT_SIZE_LARGE: 16,
    PRIMARY_COLOR: '#5c171a',
    PRIMARY_TEXT_COLOR:'#ffffff',
    SECONDARY_COLOR: 'rgb(238, 167, 2)',
    FONT_WEIGHT_LIGHT: 200,
    FONT_WEIGHT_MEDIUM: 600,
    FONT_WEIGHT_HEAVY: 800
};
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
        backgroundColor:theme.PRIMARY_COLOR, 
        color:theme.PRIMARY_TEXT_COLOR,
        padding:0,
        display:'flex', alignItems:'center',justifyContent:'center', borderWidth:0
    },
    logo: {
        width: 100,
        height: 40
    }
});
