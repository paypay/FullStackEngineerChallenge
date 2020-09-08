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
	RoundNavIcon,
	StyledMenuIcon,
	StyledNavLink,
	feedbackTheme,
	Sidebar,
	LeftMenu,
	RightMenu,
	NavBar,
	ResponsiveNavbar,
} from "./styledComponents";

const Auth = AuthService.getInstance();
const Nav: React.FC<any> = props => {
	const { state, dispatch } = useContext(AppContext);
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
						{Auth.loggedIn() && (
							<>
								{Auth.getRole() === "admin" && (
									<StyledNavLink
										as={NavLink}
										onClick={() =>
											dispatch({ type: "TOGGLE_MENU", data: false })
										}
										exact
										activeClassName="active bg-white-trans"
										to="/"
									>
										<BackIcon style={{ transform: `rotate(180deg)` }} />
									Employees
									</StyledNavLink>
								)}
								<StyledNavLink
									as={NavLink}
									onClick={() =>
										dispatch({ type: "TOGGLE_MENU", data: false })
									}
									exact
									activeClassName="active bg-white-trans"
									to="/reviews"
								>
									<BackIcon style={{ transform: `rotate(180deg)` }} />
									Reviews
						</StyledNavLink>
							</>
						)}
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
							<StyledNavLink onClick={logout}>
								<BackIcon />
									Logout
							</StyledNavLink>
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
