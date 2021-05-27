import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  Input,
  InputLabel,
  Grid,
  Button,
  Card,
} from "@material-ui/core";
import { loginAction } from "stores/slices/login";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTES } from "utils/enums";

const useStyles = makeStyles({
  formControl: {
    width: "100%",
    margin: "10px 0",
  },
  card: {
    padding: "40px",
  },
});

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const { success } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (success) {
      history.push(ROUTES.DASHBOARD);
    }
  }, [success]);
  useEffect(() => {
    if (accessToken) {
      dispatch(loginAction());
    }
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginAction({ email, password }));
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{
        minHeight: "100vh",
      }}
    >
      <Grid item xs={3}>
        <Card className={classes.card}>
          <h3>Login</h3>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                onChange={(evt) => setEmail(evt.target.value)}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type="password"
                onChange={(evt) => setPassword(evt.target.value)}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                value="Submit"
              >
                Submit
              </Button>
            </FormControl>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
