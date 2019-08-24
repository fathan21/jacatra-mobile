import {
  ImageStyle,
  StyleProp,
} from 'react-native';
import {
  Icon,
  IconElement,
  IconSource,
  RemoteIcon,
} from './icon.component';


export const BookmarkShape = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./bookmark-shape-black.png'),
  };
  return Icon(source, style);
};
export const BookmarkShapeWhite = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./bookmark-shape-white.png'),
  };
  return Icon(source, style);
};

export const SearchIconOutline = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./search-outline.png'),
  };
  return Icon(source, style);
};
export const SearchIconOutlineWhite = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./search-outline-white.png'),
  };
  return Icon(source, style);
};

export const ShareOutlineWhite = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./share-outline-white.png'),
  };
  return Icon(source, style);
};
export const ShareOutline = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./share-outline.png'),
  };
  return Icon(source, style);
};

export const MenuIconDark = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./icon-menu-dark.png'),
  };
  return Icon(source, style);
};
export const MenuIconWhite = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./icon-menu.png'),
  };
  return Icon(source, style);
};
export const ArrowIosBackFill = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./arrow-ios-back.png'),
  };
  return Icon(source, style);
};

export const ArrowBackOutlineWhite = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./arrow-back-outline-white.png'),
  };
  return Icon(source, style);
};

export const ArrowPointToTopWhite = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./arrow-point-to-top-white.png'),
  };
  return Icon(source, style);
};
export const IconApp = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./icon.png'),
  };
  return Icon(source, style);
};


export {
  Icon,
  IconSource,
  RemoteIcon,
} from './icon.component';
