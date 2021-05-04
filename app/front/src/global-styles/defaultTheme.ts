import { DefaultTheme } from 'styled-components';

const grayscale = {
  almostWhite: '#f5f5f5',
  littleBitGray: '#e9e9e9',
  veryLightGray: '#d9d9d9',
  lightGray: '#c4c4c4',
  gray: '#7b7b7b',
  dimGray: '#555555',
  almostBlack: '#262626'
};

export const defaultTheme: DefaultTheme = {
  // Colors - https://wealthpark.atlassian.net/wiki/spaces/PRDE/pages/957579333/Color+WIP
  colors: {
    primary: {
      base: '#1357F7',
      light: '#2E6CFF',
      dark: '#0743D0'
    },
    secondary: {
      base: '#364564',
      dark: '#212C44',
      light: '#485878'
    },
    info: 'blue',
    danger: '#DE4A2F',
    warning: 'yellow',
    success: 'green',
    white: '#ffffff',
    black: '#000000',
    grayscale: {
      ...grayscale
    }
  },
  fontFamily: {
    body: '"Roboto", Helvetica, sans-serif',
    headings: '"Press Start 2p", Helvetica, arial, sans-serif',
    serif: 'Times New Roman, Helvetica, arial, serif',
    monospace: 'Terminal, monospace'
  }
};
