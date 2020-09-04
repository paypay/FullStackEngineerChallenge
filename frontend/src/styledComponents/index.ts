import styled, {
  createGlobalStyle,
} from "styled-components/macro";
import { tommyCupTheme } from "./Theme";

export const GlobalStyle: any = createGlobalStyle`
  *, ::after, ::before {
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
    font-size: 16px!important;
  };

`;
export const AppContainer = styled.div<any>`
  height: 100%;
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
`;
export { tommyCupTheme };