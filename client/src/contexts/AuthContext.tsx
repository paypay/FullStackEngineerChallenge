import { useRouter } from "next/dist/client/router";
import React, { FC, useEffect, useState } from "react";

import { COOKIE_TOKEN } from "../constants";
import { useMeLazyQuery, User } from "../graphql/types";
import cookies from "../helpers/cookies";

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
  const router = useRouter();
  const [state, setState] = useState<AuthProps>({
    setUser: (data) => setState({ ...state, user: data }),
  });

  const [meQuery, { data, loading }] = useMeLazyQuery({
    ssr: false,
    // Remove cache from previous user
    fetchPolicy: "network-only",
  });

  const validToken = cookies().get(COOKIE_TOKEN);

  useEffect(() => {
    if (validToken) {
      meQuery();
    }
  }, [state.user]);

  const isAdminRoute = !!router.route.includes("admin");
  const isAdmin = data?.me?.userType === "ADMIN";

  return (
    <AuthContext.Provider value={{ ...state, user: data && data.me, loading }}>
      {/* TODO: Create loading component */}
      {validToken && loading && null}
      {/* If public access, render immediately */}
      {!loading && !isAdminRoute && children}
      {/* We will capture Forbidden access using apollo error link */}
      {isAdminRoute && (isAdmin ? children : null)}
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

  const login = ({ token, user }: AuthPayload) => {
    state.setUser(user);
    cookies().set(COOKIE_TOKEN, token);
    if (user.userType === "ADMIN") {
      router.replace("/admin");
      return;
    }
    router.replace("/");
  };

  const logout = () => {
    state.setUser(undefined);
    cookies().remove(COOKIE_TOKEN);
    router.replace("/");
  };

  return {
    ...state,
    login,
    logout,
  };
};
