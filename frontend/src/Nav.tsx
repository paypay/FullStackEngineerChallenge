import React, { useContext, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { ReactComponent as BackIcon } from "./assets/arrow_icon.svg";
import { ReactComponent as MenuIcon } from "./assets/bars-solid.svg";
import { ReactComponent as Mug } from "./assets/mug-hot-solid.svg";
import { ReactComponent as CloseIcon } from "./assets/times-solid.svg";
import { AppContext } from "./AppProvider";
import AuthService from "./AuthService";
import {
	Backdrop,
	LinkButton,
	MenuArea,
	MenuItem,
	RoundNavIcon,
	NavIcon,
	StyledMenuIcon,
	StyledNavLink,
	feedbackTheme,
} from "./styledComponents";
import styled, { keyframes } from "styled-components/macro";

const Sidebar = styled.div`
  color: #fff;
  bottom: 0;
  position: fixed;
  z-index: 850;
  width: 100%;
  max-width: 400px;
  @media (min-width: ${feedbackTheme.variables.breakpoint2}) {
		position: relative;
	}
  a {
    text-decoration: none;
  }
`;
const LeftMenu = styled.div`
  text-align: center;
`;
const RightMenu = styled.div`
  text-align: center;
`;

const NavBar: any = styled.div`
  ${RightMenu}, ${LeftMenu} {
    pointer-events: all !important;
  }
  color: #fff;
  justify-content: center;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 4em;
  z-index: 12;
  ${NavIcon} {
    margin: 0 .5em;
  }
  ${RightMenu},
  ${LeftMenu} {
    display: flex;
    align-items: center;
  }
  ${RightMenu}{
    justify-content: flex-end;
  }
  ${LeftMenu} {
    justify-content: flex-start;
  }
  width: 100%;
`;

const menu = keyframes`
  0% {
    transform: scale(.9);
    pointer-events: none;
    opacity: 0;
  }
  to {
    transform: scale(1);
    pointer-events: all;
    opacity: 1;
}
`;
const ResponsiveNavbar = styled.div<any>`
  pointer-events: ${(props: any) => (!props.sidebaropen ? `none` : `all`)};
  transition:  transform 0.3s ease, opacity 0.3s ease;
  opacity: ${props => props.sidebartoggled ? 1 : props.sidebaropen ? '.9' : '0'};
  position: fixed;
  @media (min-width: ${feedbackTheme.variables.breakpoint2}) {
		pointer-events: all;
		opacity: 1;
		position: relative;
  } 
    /* animation: ${menu} 1s ${props => props.sidebaropen ? `forwards` : `revert`}; */
  // transform: ${props => props.sidebaropen ? 'scale(1)' : 'scale(0.9)'};
  z-index: 11;
  top: ${props => props.theme.variables.spacing}em;
  left: ${props => props.theme.variables.spacing}em;
  bottom: ${props => props.theme.variables.spacing}em;
  right: ${props => props.theme.variables.spacing}em;
  padding-bottom: 4em;
  margin: 0;
  // background-color: ${props => props.theme.colors.bg1};
  overflow: hidden;
  align-items: center;
  flex-flow: column;
  justify-content: flex-end;
  height: 100%;
  font-size: 1.5em;
  > div {
    overflow-y: scroll;
    width: 100%;
  }
  svg.fa-times {
    color: white;
    width: 2em;
    height: 2em;
  }
  ${MenuItem}, ${StyledNavLink}, svg {
    color: ${props => props.theme.colors.fg};
    &.active {
      color: ${props => props.theme.colors.white};
    }
    svg {
      transition: color ${feedbackTheme.variables.transitionTime}s ease;
    }
    &.active,
    &:hover {
      &,
      svg {
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.white};
      }
    }
  }
  ul {
    list-style: none;
    padding: 0;
    display: inline-flex;
    flex-flow: column;
  }
`;

const Auth = AuthService.getInstance();
const Nav: React.FC<any> = props => {
	const { state, dispatch } = useContext(AppContext);
	useEffect(() => {

	}, []);
	const logout = () => {
		Auth.logOut();
		dispatch({ type: "SET_EMPLOYEE", data: {} });
		dispatch({ type: "TOGGLE_MENU", data: false });
		dispatch({
			type: "TOGGLE_TOAST",
			data: {
				open: true,
				type: "success",
				message: "Successfully logged out!",
			},
		});
		props.history.replace("/login");
	};
	let navProps: any = { navTitle: ``, rightIcon: <Mug /> };
	switch (true) {
		case /\/signin/.test(props.location.pathname):
			navProps = { ...navProps, navTitle: `Login` };
			break;
		default:
			navProps = { ...navProps, navTitle: `` };
			break;
	}
	return (
		<Sidebar {...props}>
			<NavBar {...props}>
				<LeftMenu>
					<RoundNavIcon
						onClick={e => {
							dispatch({ type: "TOGGLE_MENU", data: !state.sidebaropen });
						}}
					>
						<MenuIcon />
					</RoundNavIcon>
				</LeftMenu>

				<RightMenu>
					{props.history.length > 1 && navProps.backIcon && (
						<RoundNavIcon
							title=""
							className="backicon"
							bg
							onClick={() => {
								props.history.goBack();
							}}
						>
							<BackIcon />
						</RoundNavIcon>
					)}
				</RightMenu>
			</NavBar>
			<ResponsiveNavbar sidebartoggled={state.sidebartoggled} sidebaropen={state.sidebaropen}>
				<div>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<h1>Feedback</h1>
						<LinkButton
							style={{
								padding: "1em",
								width: "4em",
								color: feedbackTheme.colors.bg2,
							}}
						>
							<StyledMenuIcon
								onClick={() =>
									dispatch({ type: "TOGGLE_MENU", data: !state.sidebaropen })
								}
							>
								<CloseIcon />
							</StyledMenuIcon>
						</LinkButton>
					</div>
					<MenuArea>
						{!Auth.loggedIn() && (
							<>
								<StyledNavLink
									as={NavLink}
									onClick={() =>
										dispatch({ type: "TOGGLE_MENU", data: false })
									}
									exact
									activeClassName="active bg-white-trans"
									to="/login"
								>
									<BackIcon style={{ transform: `rotate(180deg)` }} />
									Login
								</StyledNavLink>
							</>
						)}
						{Auth.loggedIn() && (
							<LinkButton onClick={logout}>
								<MenuItem>
									<BackIcon />
								Logout
							</MenuItem>
							</LinkButton>
						)}
					</MenuArea>
				</div>
			</ResponsiveNavbar>
			<Backdrop
				onClick={() => dispatch({ type: "TOGGLE_MENU", data: false })}
				visible={state.sidebaropen}
			/>
		</Sidebar>
	);
};
export default withRouter(Nav);
