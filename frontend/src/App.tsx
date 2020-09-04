import React, { useEffect } from "react";
import styled from 'styled-components/macro';

import { GlobalStyle, tommyCupTheme } from './styledComponents'

export const Content = styled.section`
  background-color: ${tommyCupTheme.colors.main};
  height: 100%;
`;
const App: React.FC<any> = (props) => {
  useEffect(() => {
  }, []);
  return (
    <Content>
      <GlobalStyle />
      Feedback App
    </Content >
  );
};
export default App;
