import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import AuthService from "./AuthService";
import { AppContext } from "./AppProvider";
const Auth = AuthService.getInstance();

export default function withAuth(AuthComponent) {
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
      return (
        <AuthComponent history={props.history} employee={state.employee} {...props} />
      );
    } else {
      return null;
    }
  };
  return withRouter(AuthWrapped);
}
