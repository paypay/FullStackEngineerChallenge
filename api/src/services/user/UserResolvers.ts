import revieweeField from "./fields/revieweeField";
import userField from "./fields/userField";
import Authenticate from "./mutations/Authenticate";
import CreateUser from "./mutations/CreateUser";
import DeleteUser from "./mutations/DeleteUser";
import UpdateUser from "./mutations/UpdateUser";
import me from "./queries/me";
import user from "./queries/user";
import users from "./queries/users";

export const UserResolvers = {
  Query: {
    me,
    users,
    user,
  },
  Mutation: {
    Authenticate,
    CreateUser,
    UpdateUser,
    DeleteUser,
  },
  Review: {
    user: userField,
    reviewee: revieweeField,
  },
  Assignment: {
    user: userField,
    reviewee: revieweeField,
  },
};
