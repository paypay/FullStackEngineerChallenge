import { MutationResolvers } from "../../../graphql/types";
import deleteUser from "../jobs/deleteUser";
import transformer from "../UserTransformer";

const DeleteUser: MutationResolvers["DeleteUser"] = async (_, { id }) => {
  const user = await deleteUser(id);

  return {
    user: transformer(user),
  };
};

export default DeleteUser;
