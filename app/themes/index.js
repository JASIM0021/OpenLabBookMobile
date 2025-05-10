// themes.js
import { DefaultTheme } from 'react-native-paper';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0F5A5E',
    secondary: '#17B169',
    background: '#ffffff',
    text: '#000000',
    textTitle: '#FFCD05',
    placeholder: '#F9F9F9',
  },
};

export const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0F5A5E',
    secondary: '#17B169',
    background: '#121212',
    text: '#ffffff',
    textTitle: '#FFCD05',
  },
};

export const responsiveWidth = width * 0.1; // 10% of screen width
export const responsiveHeight = height * 0.1; // 10% of screen height
export const screenHeight = height;
export const screenWidth = width;
