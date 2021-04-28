// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        base: string;
        light: string;
        dark: string;
      };
      secondary: {
        base: string;
        light: string;
        dark: string;
      };
      info: string;
      danger: string;
      warning: string;
      success: string;
      black: string;
      white: string;
      grayscale: {
        almostWhite: string;
        littleBitGray: string;
        veryLightGray: string;
        lightGray: string;
        gray: string;
        dimGray: string;
        almostBlack: string;
      };
    };
    fontFamily: {
      body: string;
      headings: string;
      serif: string;
      monospace: string;
    };
  }
}
