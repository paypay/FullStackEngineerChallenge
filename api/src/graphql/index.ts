import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";

import * as resolversList from "./resolvers";
import * as typesList from "./typeDefs";

export { default as context } from "./context";
export { default as formatError } from "./formatError";

const typesArray = Object.keys(typesList).map((key) => typesList[key]);
const resolversArray = Object.keys(resolversList).map(
  (key) => resolversList[key]
);

export const typeDefs = mergeTypes(typesArray, { all: true });
export const resolvers = mergeResolvers(resolversArray);
export * as scalars from "./scalars";
