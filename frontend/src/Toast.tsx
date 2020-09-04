import React, { useState, useContext, useEffect } from "react";
import {  RotatingSpinnerIcon, GhostButton } from "./styledComponents"
import { AppContext } from "./AppProvider";
import { ReactComponent as SpinnerIcon } from "./assets/spinner.svg";
import styled from "styled-components/macro";
export const ToastStyled = styled.div<any>`
  position: fixed;
  top: 0;
  right: 0;
  max-width: 500px;
  width: 100%;
  left: 0;
  word-wrap: anywhere;
  word-break: break-all;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${props => (!props.open ? `0` : `1`)};
  transform: ${props =>
    !props.open ? `translate(0, -100%)` : `translate(0, 0)`};
  @media (min-width: 500px) {
    transform: ${props =>
    !props.open ? `translate(-50%, -100%)` : `translate(-50%, 0)`};
    right: auto;
    left: 50%;
  }
  &,
  #spinner {
    color: ${props =>
    !!props.type ? `white` : props.theme.colors.main}!important;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1em;
  background-color: ${props =>
    props.type
      ? props.theme.colors[props.type]
      : props.theme.colors.main};
  z-index: 999;
  button {
    margin: 0 0.5em;
    white-space: nowrap;
  }
`;

let timeout: number;
const Toast: React.FC<any> = (props) => {
  const { state } = useContext(AppContext);
  const [open, hideToast] = useState(state.toast.open);
  useEffect(() => {
    hideToast(state.toast.open)
    clearTimeout(timeout)
    if (!!!state.toast.loading && !!!state.toast.actions) {
      timeout = setTimeout(() => {
        hideToast(false)
      }, 4000)
    }
  }, [state.toast])
  
  return (
    <ToastStyled
      onClick={e => hideToast(false)}
      type={state.toast.type}
      open={open}>
      <span>{state.toast.message}</span>
      {state.toast && state.toast.actions && state.toast.actions.map(action => <GhostButton color="white" onClick={action.callback}>{action.title}</GhostButton>
      )}
      {state.toast.loading && (
        <RotatingSpinnerIcon>
          <SpinnerIcon />
        </RotatingSpinnerIcon>
      )}
    </ToastStyled>
  )
}
export default Toast