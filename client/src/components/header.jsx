import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, IconButton } from "@material-ui/core";
import { ROUTES } from "utils/enums";

const useStyles = makeStyles({
  header: {
    zIndex: 9999,
    color: "#FFF",
    position: "fixed",
    background: "#ff0033",
    minHeight: "65px",
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
  },
  leftAlign: {
    margin: "5px",
  },
});

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const { userName, isAdmin } = useSelector((state) => state.loginReducer);

  useEffect(() => {
    if (!userName) {
      history.push(ROUTES.LOGIN);
    }
  }, []);

  return (
    <Grid
      className={classes.header}
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <div className={classes.leftAlign}>
        <h3>PAYPAY</h3>
      </div>
      <div className="right-algin">
        <span>
          {userName} {isAdmin ? "admin" : ""}
        </span>
        <IconButton onClick={() => history.push(ROUTES.LOGOUT)}>
          <ExitToAppIcon />
        </IconButton>
      </div>
    </Grid>
  );
};

export default Header;
