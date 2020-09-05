import styled, {
  createGlobalStyle,
} from "styled-components/macro";
import { feedbackTheme } from "./Theme";
const spacing = feedbackTheme.variables.spacing;
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
interface NavIcon {
  bg?: Boolean;
  onClick?: Function;
  position?: string;
}
interface LoadingInterface {
  loading?: Boolean;
}
const floatingLabel = (props: any) => {
  if (props.active) {
    return `
      top: -1em !important;
    bottom: 10px;
      font-size: 11px;
      opacity: 1;
    `;
  }
};
export const Input = styled.input<any>`
  box-shadow: none;
  ~ label {
    ${floatingLabel}
  }
  &:focus ~ label {
    ${floatingLabel({ active: true })}
  }
  ~ ul {
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }
  &:focus ~ ul {
    opacity: 1;
  }
  /* ::placeholder {
    color: transparent;
  } */
  &:disabled,
  &:disabled ~ label {
    opacity: 0.5;
  }
  color: ${props => props.theme.colors.grey};
  font-size: 1em;

  background-color: ${props => (props.color ? props.color : `transparent`)};
  width: 100%;
  border: 0;
  border-bottom: 1px solid ${(props: any) => props.theme.colors.main};
  border-radius: 0;
  border-color: ${(props: any) => {
    return props.valid === undefined
      ? props.theme.colors.gray
      : props.valid.length === 0
        ? props.theme.colors.main
        : props.theme.colors.danger;
  }};
  svg {
    width: 4em;
  }
`;
export const NavIcon = styled.button<NavIcon>`
  padding: 0;
  border: 0;
  width: 3em;
  height: 3em;
  justify-content: center;
  display: flex;
  flex-flow: column;
  align-items: center;
  svg {
    width: 1.5em !important;
    height: 1.5em !important;
  }
  `;
export const RoundNavIcon = styled(NavIcon)`
  background: ${(props: any) => props.theme.colors.bg};
  border-radius: 50%;
  padding: 9px;
  box-shadow: 0px 0px 36px #00000059;
  svg,
  span {
    color: ${props => props.theme.colors.main};
  }
  `;
export const Button: any = styled.button`
    padding: 0.7em 1em;
    margin: 0 0.5em 0.5em 0;
    font-size: inherit;
    background-color: ${(props: any) => props.theme.colors.main};
    color: ${(props: any) => props.theme.colors.bg};
    border-radius: 0;
    transition: background-color 0.3s ease;
    border: 0 none;
  `;
export const LinkButton = styled.a`
  border: 0;
  cursor: pointer;
  background-color: transparent;
`
export const StyledNavLink = styled.a<any>`
  display: flex;
  justify-content: flex-start;
  padding: 1em;
  text-decoration: none;
  color: ${(props: any) => props.theme.colors.dark};
  align-items: center;
`
export const MenuArea = styled.nav`
  display: flex;
  justify-content: flex-end;
  flex-flow: column;
  width: 100%;
  align-items: stretch;
  svg {
    width: 1em;
    margin-right: 0.5em;
  }
`;
export const BaseSpinner = styled.div`
  max-height: 100vh;
  max-width: 100vw;
`;
export const StyledMenuIcon = styled.div``;
export const MenuItem = styled.span`
  padding: 1em;
  text-decoration: none;
  color: ${(props: any) => props.theme.colors.dark};
  display: block;
`;
export const Backdrop = styled.div<any>`
  background-color: #333333aa;
  transition: opacity 0.3s ease;
  opacity: ${props => (props.visible ? 1 : 0)};
  pointer-events: ${props => (props.visible ? `all` : `none`)};
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;
export const GhostButton = styled(Button)`
  color: ${(props: any) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.main};
  background-color: transparent;
  border-color: ${(props: any) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.main};
  width: ${(props: any) => props.type === `block` && `100%`};
  box-shadow: none;
`;
export const RotatingSpinnerIcon = styled(BaseSpinner)`
  svg {
    height: 1em;
    width: 1em;
    color: ${(props: any) => props.theme.colors.white};
  }
`;
export const Form = styled.form<LoadingInterface>`
  position: relative;
  display: block;
  width: 100%;
  opacity: ${props => props.loading && 0.5};
  button[type="submit"] {
    margin-top: 2em;
  }
`;
export const FormControl = styled.div`
  display: block;
  display: flex;
  position: relative;
  margin-bottom: 2em;
  flex-flow: column;
  justify-content: space-between;
  ul.autocomplete {
    display: none;
  }
  &:focus-within ul {
    opacity: 1;
    &, li, label {
      pointer-events: all !important;
    }
    display: block !important;
  }
  h4 {
    margin: 0 0 0.5em 0;
  }
  ul.checkboxes {
    margin: 0;
    li {
      margin: 1em 0px;
    }
  }
  ${Input}, .StripeElement {
    padding: ${spacing * 2}em ${spacing}em;
  }
`;
export const MwContainer: any = styled.div`
  margin: 0 auto 1em auto;
  display: flex;
  padding: ${spacing}em;
  width: 100%;
  flex-grow: 1;
  max-width: ${feedbackTheme.variables.container}px;
  flex-flow: column;
`;
export const Label = styled.label``;
export const ButtonLink = styled(Button)`
  text-decoration: none;
  background-color: transparent;
  border: 0;
  color: ${(props: any) => props.theme.colors.main};
`;
export const SimpleLink = styled.a<any>`
  text-decoration: none;
`;
export const ButtonBlock = styled(Button)`
  margin-bottom: 0.5em;
  display: block;
  cursor: pointer;
  outline: none;
  border: none;
  width: 100%;
  &:disabled {
    opacity: 0.5;
  }
`;
export const HiddenChildren = styled.span<any>`
  opacity: ${(props: any) => (props.spinning ? 0 : 1)};
`;
export const SpinnerButtonSpinner: any = styled(BaseSpinner)`
  opacity: ${(props: any) => (!props.spinning ? 0 : 1)};
  position: absolute;
  left: 50%;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  svg {
    color: ${(props: any) => props.theme.colors.white};
  }
`;
export const ValidationWarning = styled.ul`
  display: flex;
  flex-flow: column;
  list-style: none;
  margin: 0;
  position: absolute;
  top: 100%;
  opacity: ${(props: { active: boolean }) => (props.active ? 1 : 0)}!important;
  z-index: 9;
  width: 100%;
  padding: ${spacing * 1.5}em ${spacing / 2}em;
  background-color: ${(props: any) => props.theme.colors.danger};
  li {
    color: white;
    font-size: smaller;
  }
`;
export const Table = styled.table`
  text-align: left;
  width: 100%;
  tr td,
  tr th {
    padding: 0.5em 1em;
    border-bottom: 1px solid ${(props: any) => props.theme.colors.gray};
  }
  tr td:first-child,
  tr th:first-child,
  tr td:last-child,
  tr th:last-child {
    padding: 0.5em 0;
  }
  tr.active td {
    background-color: #eee;
  }
`;
export { feedbackTheme };