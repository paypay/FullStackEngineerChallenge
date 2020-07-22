import "dotenv-flow/config";

import { ApolloServer } from "apollo-server-micro";
import cors from "micro-cors";

import { resolvers, typeDefs, scalars } from "./src/graphql";

module.exports = cors({
  allowHeaders: [
    "X-Requested-With",
    "Access-Control-Allow-Origin",
    "X-HTTP-Method-Override",
    "Content-Type",
    "authorization",
    "Accept",
    "locale",
  ],
})((req, res) => {
  // Setup apollo server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: { ...resolvers, ...scalars },
    introspection: process.env.NODE_ENV !== "production",
    playground: process.env.NODE_ENV !== "production",
  });

  const handler = apolloServer.createHandler();
  return req.method === "OPTIONS" ? res.end() : handler(req, res);
});
