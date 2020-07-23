import user from "./queries/user";
import users from "./queries/users";

export const UserResolvers = {
  Query: {
    users,
    user,
  },
};
