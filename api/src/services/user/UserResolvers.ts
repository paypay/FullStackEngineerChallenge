import user from "./queries/user";
import users from "./queries/users";

import Authenticate from "./mutations/Authenticate";

export const UserResolvers = {
  Query: {
    users,
    user,
  },
  Mutation: {
    Authenticate,
  },
};
