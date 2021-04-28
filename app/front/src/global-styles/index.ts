import { createGlobalStyle } from 'styled-components';
import { normalize } from '@styled/modern-normalize';
import { pxToRem } from './utils';

export const baseFontSize = 16;

export const GlobalStyles = createGlobalStyle`
  ${normalize};

  html {
      font-size: ${baseFontSize};
      height: 100%;
  }

  body {
      color: ${(p) => p.theme.colors.grayscale.almostBlack};
      font-family: ${(p) => p.theme.fontFamily.body}; 
      font-size: ${pxToRem('14px')};
      height: 100%;
  }

  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  blockquote {
    background: #f9f9f9;
    border-left: 10px solid #ccc;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  button {
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  }

  h1, h2, h3, h4, h5, p {
    margin-top: 0;
  }

  .sr-only {
    border: 0 !important;
    clip: rect(1px, 1px, 1px, 1px) !important;
    clip-path: inset(50%) !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
    white-space: nowrap !important;
    pointer-events: none;
  }
`;
