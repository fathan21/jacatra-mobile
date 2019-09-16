import React,{useContext, useState} from "react";

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
        SIDE_BG:'#fffff',
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
        SIDE_BG:'#000000',
        SECONDARY_COLOR: 'rgb(238, 167, 2)',
        CARD_TEXT_COLOR: '#ffffff', // #000000,
        CARD_TEXT_BG: '#000000', // #ffffff,
        FONT_WEIGHT_LIGHT: 200,
        FONT_WEIGHT_MEDIUM: 600,
        FONT_WEIGHT_HEAVY: 800

    }
];
// themeProvider.js

const ThemeContext = React.createContext();
export const ThemeContextProvider = ({ children, defTheme }) => {
  const [themeID, setThemeID] = useState(defTheme);

  return (
    <ThemeContext.Provider value={{ themeID, setThemeID }}>
      {children}
    </ThemeContext.Provider>
  );
};
export function withTheme(Component) {
    return props => {
      const { themeID, setThemeID } = useContext(ThemeContext);
      const getTheme = themeID => Apptheme.find(theme => theme.key === themeID);
      const setTheme = themeID => setThemeID(themeID);
  
      return (
        <Component
          {...props}
          themes={Apptheme}
          theme={getTheme(themeID)}
          setTheme={setTheme}
        />
      );
    };
  }