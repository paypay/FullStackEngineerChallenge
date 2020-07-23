import "dotenv-flow/config";

import { ApolloServer } from "apollo-server-micro";
import { createTestClient } from "apollo-server-testing";
import { default as knex } from "../../src/database";
import { cleanup } from "./cleanup";

import { resolvers, typeDefs } from "../../src/graphql";

export const setupServer = (baseContext = {}) => {
  const context = { ...baseContext };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  return createTestClient(server);
};

// Clear testing db and close connection
afterAll(async () => {
  await cleanup(knex);
});

export const db = knex;
