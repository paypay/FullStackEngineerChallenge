import { AuthenticationError } from "apollo-server-micro";

import { Context } from "../../../graphql/context";
import { QueryResolvers } from "../../../graphql/types";
import getUserBy from "../jobs/getUser";
import transformer from "../UserTransformer";

const me: QueryResolvers["me"] = async (_, __, { auth }: Context) => {
  if (!auth) {
    throw new AuthenticationError("You need to sign-in.");
  }
  return transformer(await getUserBy(auth.id));
};

export default me;
