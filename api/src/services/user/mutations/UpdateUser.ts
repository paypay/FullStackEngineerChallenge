import { MutationResolvers } from "../../../graphql/types";
import updateUser from "../jobs/updateUser";
import transformer from "../UserTransformer";

const UpdateUser: MutationResolvers["UpdateUser"] = async (
  _,
  { id, input }
) => {
  const user = await updateUser(id, input);

  return {
    user: transformer(user),
  };
};

export default UpdateUser;
