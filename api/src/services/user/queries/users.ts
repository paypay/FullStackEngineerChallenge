import { ForbiddenError } from "apollo-server-micro";

import { Context } from "../../../graphql/context";
import { QueryResolvers, User, UserType } from "../../../graphql/types";
import connection from "../../../helpers/connection";
import getUsers from "../jobs/getUsers";
import transformer from "../UserTransformer";

const users: QueryResolvers["users"] = async (
  _,
  { first = 10, after, orderBy, filters },
  { auth }: Context
) => {
  if (!auth || auth.role !== UserType.Admin) {
    throw new ForbiddenError("You don't have access to this resource.");
  }
  const query = getUsers(first!, filters, orderBy);

  return connection<User>(query, after, transformer);
};

export default users;
