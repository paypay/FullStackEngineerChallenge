import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logOut } from "stores/slices/logout";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "utils/enums";

const Logout = () => {
  const history = useHistory();
  const { message } = useSelector((state) => state.logoutReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      localStorage.removeItem("accessToken");
      history.push(ROUTES.LOGIN);
    }
  }, [message]);
  useEffect(() => {
    dispatch(logOut());
  }, []);
  return <h3>Thanks for the feedback</h3>;
};
export default Logout;
