import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useContext } from "react";
import { AppContext } from "./AppProvider";
import AuthService from "./AuthService";
import SpinnerButton from "./SpinnerButton";
import AuthMetaLinks from "./AuthMetaLinks";
import { FormControl, Label, Form, MwContainer } from "./styledComponents"
import { ValidatedInputs } from "./ValidatedInputs";
import { IWelcomWrap } from "./types";
const Auth = AuthService.getInstance();

const LOGIN = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      jwtToken
    }
	}
`;
const Login: React.FC<IWelcomWrap> = (props: IWelcomWrap) => {
  const { state, dispatch } = useContext(AppContext);
  const [handleForm, { loading }] = useMutation(LOGIN, {
    onCompleted(e) {
      if (!!e && !!e.login && !!e.login.jwtToken) {
        Auth.setToken(e.login.jwtToken);
        dispatch({ type: "TOGGLE_TOAST", data: { open: true, type: `success`, message: `Welcome!` } });
        setTimeout(() => {
          props.history.replace("/");
        }, 100)
      }
    },
    onError(e) {
      dispatch({ type: "TOGGLE_TOAST", data: { open: true, type: `danger`, message: JSON.stringify(e) } });
    },
  });

  const submitForm = (e) => {
    e.preventDefault()
    handleForm({
      variables: {
        email: state.form.email,
        password: state.form.password
      }
    })
  };
  return (
    <MwContainer>
      <Form onSubmit={submitForm} >
        <h2>Signin</h2>
        <FormControl>
          <ValidatedInputs
            form_to_set="form"
            validates="email"
            name="email"
            defaultValue={state.form.email}
            autoComplete="username email"
            id="email"
            type="email"
            required
            autoFocus
          />
          <Label htmlFor="email">
            Email
        </Label>
        </FormControl>
        <FormControl>
          <ValidatedInputs
            form_to_set="form"
            validates="password"
            name="password"
            defaultValue={state.form.password}
            id="password"
            type="password"
            required
          />
          <Label htmlFor="password">
            Password
        </Label>
        </FormControl>
        <SpinnerButton
          spinning={loading ? 1 : 0}
        >
          Login
      </SpinnerButton>
        <AuthMetaLinks />
      </Form >
    </MwContainer>
  )
};
export default Login;
