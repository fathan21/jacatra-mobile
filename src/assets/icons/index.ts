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


export const Star = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./star.png'),
  };
  return Icon(source, style);
};

export const StarOutline = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./star-outline.png'),
  };
  return Icon(source, style);
};

export const Alphabet = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./alphabet.png'),
  };
  return Icon(source, style);
};

export const Close = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./close-outline.png'),
  };
  return Icon(source, style);
};

export const ShareOutlineWhite = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./share-outline-white.png'),
  };
  return Icon(source, style);
};

export const SearchIconOutlineWhite = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./search-outline-white.png'),
  };
  return Icon(source, style);
};
export const MenuIconWhite = (style: StyleProp<ImageStyle>): IconElement => {
  const source: IconSource = {
    imageSource: require('./icon-menu.png'),
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

export {
  Icon,
  IconSource,
  RemoteIcon,
} from './icon.component';
