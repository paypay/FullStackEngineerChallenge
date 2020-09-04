import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import React from "react";
import { render } from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloLink } from 'apollo-link';

const link = ApolloLink.from([
    setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem("id_token");
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            },
        };
    })
]);
const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true
})
const AppContainer = () => (
    <ApolloProvider client={apolloClient}>
        <App />
    </ApolloProvider>
);
render(<AppContainer />, document.getElementById("root"));

serviceWorker.register();
