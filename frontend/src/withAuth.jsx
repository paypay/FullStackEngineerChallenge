// TODO HOC for keeps certain components blocked from specific roles. Server returns a bearer token that contains the role. Currently the server is still responding with full data and dont respect the role specified in mongodb
import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import AuthService from "./AuthService";
import { AppContext } from "./AppProvider";
const Auth = AuthService.getInstance();

export default function withAuth(AuthComponent, isAdmin = false) {
  const AuthWrapped = props => {
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
      if (!Auth.loggedIn()) {
        props.history.replace("/login");
      } else {
        try {
          const profile = Auth.getProfile();
          dispatch({ type: "SET_EMPLOYEE", data: profile });
        } catch (err) {
          console.log("catched", err);
          Auth.logOut();
          props.history.replace("/");
        }
      }
    }, []);
    if (state.employee) {
      if (Auth.getRole() !== "admin" && isAdmin === true) {
        props.history.replace("/reviews");
      }
      return (
        <AuthComponent history={props.history} employee={state.employee} {...props} />
      );
    } else {
      return null;
    }
  };
  return withRouter(AuthWrapped);
}
