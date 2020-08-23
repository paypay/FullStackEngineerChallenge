import { yupResolver } from "@hookform/resolvers";
import { i18n } from "@lingui/core";
import { defineMessage, Trans } from "@lingui/macro";
import LockIcon from "@material-ui/icons/Lock";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Alert, Button, FormGroup, Input } from "../../components";
import { Head } from "../../components/Layout/components/Head";
import { useAuth } from "../../contexts/AuthContext";
import {
  AuthenticateInput,
  useAuthenticateMutation,
} from "../../graphql/types";
import { formatApiErrors } from "../../helpers/formatApiErrors";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(1).required().max(255),
});

const Login = () => {
  const { register, handleSubmit, setError, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const { login } = useAuth();
  const [showError, setShowError] = useState(false);

  const [authenticateMutation, { loading }] = useAuthenticateMutation();

  const onSubmit = handleSubmit(async (input: AuthenticateInput) => {
    const { data, errors } = await authenticateMutation({
      variables: { input },
    });

    if (errors) {
      setShowError(true);
      return formatApiErrors(errors, setError);
    }

    login(data!.Authenticate);
  });

  return (
    <>
      <Head
        title={i18n._(
          defineMessage({ id: "login.seo.title", message: "Sign in" })
        )}
      />
      <div className="h-screen w-full md:flex items-center justify-center relative">
        <img
          src="/login-bg.jpg"
          className=" md:block absolute h-full object-cover z-0"
        />
        <div className="z-10 h-screen md:h-auto bg-white flex items-center max-w-6xl justify-center m-auto rounded-xl shadow-xl">
          <div className="hidden md:block w-7/12 relative flex-shrink-0 flex-grow-0">
            <img
              style={{ minHeight: 425, minWidth: 450 }}
              src="/login-bg-side.jpg"
              className="max-h-screen w-full object-cover rounded-l-xl"
            />
            <div className="text-white flex text-left items-center justify-center absolute top-0 bottom-0 h-full w-full">
              <div className="max-w-sm">
                <h3 className="text-4xl font-bold mb-2">
                  <Trans id="login.welcome.title">Welcome back!</Trans>
                </h3>
                <p className="text-xl">
                  <Trans id="login.welcome.description">
                    You can sign in to access with your existing account.
                  </Trans>
                </p>
              </div>
            </div>
          </div>
          <div className="z-10 py-10 mx-4 rounded md:mx-0 md:py-0 md:flex items-center justify-center bg-white">
            <form
              onSubmit={onSubmit}
              className="bg-white text-gray-800 md:h-full w-full px-8 md:px-20"
              noValidate={true}
            >
              <img
                src="/logo.jpg"
                alt="logo"
                className="object-scale-down h-24 w-full mb-3"
              />
              <h1 className="text-2xl text-gray-700 font-medium mb-5">
                <Trans id="login.submit">Sign In</Trans>
              </h1>

              {showError && (
                <Alert variant="error" className="mb-5">
                  <Trans id="login.generic.error">
                    Authentication failed. You entered an incorrect username or
                    password.
                  </Trans>
                </Alert>
              )}

              <FormGroup labelFor="email" className="mb-4" error={errors.email}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  icon={<PersonRoundedIcon fontSize="inherit" />}
                  placeholder={i18n._(
                    defineMessage({
                      id: "login.field.email",
                      message: "Email",
                    })
                  )}
                  rounded
                  autoComplete="email"
                  disabled={loading}
                  ref={register}
                  required
                />
              </FormGroup>
              <FormGroup labelFor="password" error={errors.password}>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  icon={<LockIcon fontSize="inherit" />}
                  placeholder={i18n._(
                    defineMessage({
                      id: "login.field.password",
                      message: "Email",
                    })
                  )}
                  rounded
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  ref={register}
                />
              </FormGroup>

              <Button
                className="mt-10 rounded-full"
                type="submit"
                disabled={loading}
              >
                <Trans id="login.button.submit">Sign In</Trans>
              </Button>

              <div className="mt-6 text-sm text-center text-gray-600">
                <Trans id="login.help">
                  Don't have an account? Contact HR to create an account.
                </Trans>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
