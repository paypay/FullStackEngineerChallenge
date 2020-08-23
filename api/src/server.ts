import "dotenv-flow/config";

import { ApolloServer } from "apollo-server-micro";
import cors from "micro-cors";

import { context, formatError, resolvers, scalars, typeDefs } from "./graphql";

module.exports = cors({
  allowCredentials: true,
  allowHeaders: [
    "X-Requested-With",
    "Access-Control-Allow-Origin",
    "X-HTTP-Method-Override",
    "Content-Type",
    "authorization",
    "Accept",
  ],
})((req, res) => {
  // Setup apollo server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: { ...resolvers, ...scalars },
    formatError,
    context,
    //information about what queries it supports
    introspection: true,
    playground: true,
  });

  const handler = apolloServer.createHandler();
  return req.method === "OPTIONS" ? res.end() : handler(req, res);
});
