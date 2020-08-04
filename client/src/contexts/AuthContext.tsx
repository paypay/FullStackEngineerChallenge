import { useRouter } from "next/dist/client/router";
import React, { FC, useEffect, useState } from "react";

import { COOKIE_TOKEN } from "../constants";
import { useApollo } from "../graphql/setupApollo";
import { useMeLazyQuery, User } from "../graphql/types";
import cookies from "../helpers/cookies";
import { getLocale } from "../helpers/getLocale";

interface AuthProps {
  readonly user?: Partial<User> | null;
  readonly loading?: any;
  setUser: (data?: Partial<User>) => void;
}

interface AuthPayload {
  user: Partial<User>;
  token: string;
}

export const AuthContext = React.createContext<AuthProps>({
  setUser: () => ({}),
});

export const AuthProvider: FC = ({ children }) => {
  const [state, setState] = useState<AuthProps>({
    setUser: (data) => setState({ ...state, user: data }),
  });
  const [meQuery, { data, loading }] = useMeLazyQuery({
    ssr: false,
    fetchPolicy: "network-only",
  });

  const validToken = cookies().get(COOKIE_TOKEN);

  useEffect(() => {
    if (validToken) {
      meQuery();
    }
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ ...state, user: data && data.me, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

interface UseAuthProps extends AuthProps {
  login(payload: AuthPayload): void;
  logout(): void;
}

export const useAuth = (): UseAuthProps => {
  const state = React.useContext(AuthContext);
  const router = useRouter();
  const client = useApollo();

  const login = ({ token, user }: AuthPayload) => {
    cookies().set(COOKIE_TOKEN, token);
    state.setUser(user);

    if (user.userType === "ADMIN") {
      router.push("/[lang]/admin/employees", `/${getLocale()}/admin/employees`);
      return;
    }
    router.push("/[lang]/auth/reviews", `/${getLocale()}/auth/reviews`);
  };

  const logout = async () => {
    router.replace("/[lang]/login", `/${getLocale()}/login`);
    cookies().remove(COOKIE_TOKEN);
    state.setUser(undefined);
    //Clear cache
    client.clearStore();
  };

  return {
    ...state,
    login,
    logout,
  };
};
