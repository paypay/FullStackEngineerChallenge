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
      font-style: normal;
      font-weight: 400 700;
      font-display: optional;
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

  .pixel-border {
    border-style: solid;
    border-width: 4px;
    border-color: #000;
    border-image-slice: 5;
    border-image-width: 2;
    border-image-outset: 0;
    border-image-source: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><path d='M2 2h2v2H2zM4 0h2v2H4zM10 4h2v2h-2zM0 4h2v2H0zM6 0h2v2H6zM8 2h2v2H8zM8 8h2v2H8zM6 10h2v2H6zM0 6h2v2H0zM10 6h2v2h-2zM4 10h2v2H4zM2 8h2v2H2z' fill='%23000' /></svg>");
  }

  button {
    cursor: pointer;
    font-family: ${(p) => p.theme.fontFamily.headings};
    padding: 8px;
    text-transform: uppercase;
    &:hover {

    }
    &:disabled {
      cursor: not-allowed;
    }
  }

  h1, h2, h3, h4, h5 {
    margin-top: 0;
    font-family: ${(p) => p.theme.fontFamily.headings}; 
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
