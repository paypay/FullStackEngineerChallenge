import Authenticate from "./mutations/Authenticate";
import CreateUser from "./mutations/CreateUser";
import UpdateUser from "./mutations/UpdateUser";
import user from "./queries/user";
import users from "./queries/users";

export const UserResolvers = {
  Query: {
    users,
    user,
  },
  Mutation: {
    Authenticate,
    CreateUser,
    UpdateUser,
  },
};
