import { yupResolver } from "@hookform/resolvers";
import { t, Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "../../components/Button";
import { FormGroup } from "../../components/FormGroup";
import { Input } from "../../components/Input";
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

  const [changeUserPasswordMutation, { loading }] = useAuthenticateMutation();

  const onSubmit = handleSubmit(async (input: AuthenticateInput) => {
    const { data, errors } = await changeUserPasswordMutation({
      variables: { input },
    });

    if (errors) {
      return formatApiErrors(errors, setError);
    }

    login(data!.Authenticate);
  });

  return (
    <I18n>
      {({ i18n }) => (
        <div className="flex items-center justify-center min-h-screen max-w-lg m-auto px-4 md:px-8">
          <form className="m-auto" noValidate={true} onSubmit={onSubmit}>
            <img
              src="/logo.jpg"
              alt="logo"
              className="object-fit h-40 mb-5 w-full"
            />
            <FormGroup
              label={i18n._(t("login.field.email")`Email`)}
              labelFor="email"
              error={errors.email}
            >
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={loading}
                ref={register}
              />
            </FormGroup>
            <FormGroup
              label={i18n._(t("login.field.password")`Password`)}
              labelFor="password"
              error={errors.password}
            >
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={loading}
                ref={register}
              />
            </FormGroup>

            <Button className="mt-2" type="submit" disabled={loading}>
              <Trans id="login.button.submit">Login</Trans>
            </Button>
          </form>
        </div>
      )}
    </I18n>
  );
};

export default Login;
