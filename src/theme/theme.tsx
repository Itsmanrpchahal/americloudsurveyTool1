import {DarkTheme, DefaultTheme as LightTheme} from '@react-navigation/native';

export const navigationTheme = {
  light: {
    ...LightTheme,
    type: 'light',
    colors: {
      ...LightTheme.colors,
      primary: '#F6F4FF',
      secondary: '#E3E1EE',
      textWhite: '#FFFFFF',
      textBlack: '#262626',
      themeColor: '#A913DD',
      darkGary: '#C9C9C9',
    },
    fontSize: {
      subTitle: 14,
      title: 19,
      decs: 15,
    },
  },
  dark: {
    ...DarkTheme,
    type: 'dark',
    colors: {
      ...DarkTheme.colors,
      primary: '#28303D',
      secondary: '#19212C',
      textWhite: '#FFFFFF',
      textBlack: '#262626',
      themeColor: '#A913DD',
      darkGary: '#C9C9C9',
    },
    fontSize: {
      subTitle: 14,
      title: 19,
      decs: 15,
    },
  },
};
