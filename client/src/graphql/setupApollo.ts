import "whatwg-fetch";

import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/link-error";
import { useMemo } from "react";

import { API_HOST, COOKIE_TOKEN } from "../constants";
import cookies from "../helpers/cookies";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const authLink = setContext((_, { headers = {} }) => {
  return {
    headers: {
      ...headers,
      authorization: cookies().get(COOKIE_TOKEN) || "",
    },
  };
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      const code = err.extensions?.code;
      switch (code) {
        case "UNAUTHENTICATED":
          break;
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = createHttpLink({
  uri: API_HOST,
});

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    defaultOptions: {
      mutate: {
        // Prevent apollo from throwing when there is an error, so we can catch it
        errorPolicy: "all",
      },
    },
    cache: new InMemoryCache(),
  });
};

export const initApollo = (initialState: NormalizedCacheObject) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // The initial state gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (initialState: NormalizedCacheObject) => {
  const store = useMemo(() => initApollo(initialState), [initialState]);
  return store;
};
