import React, { useReducer, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';
import Toast from './Toast';
import { reducer, initialState } from './reducer';
import { IContextProps } from './types';
const Container = styled.div<any>`
  display: flex;
  height: 100%;
  flex-flow: column;
`
export const AppContext = React.createContext({} as IContextProps);
// TODO HOC for global state/reducer pattern
export const AppProvider = ({ children }) => {
  const [originalState, dispatch] = useReducer(reducer, initialState);
  const navRef = useRef(null);
  const iconRef = useRef(null);
  const state = { ...originalState, navRef, iconRef }
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Container className={state.sidebaropen ? `sidebaropen` : ``}>
        <ThemeProvider theme={state.active_theme}>
          <>
            <Toast />
            {children}
          </>
        </ThemeProvider>
      </Container>
    </AppContext.Provider>
  );
};
