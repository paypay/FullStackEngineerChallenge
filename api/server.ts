import "dotenv-flow/config";
import { ApolloServer, gql } from "apollo-server-micro";
import cors from "micro-cors";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello(parent, args, context) {
      return "Hello World!";
    },
  },
};

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
    resolvers,
    introspection: process.env.NODE_ENV !== "production",
    playground: process.env.NODE_ENV !== "production",
  });

  const handler = apolloServer.createHandler();
  return req.method === "OPTIONS" ? res.end() : handler(req, res);
});
